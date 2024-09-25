import { collection, addDoc, serverTimestamp, getUnixTime, Timestamp, updateDoc  } from "firebase/firestore"; 
import { doc, setDoc, getDoc, deleteDoc, query,where,getDocs, GeoPoint, limit, startAfter, orderBy,FieldPath } from "firebase/firestore";
import PetRequest from "../entities/PetRequest";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import { firestore } from './FirebaseModule'; // Adjust the path as needed
import UseImage from '../services/UseImage';
import { auth } from '../services/FirebaseModule'; // Adjust the path as needed

  function saveGeoPoint(geoLoc){

    if(null === geoLoc){

        return null
    }

    else{
      return new GeoPoint(geoLoc["latitude"], geoLoc["longitude"])
    }

  }


  const petReqConverter = {
    toFirestore: (petReq) => {
        return {

            species: petReq.species,
            name: petReq.name,
            address: petReq.address,
            breed: petReq.breed,
            color: petReq.color,
            size: petReq.size,
            gender: petReq.gender,
            //activityLevel: petReq.activityLevel,
            spayed: petReq.isSpayed,
            specialNeeds: petReq.spNeeds,
            petImages: petReq.petImages,
            description: petReq.description,
            petOwner: petReq.petOwner,
            actLevel: petReq.actLevel,
            geoLocation: saveGeoPoint(petReq.geoLocation),
            dateAdded: petReq.dateAdded,
            age: petReq.age,
            dbId: petReq.dbId

            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new PetRequest(data.species, data.address);
    }
};

const petCollection = "pets";
const userCollection = 'User';
const favCollection = "Favourite";
const useImage = new UseImage();

  class PetManagementService {
    constructor() {
    }


      //add anmal in Firestore
      async addPet(petReq){

       let ref = doc(collection(firestore, petCollection)).withConverter(petReqConverter);

        try {

          await setDoc(ref, petReq);
          docId = ref.id; // Get the ID of the newly created document

        } catch (e) {
          console.error("Error adding document: ", e);
        }
        return docId;
      }


      async fetchPetById(animalId){

        let petDoc = await getDoc(doc(firestore, petCollection, animalId));
  
        let petReq = null;
       if (!petDoc.empty) {
        let petData = petDoc.data();

         petReq = new PetRequest(null, petData.species, petData.name, petData.address, petData.breed, petData.color, petData.size,  petData.date, petData.gender,
          petData.actLevel, petData.spayed, petData.specialNeeds, petData.petOwner, petData.petImages, petData.description,petData.geoLocation, null, petData.dateAdded, petData.age,
        petData.dbId)
      
       }
       return petReq;

     }


     async  countFavoritesForUser(userId) {
      if (!userId) {
        return 0;
      }
    
      try {
        const favouriteCollectionRef = collection(firestore, favCollection);
    
        // Query for documents where favGiverId equals userId
        const giverQuery = query(favouriteCollectionRef, where('favGiverId', '==', userId));
    
        // Query for documents where favRecId equals userId
        const receiverQuery = query(favouriteCollectionRef, where('favRecId', '==', userId));
    
        // Execute both queries in parallel
        const [giverSnapshot, receiverSnapshot] = await Promise.all([
          getDocs(giverQuery),
          getDocs(receiverQuery),
        ]);
    
        // Use a Set to ensure no duplicates
        const uniqueDocs = new Set();
    
        giverSnapshot.forEach(doc => uniqueDocs.add(doc.id));
        receiverSnapshot.forEach(doc => uniqueDocs.add(doc.id));
    
        // Return the total count of unique documents
        return uniqueDocs.size;
      } catch (error) {
        console.error('Error counting favorite documents:', error);
        return 0;
      }
    }


    async  countPetsForOwner(userId) {
      if (!userId) {
        return 0;
      }
    
      try {
        const petCollectionRef = collection(firestore, petCollection); 
    
        // Create a query that filters by petOwner and limits the results to 100
        const petOwnerQuery = query(
          petCollectionRef,
          where('petOwner', '==', userId),
          limit(100)
        );
    
        const petSnapshot = await getDocs(petOwnerQuery);
    
        return petSnapshot.size;
      } catch (error) {
        console.error('Error counting pet documents:', error);
        return 0;
      }
    }

     
     async  fetchPetsByIds(animalIds) {

      if (!animalIds || animalIds.length === 0) {
        return [];
      }
    
      const petCollectionRef = collection(firestore, petCollection);
    
      const q = query(petCollectionRef, where('dbId', 'in', animalIds));
    
      try {
        // Execute the query and get the documents
        const querySnapshot = await getDocs(q);
    
        // Initialize an array to store the PetRequest objects
        let petRequests = [];
    
        // Iterate over each document in the query result
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            // Extract data from the document
            let petData = doc.data();
    
            let petReq = new PetRequest(null, petData.species, petData.name, petData.address, petData.breed, petData.color, petData.size, petData.date, petData.gender,
              null, petData.spayed, petData.specialNeeds, petData.petOwner, petData.petImages, petData.description,petData.geoLocation,  doc.id, petData.dateAdded, petData.age,
              petData.dbId)
          
    
            // Add the PetRequest object to the array
            petRequests.push(petReq);
          }
        });
    
        // Return the array of PetRequest objects
        return petRequests;
      } catch (error) {
        console.error('Error fetching pet documents:', error);
        return [];
      }
    }

    
    async addPetToFav(userId, animalId){

      let docRef = await addDoc(collection(firestore, favCollection), {
        favGiverId: userId,
        favRecId: animalId,
        dateAdd: serverTimestamp() // Add the current date field

      });
      return docRef.id;
    }

    async removePetFromFav(favDocId){

      await deleteDoc(doc(firestore, favCollection, favDocId));
    }

    async checkExistsFavPetsById(id, petId){

      console.log("iduser", id)

      let q = query(collection(firestore, favCollection), where('favGiverId', "==", id),
      where('favRecId', '==', petId) );

      let querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        let docId = querySnapshot.docs[0].id;
        return docId;
      }
      else{
        return null;
      }
    }

    async getPetsByUser(userId){

      const q = query(collection(firestore, petCollection), where('petOwner', '==', userId), limit(5));

      let querySnapshot = await getDocs(q);

      let petReqs = []

      if (!querySnapshot.empty) {

        querySnapshot.forEach((doc) => {

        let petData = doc.data();
        let petReq = new PetRequest(null, petData.species, petData.name, petData.address, petData.breed, petData.color, petData.size, petData.date, petData.gender,
          null, petData.spayed, petData.specialNeeds, petData.petOwner, petData.petImages, petData.description,petData.geoLocation,  doc.id, petData.dateAdded, petData.age,
          petData.dbId)

        petReqs.push(petReq)
      });
      }

      return petReqs;
    }



    async getPetsByImg(petIds ){

      let petCollectionRef = collection(firestore, petCollection);
      const q = query(petCollectionRef, where('dbId', 'in', petIds));
      let petReqs = [];

      try {
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {

          let petData = doc.data();

          let petReq = new PetRequest(null, petData.species, petData.name, petData.address, petData.breed, petData.color, petData.size, petData.date, petData.gender,
            null, petData.spayed, petData.specialNeeds, petData.petOwner, petData.petImages, petData.description,petData.geoLocation,  doc.id, petData.dateAdded, petData.age,
            petData.dbId)
         
         petReqs.push(petReq)
        });
        
        // Return the array of pets
        return petReqs;
      } catch (error) {
        console.error("Error fetching pets by IDs: ", error);
        return [];
      }
    }

    async getPetsByImg(petIds ){

      let petCollectionRef = collection(firestore, petCollection);
      const q = query(petCollectionRef, where('dbId', 'in', petIds));
      let petReqs = [];

      try {
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {

          let petData = doc.data();

          let petReq = new PetRequest(null, petData.species, petData.name, petData.address, petData.breed, petData.color, petData.size, petData.date, petData.gender,
            null, petData.spayed, petData.specialNeeds, petData.petOwner, petData.petImages, petData.description,petData.geoLocation,  doc.id, petData.dateAdded, petData.age,
            petData.dbId)
         
         petReqs.push(petReq)
        });
        
        // Return the array of pets
        return petReqs;
      } catch (error) {
        console.error("Error fetching pets by IDs: ", error);
        return [];
      }
    }



    async fetchRecentPets() {
    
      // Specify the timestamp to compare against
      const timestamp = new Timestamp(1717278774, 491000000);
    
      // Reference to the collection
      const petsCollection = collection(firestore, petCollection);
    
      // Create a query to get documents where dateAdded is greater than the specified timestamp
      const q = query(petsCollection, where('dateAdded', '>', timestamp));
     let i=0
      try {
        // Execute the query
        const querySnapshot = await getDocs(q);
    
        // Loop through each document and update the species field to "Dogs"
        const updatePromises = [];
        querySnapshot.forEach((docSnapshot) => {
          i=i+1
          const petDocRef = doc(firestore, petCollection, docSnapshot.id);
          updatePromises.push(updateDoc(petDocRef, { species: "Dogs" }));
        });
    
        // Wait for all updates to complete
        await Promise.all(updatePromises);
    
        console.log('Species field updated to "Dogs" for all matching documents.');
      } catch (error) {
        console.error('Error updating documents: ', error);
      }
    };


    async getPetsRecent( valueSpecies, numSearch ){

      let petCollectionRef = collection(firestore, petCollection);

      let q = petCollectionRef;

      if(valueSpecies==null){
       q = query(petCollectionRef, orderBy('dateAdded', 'desc'), limit(numSearch));
      }
      else{
        q = query(petCollectionRef,where('species', '==', valueSpecies), orderBy('dateAdded', 'desc'), limit(numSearch));

      }

      let petReqs = [];

      try {
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {

          let petData = doc.data();

          let petReq = new PetRequest(null, petData.species, petData.name, petData.address, petData.breed, petData.color, petData.size, petData.date, petData.gender,
            null, petData.spayed, petData.specialNeeds, petData.petOwner, petData.petImages, petData.description,petData.geoLocation,  doc.id, petData.dateAdded, petData.age,
            petData.dbId)
         
         petReqs.push(petReq)
        });
        
        // Return the array of pets
        return petReqs;
      } catch (error) {
        console.error("Error fetching pets by IDs: ", error);
        return [];
      }
    }


    async getPetsNotRec( valueSpecies, numSearch ){

      let petCollectionRef = collection(firestore, petCollection);

      let q = petCollectionRef;

      if(valueSpecies==null){
       q = query(petCollectionRef, limit(numSearch));
      }
      else{
        q = query(petCollectionRef,where('species', '==', valueSpecies), limit(numSearch));

      }

      let petReqs = [];

      try {
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {

          let petData = doc.data();

          let petReq = new PetRequest(null, petData.species, petData.name, petData.address, petData.breed, petData.color, petData.size, petData.date, petData.gender,
            null, petData.spayed, petData.specialNeeds, petData.petOwner, petData.petImages, petData.description,petData.geoLocation,  doc.id, petData.dateAdded, petData.age,
            petData.dbId)
         
         petReqs.push(petReq)
        });
        
        // Return the array of pets
        return petReqs;
      } catch (error) {
        console.error("Error fetching pets by IDs: ", error);
        return [];
      }
    }







    async getPetsByFilter(maxDocs, lastDocument, firstDoc, filters){

      
      let petCollectionRef = collection(firestore, petCollection);

      let q = petCollectionRef;

      for (let key in filters) {
        let value = filters[key];
        if (value !== null) {
          q = query(q, where(key, '==', value));
        }
      }


   //   let q = query(collection(firestore, petCollection), where('species', "==", 'Cats'),
    //  where('gender', "==", 'Male')
    //);


    if (lastDocument) {
      q = query(q, startAfter(lastDocument));
  }

  
    q = query(q, limit(maxDocs));


      let petReqs = [];
      let querySnapshot = await getDocs(q);

      let lastDoc;
      let firstDocVar;


      for (let i = 0; i < querySnapshot.docs.length; i++) {

        let doc = querySnapshot.docs[i];
        let petData = doc.data();

        if(firstDoc){
          if(firstDoc.id === doc.id){
            
            return [petReqs, lastDoc];
          }
        }
        else{
          if(i==0){
            firstDocVar = doc;
            console.log("FIRST DOC ID", firstDocVar.id)
          }
        }
      
        let petReq = new PetRequest(null, petData.species, petData.name, petData.address, petData.breed, petData.color, petData.size, petData.date, petData.gender,
           null, petData.spayed, petData.specialNeeds, petData.petOwner, petData.petImages, petData.description,petData.geoLocation,  doc.id, petData.dateAdded, petData.age,
           petData.dbId)
      
        petReqs.push(petReq)
        lastDoc = doc

      }

      return [petReqs, lastDoc, firstDocVar];
      
    }

    async getPetsByName(maxDocs, lastDocument, firstDoc, nameOfPet){

      let petCollectionRef = collection(firestore, petCollection);
      let q = query(collection(firestore, petCollection), where('name', "==", nameOfPet),

    );


    if (lastDocument) {
      q = query(q, startAfter(lastDocument));
  }

    q = query(q, limit(maxDocs));

      let petReqs = [];
      let querySnapshot = await getDocs(q);

      let lastDoc;
      let firstDocVar;


      for (let i = 0; i < querySnapshot.docs.length; i++) {

        let doc = querySnapshot.docs[i];
        let petData = doc.data();

        if(firstDoc){
          if(firstDoc.id === doc.id){
            
            return [petReqs, lastDoc];
          }
        }
        else{
          if(i==0){
            firstDocVar = doc;
          }
        }
        

                let petReq = new PetRequest(null, petData.species, petData.name, petData.address, petData.breed, petData.color, petData.size, petData.date, petData.gender,
           null, petData.spayed, petData.specialNeeds, petData.petOwner, petData.petImages, petData.description,petData.geoLocation,  doc.id, petData.dateAdded, petData.age,
           petData.dbId)
          
          petReqs.push(petReq)

        lastDoc = doc

      }

      return [petReqs, lastDoc, firstDocVar];
    }


    async getFavPetsById(id){

      //let q = query(collection(firestore, favCollection), where('favGiverId', "==", id) );

      let q = query(collection(firestore, favCollection), where('favGiverId', "==", id), orderBy('dateAdd', 'desc') );

      let querySnapshot = await getDocs(q);

      let petReqs = [];
      let datesAdd = [];

      querySnapshot.forEach((doc) => {
        let data = doc.data();
        petReqs.push(data.favRecId); 
        datesAdd.push(data.dateAdd)
      });

      let docsOutput = []


      //run through pet Documents
      for(let i=0; i<petReqs.length; i++){

        let docPet = doc(firestore, petCollection, petReqs[i]);

        let querySnapshot2 = await getDoc(docPet);

        let dateStr = ""

        if (querySnapshot2.exists()) {
          
          let favAnimData = []

          let name = querySnapshot2.data().name;
          let breed = querySnapshot2.data().breed;
          
          let petImgs = querySnapshot2.data().petImages;



          let createdAtTimestamp = datesAdd[i].toDate();
     
          dateStr = this.getDifferenceInTime(createdAtTimestamp)
      
          favAnimData.push(name)
          favAnimData.push(breed)
          favAnimData.push(dateStr)

            if(petImgs[0] !== null){
            favAnimData.push(petImgs[0])
            }
            else{
              favAnimData.push(null)  
          }

          favAnimData.push(docPet.id)
      
          docsOutput.push(favAnimData);
      }
  
      // Return the array of documents
    } 
    return docsOutput;
    
    }


