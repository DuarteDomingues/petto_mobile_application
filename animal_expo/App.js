import { StyleSheet, Text, View , Button, ActivityIndicator } from 'react-native';
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from 'react';
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import * as FS from "expo-file-system";
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from "firebase/firestore"; 
import { StatusBar } from 'react-native';

//import ImageViewer from './ImageViewer';
import HomePage from './src/views/HomePage';
import Filter from './src/views/Filter';
import SearchPage from './src/views/SearchPage';
import AnimalPage from './src/views/AnimalPage'; 
import Favourites from './src/views/Favourites'; 
import Messages from './src/views/Messages'; 
import UserPage from './src/views/UserPage';
import QuestionnaireFirst from './src/views/QuestionnaireFist';
import QuestionnaireSec from './src/views/QuestionnaireSec';
import QuestionnaireThird from './src/views/QuestionnaireThird';
import Add from './src/views/Add';
import AddSec from './src/views/AddSec';
import AddMap from './src/views/AddMap';
import Login from './src/views/Login';
import LoginSec from './src/views/LoginSec';
import Register from './src/views/Register';
import EditProfile from './src/views/EditProfile';
import ChatPage from './src/views/ChatPage';
import FlaskTest from './src/views/FlaskTest';
import ImageRecommend from './src/views/ImageRecomend';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthenticationService from './src/services/AuthenticationService';

//const { initializeApp } = require('firebase/app');
//const { getFirestore } = require('firebase/firestore');

//navigation
const Stack = createNativeStackNavigator();


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*const firebaseConfig = {
  apiKey: "AIzaSyDSUpWyMvH_AMZ2ltZNkNR3KnFoLzTVwmI",
  authDomain: "app-teste-tese.firebaseapp.com",
  projectId: "app-teste-tese",
  storageBucket: "app-teste-tese.appspot.com",
  messagingSenderId: "730594593344",
  appId: "1:730594593344:web:0f0d8d861192cfa2846da5",
  measurementId: "G-QFTJD2E23R"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
//const docRef = db.collection('users').doc('alovelace');
*/

export default function App() {
  

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const authService = new AuthenticationService();
  const [initialRoute, setInitialRoute] = useState(null); // State to determine the initial route
  const [isLoading, setIsLoading] = useState(true); // Loading state while checking authentication

  useEffect(() => {
    const determineInitialRoute = async () => {
      try {
        const isAuthenticated = await authService.checkAuthenticatedUser();
        setInitialRoute(isAuthenticated ? 'HomePage' : 'Login'); // Set route based on authentication
      } catch (error) {
        console.error("Error determining initial route:", error);
        setInitialRoute('Login'); // Fallback route on error
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    determineInitialRoute();
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }



// Define the collection and document data

/*
const myCollection = collection(db, 'myCollection');

const myDocumentData = {
  name: 'John Doe',
  email: 'johndoe@examsple.com',
  age: 30
};

// Define the document reference
const myDocRef = doc(myCollection, 'myDocumentId');

// Add or update the document
 setDoc(myDocRef, myDocumentData);

// Log a success message
console.log('Document added or updated successfully!');
*/

  return (

    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>


        <Stack.Screen name="Login" component={Login} options={{ title: 'Login', headerShown: false }} />


        <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'HomePage', headerShown: false }} />  
        <Stack.Screen name="SearchPage" component={SearchPage} options={{ title: 'SearchPage',headerShown: false  }} />  
       { <Stack.Screen name="Filter" component={Filter} options={{ title: 'Filter' ,headerShown: false }} />  }
       { <Stack.Screen name="AnimalPage" component={AnimalPage} options={{ title: 'AnimalPage',headerShown: false }} />  }
       { <Stack.Screen name="Favourites" component={Favourites} options={{ title: 'Favourites',headerShown: false  }} />  }
       { <Stack.Screen name="Messages" component={Messages} options={{ title: 'Messages',headerShown: false  }} />  }
       { <Stack.Screen name="UserPage" component={UserPage} options={{ title: 'UserPage',headerShown: false  }} />  }
       { <Stack.Screen name="QuestionnaireFirst" component={QuestionnaireFirst} options={{ title: 'QuestionnaireFirst',headerShown: false  }} />  }
       { <Stack.Screen name="QuestionnaireSec" component={QuestionnaireSec} options={{ title: 'QuestionnaireSec',headerShown: false  }} />  }
       { <Stack.Screen name="QuestionnaireThird" component={QuestionnaireThird} options={{ title: 'QuestionnaireThird',headerShown: false  }} />  }
       { <Stack.Screen name="Add" component={Add} options={{ title: 'Add',headerShown: false  }} />  }
       { <Stack.Screen name="AddSec" component={AddSec} options={{ title: 'AddSec',headerShown: false  }} />  }
       { <Stack.Screen name="AddMap" component={AddMap} options={{ title: 'AddMap',headerShown: false  }} />  }
       { <Stack.Screen name="LoginSec" component={LoginSec} options={{ title: 'LoginSec',headerShown: false  }} />  }
       { <Stack.Screen name="Register" component={Register} options={{ title: 'Register',headerShown: false  }} />  }
       { <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'EditProfile',headerShown: false  }} />  }
       { <Stack.Screen name="ChatPage" component={ChatPage} options={{ title: 'ChatPage',headerShown: false  }} />  }
       { <Stack.Screen name="FlaskTest" component={FlaskTest} options={{ title: 'FlaskTest',headerShown: false  }} />  }
       { <Stack.Screen name="ImageRecommend" component={ImageRecommend} options={{ title: 'ImageRecommend',headerShown: false  }} />  }



      </Stack.Navigator>
    </NavigationContainer>
    </>
  );



}

const AppScreen = ({ navigation }) => {
  return (
    
    <View>

      <Button title="Go to HomePage"  onPress={() => navigation.navigate('HomePage')} />
      <Button title="Go to SearchPage"  onPress={() => navigation.navigate('SearchPage')} />
      <Button title="Filter"  onPress={() => navigation.navigate('Filter')} />
      <Button title="Animal Page"  onPress={() => navigation.navigate('AnimalPage')} />
      <Button title="Favourites"  onPress={() => navigation.navigate('Favourites')} />
      <Button title="Messages"  onPress={() => navigation.navigate('Messages')} />
      <Button title="UserPage"  onPress={() => navigation.navigate('UserPage')} />
      <Button title="QuestionnaireFirst"  onPress={() => navigation.navigate('QuestionnaireFirst')} />
      <Button title="QuestionnaireSec"  onPress={() => navigation.navigate('QuestionnaireSec')} />
      <Button title="QuestionnaireThird"  onPress={() => navigation.navigate('QuestionnaireThird')} />
      <Button title="Add"  onPress={() => navigation.navigate('Add')} />
      <Button title="AddSec"  onPress={() => navigation.navigate('AddSec')} />
      <Button title="AddMap"  onPress={() => navigation.navigate('AddMap')} />
      <Button title="Login"  onPress={() => navigation.navigate('Login')} />
      <Button title="LoginSec"  onPress={() => navigation.navigate('LoginSec')} />
      <Button title="Register"  onPress={() => navigation.navigate('Register')} />
      <Button title="EditProfile"  onPress={() => navigation.navigate('EditProfile')} />
      <Button title="Chat"  onPress={() => navigation.navigate('ChatPage')} />
      <Button title="FlaskTest"  onPress={() => navigation.navigate('FlaskTest')} />
      <Button title="ImageRecommend"  onPress={() => navigation.navigate('ImageRecommend')} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
