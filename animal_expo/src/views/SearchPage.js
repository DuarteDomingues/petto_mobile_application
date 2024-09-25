import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, FlatList,Platform, TouchableOpacity} from 'react-native';
import SearchBar3 from '../components/SearchBar3';
import {AntDesign } from '@expo/vector-icons';
import Footer from '../components/Footer';
import CardProductsHor2 from '../components/CardProductsHor2';
import { useNavigation, useRoute, useIsFocused  } from '@react-navigation/native';
import PetManagementService from '../services/PetManagementService';

export default function SearchPage() {

  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  const [inputSearch, setInputSearch] = useState('');
  const [firstTimeName, setFirstTimeName] = useState(false);

const { filters, imageIds, recentAnimals, animalQuestRec, inputSearchHome} = route.params ?? {};



  const petManagementService = new PetManagementService();

  const [petsFound, setPetsFound] = useState([])
  const [lastPetFound, setLastPetFound] = useState(null)
  const [firstDoc, setFirstDoc] = useState(null)

  
  const addPets = (newPets) => {
    // Update the state by merging the existing petsFound array with the newPets array
    setPetsFound((prevPetsFound) => [...prevPetsFound, ...newPets]);
  };



  async function handleLoadMore(){


    if(petsFound!==null &&  petsFound.length>5){
    if(firstTimeName===false){
    if(filters!==undefined && filters!==null){

    let petsResult = await petManagementService.getPetsByFilter(6, lastPetFound, firstDoc, filters);

    addPets(petsResult[0])
    let lastPet = petsResult[1]
    setLastPetFound(lastPet)
    }
  }
  else{

    let petsResult = await petManagementService.getPetsByName(6, lastPetFound, firstDoc, inputSearch)
    addPets(petsResult[0])
    let lastPet = petsResult[1]
    setLastPetFound(lastPet)
  }
  }

  }


  const imageSource = require('../../assets/IMG_9257.jpg');
  const imageSource2 = require('../../assets/imgs/chu.jpg');
  const updateSearch = (search) => {
    setSearch(search);
  };


   function handleOnSubmitEditing() {

    setPetsFound(null)
    handlePetsByName(inputSearch)

  };

  async function handlePetsByName(inputVal){


    let petsResult = await petManagementService.getPetsByName(6, null, null, inputVal)

    setPetsFound(petsResult[0])
    setFirstTimeName(true)
    if(petsResult[0] !== null && petsResult[0].length===6){

      let lastPet = petsResult[1]
      setLastPetFound(lastPet)
      setFirstDoc(petsResult[2])

    }
  }





  async function loadPets(){


    if(inputSearchHome!==null && inputSearchHome!==undefined && inputSearchHome!==""){
      setPetsFound(null)
      handlePetsByName(inputSearchHome)

    }


    if(animalQuestRec!==undefined && animalQuestRec!==null){

      if(animalQuestRec.length>0){
      
     // let petx = await petManagementService.getPetsRecent(recentAnimals[1], 12);
      setPetsFound(animalQuestRec)
      }

    }

    if(recentAnimals!==undefined && recentAnimals!==null){
      
      let petx = await petManagementService.getPetsRecent(recentAnimals[1], 12);
      setPetsFound(petx)

    }

    if(imageIds!==undefined && imageIds!==null){

      let petx = await petManagementService.getPetsByImg(imageIds);
      setPetsFound(petx)

    }

     if(filters!==undefined && filters!==null ){

    let petsResult = await petManagementService.getPetsByFilter(6, null, null, filters);
    setPetsFound(petsResult[0])

    let lastPet = petsResult[1]
    setLastPetFound(lastPet)
    setFirstDoc(petsResult[2])
    setFirstTimeName(false)
    }
  }

  useEffect(() => {

    if(isFocused){ 

    loadPets();
    }
  }, [isFocused]);


    return (
    

<SafeAreaView  style={styles.container}>

               
    <View style={styles.wrapperView}>


        <View  style={styles.usefulV}>

<View style= {styles.xd}>
        <SearchBar3 inputSearch={inputSearch}  setInput={setInputSearch}  handleInput={handleOnSubmitEditing} ></SearchBar3>
        </View>
        </View>




        {petsFound == null || petsFound.length == 0 ? (
  <View style={styles.xd2}>
    <Text style={styles.txtCenter}>Search for a pet using filters, name, or image...</Text>
  </View>
) : 

(
  <View></View>
)}
      {/*  
        <View style={styles.squareContainer}>

      <View style={styles.smallSquareAge}>
      <View style={styles.squareContent}>
          <Text style={styles.squareText}>Ages</Text>
          <AntDesign name="down" size={8} color="white" style={styles.squareIcon} />
        </View>
      </View>

        <View style={styles.smallSquareAge}>
        <View style={styles.squareContent}>

        <Text style={styles.squareText}>Sizes</Text>
        <AntDesign name="down" size={8} color="white" style={styles.squareIcon} />

        </View>
        </View>

        <View style={styles.smallSquareColors}>
        <View style={styles.squareContent}>
        <Text style={styles.squareText}>Colors</Text>
        <AntDesign name="down" size={8} color="white" style={styles.squareIcon} />
        </View>
        </View>


        <View style={styles.smallSquareBenders}>
        <View style={styles.squareContent}>
        <Text style={styles.squareText}>Breeds</Text>
        <AntDesign name="down" size={8} color="white" style={styles.squareIcon} />
        </View>
        </View>


     {/* <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={styles.filtIcon}>
       <Image
  source={require('../../assets/imgs/xdeditwhite.png')} // Replace with the actual path to your image
  style={styles.additionalIcon}
/>
</TouchableOpacity>

    

      </View>
    */}


    <View style={styles.spacingView}>
      </View>


      <FlatList
                data={petsFound}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore} // Call handleLoadMore function when reaching the end of the list
                onEndReachedThreshold={0.7}
                initialNumToRender = {6}
          
                renderItem={({ item }) => (
                    <CardProductsHor2 imgLink={imageSource}
                        title={item.name}  age={item.age} location={item.address} selectedImage={item.petImages[0]} gender={item.gender} petId={item.petId} />
                )}
            />
<View style={styles.fillView}>
</View>


    <Footer footerPage='search'></Footer>

    </View >
          
</SafeAreaView >

    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
    //  backgroundColor: '#EEEEEE'
    backgroundColor: '#FFFCFF'

    },

    xd: {
      paddingTop: 11
    },

    txtCenter: {
      textAlign: 'center',
      fontSize: 16,
      color: '#7B6F82'
    },

    xd2:{
      //backgroundColor: 'purple',
      flex: 1,
      justifyContent: 'flex-end', // Center content vertically
      
    },
    

    ScrollView:{
        backgroundColor: 'blue',
        width:'100%',
      
      },
    
      wrapperView:{
        width:'100%',
       // flex: 1
       height: '100%',
      },


      usefulV: {
        paddingLeft: 10,
        paddingRight: 10
      },

      squareContainer: {
        flexDirection: 'row',
        width: "100%",
        marginTop: 9,
        marginBottom: 1,
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: 'center',
        textAlign: 'center',
        height: 32,
        backgroundColor: 'white',
        borderTopWidth: 0.8, // Add top border
        borderBottomWidth: 0.8, // Add bottom border
        borderColor: '#C3CDFF', // Set the border color
        
// Shadow for Android
...Platform.select({
  android: {
    elevation: 1,
  },
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
}),
      },

      smallSquareGender: {
        width: 57,
        height: 17,
        borderColor: 'black',
        borderRadius: 9,

        borderColor: '#657EFF',
        borderWidth: 1,
        marginRight: 7, 
        backgroundColor: '#C3CDFF',
        textAlign: 'center',
        alignItems: 'center',
        paddingLeft:2,
      },

      smallSquareAge: {
        width: 54,
        height: 17,
        borderColor: 'black',
        borderRadius: 9,
      marginRight: 7, 
      backgroundColor: '#C3CDFF',
      textAlign: 'center',
      paddingLeft:2,

    },

    smallSquareColors: {
      width: 61,
      height: 17,
      borderRadius: 9,
    marginRight: 7, 
    backgroundColor: '#C3CDFF',
    paddingLeft:2,
  },

  smallSquareBenders: {
    width: 64,
    height: 17,
    borderColor: 'black',
    borderRadius: 9,
 // borderColor: '#899DFF',
 // borderWidth: 1, 
 //backgroundColor: '#ffffff'
 backgroundColor: '#C3CDFF',
 paddingLeft:2,
},

      squareText: {
        alignItems: 'center',
        //color: '#0D0D0D',
        color: 'white',
        fontSize: 11,
        fontWeight: 'medium',
        paddingLeft: 5, 
      },  

      squareIcon: {
        marginLeft: 2, // Add margin to separate the icon from the text
        marginTop: 2,
      },
      squareContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      columnWrapper:{
        width: '100%',
        flex: 1,
        marginStart: 8,
      },

      filtIcon: {
        marginLeft: 'auto',
        overflow: 'hidden', // Ensure the image is clipped to the border radius

        ...Platform.select({
          android: {
            elevation: 3,
          },
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
        }),

      },
    

      additionalIcon: {
     //   borderColor: "#657EFF", // Add a blue border color
      //  borderWidth: 1, // Adjust the border width as needed
       // padding: 5, // Optional: Add padding to the icon
        borderRadius: 6, // Optional: Add border radius for a rounded look
        width: 27,
        height: 27,
      //  marginTop: -5,
        backgroundColor: '#657EFF',
      
      },

      spacingView:{
        paddingBottom: 9
      }
});