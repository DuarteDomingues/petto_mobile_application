import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

import { firebaseApp, auth, firestore } from './FirebaseModule'; // Adjust the path as needed


  const userCollection = "User";

  class AuthenticationService {
    constructor() {
    }

  
    async doRegister(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        throw error;
      }
    }

     isCurrUser(userId){

      if(userId === auth.currentUser.uid){
        return true
      }
    }

    async doSignIn(email, password) {
      try {
        let userCredential = await signInWithEmailAndPassword(auth, email, password);
        let user = userCredential.user;
        // Signed in successfully
        return user;
      } catch (error) {
        throw error;
      }
    }

    async createUser(email, userId){

      try {
        await setDoc(doc(firestore, userCollection, userId), {
          email: email,
          adopter: 'owner',
          name: email.split("@")[0]
        });

      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    async doLogout(){
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("User signed out successfully.");
        
      }).catch((error) => {
        // An error happened during sign out.
        console.error("Error signing out: ", error);
      });
    }


    checkAuthenticatedUser() {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in
            resolve(true);
          } else {
            // No user is signed in
            resolve(false);
          }
        }, (error) => reject(error));
      });
    }


  }
  
  export default AuthenticationService;