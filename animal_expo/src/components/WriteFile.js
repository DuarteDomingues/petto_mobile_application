// Line.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { readString } from 'react-native-csv'
import PetManagementService from '../services/PetManagementService';
import PetRequest from '../entities/PetRequest';
import { Asset } from 'expo-asset';
import { namesArray, cityGeoPoints, userArray, imageMapping} from './SetData';
import {  serverTimestamp  } from "firebase/firestore"; 

const WriteStuff = () => {

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

    let numAdd = 1

    let csvString = ""
    async function doButton(){

        const results = readString(csvString)

        for (let i =0; i< numAdd; i++){

        let dataEx = results["data"][i]

        let imageName = dataEx[8]
        let uri = await getImageUri(imageName)
            
        let urlDownlaod = await petManagService.uploadToFirebase(uri, imageName+"-1.jpg")
        
        let imgsArray = []

        if (urlDownlaod!== null){
          imgsArray.push(urlDownlaod)
        }

        let locarr =getRandomCityAndGeoPoint();

        //IMAGE NAME
        let newPet = new PetRequest([], "Rabbits", getRandomValue(namesArray), locarr["city"],  getStrFmt(dataEx[3]),  getStrFmt(dataEx[4]),  getStrFmt(dataEx[5]), null, getStrFmt(dataEx[2]),"Medium",getStrFmt(dataEx[7]),getStrFmt(dataEx[6]), getRandomValue(userArray), imgsArray, "test animal description...", locarr["geoPoint"], null, serverTimestamp(), getStrFmt(dataEx[1]),imageName )

       // petManagService.addPet(newPet)

      }
        
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

export default WriteStuff;
