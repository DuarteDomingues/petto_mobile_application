import { arrayUnion, collection } from "firebase/firestore"; 
import { doc, setDoc, updateDoc ,query,where,getDocs , getDoc, orderBy, onSnapshot, addDoc, serverTimestamp} from "firebase/firestore";
import User from "../entities/User";
import { getStorage, ref, uploadBytesResumable , getDownloadURL } from "firebase/storage";
import { auth, firestore } from './FirebaseModule'; // Adjust the path as needed


  const userCollection = 'User';
  const chatCollection = "chats";

  class UserManagementService {
    constructor() {

      this.user = auth.currentUser;
      this.userEmail = this.user.email;
      this.userId = this.user.uid;
    }


    //update User Preferences in FireStore
    async updateUserPreferences(userPrefArr){
      
      this.getUserAuthDocId();
      let userDoc = doc(firestore, userCollection, this.userId);

        try {
            await updateDoc(userDoc, {
                userPref: userPrefArr
              });
    
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }


      async getUserAuthDocId(){
       let q = query(collection(firestore, userCollection), where('email', "==", this.userEmail));
      // const query = await this.db.collection('User').where('capital', '==', true).get();

      let querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        let docId = querySnapshot.docs[0].id;
        this.userId = docId;
      }
    }

    async getUserPref(){

      this.getUserAuthDocId();
      let userDoc = await getDoc(doc(firestore, userCollection, this.userId));

      if(!userDoc.empty){

        let userData = userDoc.data();

        return [userData.userPref, userData.profileImage]
      }
      return null

    }


    async fetchUserById(id){

      let userDoc =  await getDoc(doc(firestore, userCollection, id));

      let user = null;
      
      if(!userDoc.empty){

        let userData = userDoc.data();


        user = new User(userData.name, userData.adopter, this.checkUndefined(userData.description, "No description yet..."), this.checkUndefined(userData.phone, "Not Defined"),
        userData.email, this.checkUndefined(userData.location, "Not Defined"), userData.profileImage, userData.userGeoLocation)
        
      }
      return user;
    }

     checkUndefined(variable, variablePlaceText){

      if(((variable!==null) && (typeof variable !== 'undefined')) == false){

        variable = variablePlaceText;
      }
      
      return variable;

    }

    async fetchUserMinInfoById(id){

      let userDoc =  await getDoc(doc(firestore, userCollection, id));

      let user = null;
      
      if(!userDoc.empty){

        let userData = userDoc.data();

        user = new User(userData.name, userData.adopter,null, null,
        null, null, userData.profileImage, null, userDoc.id)

      }
      return user;
    }


    async updateUser(userDic){

      let userDoc =   doc(firestore, userCollection, this.user.uid);

      if(!userDoc.empty){

        await updateDoc(userDoc, userDic);

      }
    }


    async  uploadToFirebase(uri, name, onProgress) {
      try {
        let fetchResponse = await fetch(uri);
        let theBlob = await fetchResponse.blob();
    
        let imageRef = ref(getStorage(), `images/${name}`);
    
        let uploadTask = uploadBytesResumable(imageRef, theBlob);
    
        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              let progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              onProgress && onProgress(progress);
            },
            (error) => {
              // Handle unsuccessful uploads
              console.log(error);
              reject(error);
            },
            async () => {
              try {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(
                  downloadUrl
                );
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      } catch (error) {
        console.error("Error uploading image to Firebase:", error);
        // Handle error as needed
        return null;
      }
    }


     async sendMessage(createdAt, text, userRec, chatId){

      addDoc(collection(firestore, 'chat', chatId, 'messages'), {
        createdAt: createdAt,
        text: text,
        userSend: this.userId,
        userRec: userRec
    });
    }



    async addChat( userRec, text, petId, existChatId){

      let docId=null;
      if(existChatId==null || existChatId==1){

       docId = await addDoc(collection(firestore, 'chat') ,{

        users: [userRec, this.userId],
        pets: [petId],
        dateAdd: serverTimestamp()
    });
    docId = docId.id
  }
  else{

    let chatDoc = doc(firestore, 'chat', existChatId);

        try {
            await updateDoc(chatDoc, {
                pets: arrayUnion(petId)
              });
    
        } catch (e) {
          console.error("Error adding document: ", e);
        }

    docId = existChatId
  }

    await addDoc(collection(firestore, 'chat', docId, 'messages'), {
      createdAt: serverTimestamp(),
      text: text,
      userSend: this.userId,
      userRec: userRec
  });

  return docId
    }



    async getAuthUserMessages(){


    let chatRef = collection(firestore, 'chat');

    let messagesInfo = []

    let q = query(chatRef,where('users', 'array-contains', this.userId ), orderBy('dateAdd','desc'));

      //const values = query(messagesRef, orderBy('createdAt', "desc"));
     // const q = query(messagesRef, where('userRec', "==", this.userId));

      let querySnapshot = await getDocs(q);

      for (let doc of querySnapshot.docs) {

        let messageInfo = []
        let data = doc.data();
        let chatId = doc.id;
        let otherUserId = this.findDifferentElement(data['users'], chatId)

        //messageInfo.push(otherUserId)

        const messagesRef = collection(firestore, 'chat', chatId, 'messages');

        const messagesQuery = query(messagesRef, orderBy('createdAt', "desc"));
        const messagesSnapshot = await getDocs(messagesQuery);
        
        let firstMessage = messagesSnapshot.docs[0]; 

        let dateFirst = firstMessage.data()['createdAt']
        
        let diffTime =  this.getDiferenceInTime(dateFirst['seconds'])

        messageInfo.push(otherUserId)

        messageInfo.push(diffTime)

        let user = await this.fetchUserMinInfoById(otherUserId)


        messageInfo.push(user)
        messageInfo.push(chatId)

        messagesInfo.push(messageInfo)

      }
      return messagesInfo
    }



     findDifferentElement(arrayUsers, userId) {
      // Ensure that the array contains exactly two elements
      if (arrayUsers.length !== 2) {
        throw new Error('Array must contain exactly two elements');
      }
    
      if (arrayUsers[0] === userId) {
        return arrayUsers[1]; 
      } else {
        return arrayUsers[0]; // Return the first element
      }
    };


    getDiferenceInTime(createdAtTimestamp){
      
      let currentTimestamp = new Date();

      // Calculate the difference in milliseconds
      let secondsDifference = Math.floor(currentTimestamp.getTime()/1000) - createdAtTimestamp;
      

   // Convert seconds to minutes if the difference is less than 60 minutes
      if (secondsDifference < (60 * 60)) {
        let minutesDifference = Math.floor(secondsDifference / 60);
        return `${minutesDifference} minutes ago`;
      } else if (secondsDifference < (60 * 60 * 24)) { // Less than 24 hours
       // Convert seconds to hours
         let hoursDifference = Math.floor(secondsDifference / (60 * 60));
       return `${hoursDifference} hours ago`;
      } else {
         // Convert seconds to days
          let daysDifference = Math.floor(secondsDifference / (60 * 60 * 24));
        return `${daysDifference} days ago`;
        }
     }


     async checkIfChatExists(otherUserId, petId){
      
      let chatEx=false;
      let chatExId=null;

      if (this.userId === otherUserId){

        return [false, null]

      }

      let chatRef =  collection(firestore, 'chat')

      let q1 = query(chatRef,where('users', 'array-contains', this.userId ));
      let q2 = query(chatRef,where('users', 'array-contains', otherUserId ));
  
      //GET ID WHERE BOTH MERGE
      const querySnapshot1 = await getDocs(q1);
      const querySnapshot2 = await getDocs(q2);
  
      const mergedDocuments = querySnapshot1.docs
  .filter(doc1 => querySnapshot2.docs.some(doc2 => doc2.id === doc1.id))
  .map(doc => {
    const documentData = doc.data();
    chatEx = documentData['pets'].includes(petId);
    if(chatEx==false){
    chatExId = doc.id;
    }
    return chatEx
  });

      if(mergedDocuments.length==0){
        return [false, 1]
      }

      return [chatEx, chatExId]
        
     // return false
    }
  

    async getUserMessages(setMessages, chatId, userName){

      const messagesRef = collection(firestore, 'chat', chatId, 'messages');
      const values = query(messagesRef, orderBy('createdAt', "desc"));

      const unsubscribe = onSnapshot(values, (snapshot) => setMessages(
          snapshot.docs.map(doc => ({

              _id: doc.id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: {
                _id: doc.data().userSend,
                name: userName,
              }
          }))
      ));
      return unsubscribe;

    }

  }



  
  export default UserManagementService;