/*
     getDiferenceInTime(createdAtTimestamp){
      
      let currentTimestamp = new Date();

      // Calculate the difference in milliseconds
      let millisecondsDifference = currentTimestamp.getTime() - createdAtTimestamp.getTime();
      



      // Convert milliseconds to hours if the difference is less than 24 hours
      if (millisecondsDifference < (1000 * 60 * 60)) {
        let millisecondsPerMinute = 1000 * 60;
        let minutesDifference = Math.floor(millisecondsDifference / millisecondsPerMinute);
        return(`${minutesDifference} minutes ago`);
    } else if (millisecondsDifference < (1000 * 60 * 60 * 24)) { // Less than 24 hours
        // Convert milliseconds to hours
        let millisecondsPerHour = 1000 * 60 * 60;
        let hoursDifference = Math.floor(millisecondsDifference / millisecondsPerHour);
        return(`${hoursDifference} hours ago`);
    } else {
        // Convert milliseconds to days
        let millisecondsPerDay = 1000 * 60 * 60 * 24;
        let daysDifference = Math.floor(millisecondsDifference / millisecondsPerDay);
        return(`${daysDifference} days ago`);
    }
    }
*/

getDifferenceInTime(createdAtTimestamp) {
  let currentTimestamp = new Date();

  // Calculate the difference in milliseconds
  let millisecondsDifference = currentTimestamp.getTime() - createdAtTimestamp.getTime();

  // Convert milliseconds to seconds
  let secondsDifference = Math.floor(millisecondsDifference / 1000);

  // Convert seconds to minutes if the difference is less than 60 minutes
  if (secondsDifference < 60) {
      return `${secondsDifference} seconds ago`;
  } else if (secondsDifference < (60 * 60)) { // Less than 1 hour
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




    async  uploadImagesToFirebase(uris, onProgress) {
      try {
        const uploadTasks = uris.map(async (uri) => {
          const fetchResponse = await fetch(uri);
          const theBlob = await fetchResponse.blob();
          const name = uri.split("/").pop();
    
          const imageRef = ref(getStorage(), `images/${name}`);
    
          const uploadTask = uploadBytesResumable(imageRef, theBlob);
    
          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress && onProgress(progress);
              },
              (error) => {
                // Handle unsuccessful uploads
                console.log(error);
                reject(error);
              },
              async () => {
                // Upload completed successfully
                try {
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                  resolve(downloadURL);
                } catch (error) {
                  reject(error);
                }
              }
            );
          });
        });
    
        // Wait for all upload tasks to complete
        const downloadURLs = await Promise.all(uploadTasks);
    
        console.log("All images uploaded successfully");
        console.log("Download URLs:", downloadURLs);
    
        return downloadURLs; // Return the array of download URLs
      } catch (error) {
        console.error("Error uploading images to Firebase:", error);
        // Handle error as needed
        return [];
      }
    }


    /*
    async uploadToFirebase (uri, onProgress) {
      const fetchResponse = await fetch(uri);
      const theBlob = await fetchResponse.blob();
      let name = uri.split("/").pop();
    
      const imageRef = ref(getStorage(), `images/${name}`);
    
      const uploadTask = uploadBytesResumable(imageRef, theBlob);
    
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress && onProgress(progress);
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            reject(error);
          },
        //  async () => {
        //    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        //    resolve({
        //      downloadUrl,
        //      metadata: uploadTask.snapshot.metadata,
        //    });
      //    }
        );
      });

    };
    
    */

    
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



  }
  
  export default PetManagementService;