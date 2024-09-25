import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Platform,FlatList } from 'react-native';
import SearchBar2 from '../components/SearchBar2';

import {  AntDesign, FontAwesome  } from '@expo/vector-icons';
import Footer from '../components/Footer';
import FavouriteComp from '../components/FavouriteComp';
import PetManagementService from '../services/PetManagementService';
import { auth } from '../services/FirebaseModule'; // Adjust the path as needed
import UseImage from '../services/UseImage';
import { useNavigation, useIsFocused } from '@react-navigation/native';


export default function Favourites() {

  const isFocused = useIsFocused();


  let userId = auth.currentUser.uid;

  const petManagService = new PetManagementService();
  const useImage = new UseImage();


  const [products, setProducts] = useState([{'key':'val2'}, {'key':'val3'}, {'key':'val4'}]);
  const imageSource = require('../../assets/IMG_9257.jpg');
  const imageSource2 = require('../../assets/imgs/chu.jpg');

  const[favData, setFavData] = useState([])



  async function getFavouritesData(){

      let petsData = await petManagService.getFavPetsById(userId)
      console.log(petsData)
      setFavData(petsData)
  }

  useEffect(() => {

    if(isFocused){
    getFavouritesData();
    }

  }, [isFocused]);



  return (
    <SafeAreaView style={styles.container}>

<View style={styles.wrapperView}>

      <View style={styles.searchV}>

      <SearchBar2></SearchBar2>

      </View>



          <View style={styles.margTop}>
          </View>


          <FlatList
                data={favData}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => (
                  <FavouriteComp  
                  petName={item[0]}
                  breed={item[1]}
                  timeFav={item[2]}
                  selectedImage= {item[3]}
                  petId = {item[4]}
                  
                  ></FavouriteComp>

                )}
                />

<Footer footerPage='fav'></Footer>

        </View>

    </SafeAreaView>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCFF'
  },

  searchV: {
    paddingTop: 10,
    paddingRight: 14,
    paddingLeft: 12,
  },

  margTop: {
    height:2
  },

  wrapperView:{
    width:'100%',
    height: '100%'
  },


  squareIcon:{
    paddingTop: 4
  },

  horizontalContainer: {
    flexDirection: 'row',
  },

  leftText: {
    marginLeft: 5,
    
    fontSize: 16,
    fontWeight: '400',
    color : '#181818'
  },

  rightText: {
    fontSize: 14,
    marginRight: 7,
    color: '#7B6F82'
  },

  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    marginLeft: 'auto',
    alignContent: 'self'

  },



  profileImage: {
    width: 45, // Set the desired width
    height: 45, // Set the desired height
    marginRight: 10, // Adjust spacing as needed
    borderRadius: 25, // Assuming you want a circular image, adjust border radius as needed
  },

  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2 
  },

  iconTextContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  icon: {
    marginRight: 3,
    width: 15,
    height: 15,
    marginBottom:-4
  },

  icon2: {
    marginRight: 8,
    width: 15,
    height: 15,
    marginBottom:-2
  },



  textTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181818'

  },

  textDesc: {
    fontSize: 14,
    marginRight: 10,
    color: '#7B6F82',
    fontWeight: '400'

  },

  cardText: {
    fontSize: 14,
    color: '#7B6F82',
    fontWeight: '400'
  },

  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 14,
    marginBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  

      // Shadow for Android
      ...Platform.select({
        android: {
          elevation: 2,
        },
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
      }),
  
  },

  rowContent2: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 14,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    marginTop: 2,
    backgroundColor: 'white',
  

      // Shadow for Android
      ...Platform.select({
        android: {
          elevation: 2,
        },
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
      }),
  
  },



  containerTextIcons: {
    marginLeft: 2,
  }

 // #0D0D0D
});
