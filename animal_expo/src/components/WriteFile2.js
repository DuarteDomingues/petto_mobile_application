// Line.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { readString } from 'react-native-csv'
import PetManagementService from '../services/PetManagementService';
import PetRequest from '../entities/PetRequest';
import { Asset } from 'expo-asset';
import { namesArray, cityGeoPoints, userArray, imageMapping, colors, breedBunny, breedBird, breedRoe} from './SetData';
import {  serverTimestamp  } from "firebase/firestore"; 

const WriteStuff2 = () => {

  const petManagService = new PetManagementService();



  async function getImageUri(imageName) {

    
    if (!imageMapping[imageName]) {
      console.error('Image not found in mapping:', imageName);
      return null;
    }
    
    const asset = Asset.fromModule(imageMapping[imageName]);
    await asset.downloadAsync(); // Ensure the asset is downloaded
    const uri = asset.localUri || asset.uri;
  
    console.log(uri); // This will print the URI of the image
    return uri;
  }

    let numAdd = 100

    //let csvString = ""
    async function doButton(){

       // const results = readString(csvString)

        for (let i =10; i< numAdd; i++){

        //let dataEx = results["data"][i]

        let imageName = "0"+i.toString()

        console.log("imgn", imageName)
        let uri = await getImageUri(imageName)
            
        let urlDownlaod = await petManagService.uploadToFirebase(uri, imageName+".jpg")
        
        let imgsArray = []

        if (urlDownlaod!== null){
          imgsArray.push(urlDownlaod)
        }

        let locarr =getRandomCityAndGeoPoint();



        //IMAGE NAME
        let newPet = new PetRequest([], "Roedents", getRandomValue(namesArray), locarr["city"],  "Hamster",  
        getRandomValueFromArray(colors),  "Medium", null, "Male","Medium","No","Healthy", 
        getRandomValue(userArray), imgsArray, "test animal description...", locarr["geoPoint"], null, serverTimestamp(), "Young",imageName )

        petManagService.addPet(newPet)
         
       console.log(newPet)

       //breed, color, size, dateBirth, gender, healthy, age


      }
        
    }

    
    function getRandomValueFromArray(arr) {
        if (!Array.isArray(arr) || arr.length === 0) {
            return null; // Return null if input is not an array or the array is empty
        }
        
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }


    function getStrFmt(str){

      return str.charAt(0) + str.substring(1).toLowerCase()

    }

    function getRandomCityAndGeoPoint() {
      const cities = Object.keys(cityGeoPoints);
      const randomIndex = Math.floor(Math.random() * cities.length);
      const randomCity = cities[randomIndex];
      const geoPoint = cityGeoPoints[randomCity];
      
      return { city: randomCity, geoPoint };
    }

    function getRandomValue(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }


  return (
    <TouchableOpacity onPress={doButton}>
    <View style={styles.line} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 50,
    marginTop: 17,
    marginBottom: 4,
    backgroundColor: 'red',    
  },
});

export default WriteStuff2;
