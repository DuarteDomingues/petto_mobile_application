import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';


const AnimalHeader = ({ selected, setSelected, handlePress }) => {


  const windowWidth = Dimensions.get('window').width;


    const animalImages = [
        require('../../assets/imgs/search_animals/final/dogfpng.png'),
        require('../../assets/imgs/search_animals/final/catfpng.png'),
        require('../../assets/imgs/search_animals/final/rabfpng.png'),
        require('../../assets/imgs/search_animals/final/birdfpng.png'),
        require('../../assets/imgs/search_animals/final/hedfpng.png'),
    ];

    /*
      const [selected, setSelected] = useState(null);
    
      const handlePress = (numb) => {
        console.log("xd");

        if(selected!=numb){
        setSelected(numb);
        }
        else{
          setSelected(null);
        }
      };

      */
    return (

<View style={styles.animalTypeContainer}>


<TouchableOpacity style={styles.animalTypeBlock}  onPress={() => handlePress("Dogs")}>

      <View style={styles.shadowView}>

        <Image source={animalImages[0]}  style={{
    ...(selected==="Dogs" ? styles.animalTypeImage2 : styles.animalTypeImage),
    width: windowWidth * 0.1488,
    height: windowWidth * 0.1488,
  }}/>

        </View>

        <Text style={{...(selected==="Dogs" ? styles.animalTypeTextBird: styles.animalTypeText)}}>Dogs</Text>
      </TouchableOpacity>



      <TouchableOpacity style={styles.animalTypeBlock}  onPress={() => handlePress("Cats")}>
      <View style={styles.shadowView}>
      <Image source={animalImages[1]}  style={{
    ...(selected==="Cats" ? styles.animalTypeImage2 : styles.animalTypeImage),
    width: windowWidth * 0.1488,
    height: windowWidth * 0.1488,
  }}/>
        </View>
        <Text style={{...(selected==="Cats" ? styles.animalTypeTextBird: styles.animalTypeText)}}>Cats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.animalTypeBlock}  onPress={() => handlePress("Rabbits")}>
      <View style={styles.shadowView}>
      <Image source={animalImages[2]}  style={{
    ...(selected==="Rabbits" ? styles.animalTypeImage2 : styles.animalTypeImage),
    width: windowWidth * 0.1488,
    height: windowWidth * 0.1488,
  }}/>
        </View>
        <Text style={{...(selected==="Rabbits" ? styles.animalTypeTextBird: styles.animalTypeText)}}>Rabbits</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.animalTypeBlock}  onPress={() => handlePress("Birds")}>
      <View style={styles.shadowView}>
      <Image source={animalImages[3]}  style={{
    ...(selected==="Birds"? styles.animalTypeImage2 : styles.animalTypeImage),
    width: windowWidth * 0.1488,
    height: windowWidth * 0.1488,
  }}/>
        </View>
        <Text style={{...(selected==="Birds" ? styles.animalTypeTextBird: styles.animalTypeText)}}>Birds</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.animalTypeBlock}  onPress={() => handlePress("Roedents")}>
      <View style={styles.shadowView}>
      <Image source={animalImages[4]}  style={{
    ...(selected==="Roedents" ? styles.animalTypeImage2 : styles.animalTypeImage),
    width: windowWidth * 0.1488,
    height: windowWidth * 0.1488,
  }}/>
        </View>
        <Text style={{...(selected==="Roedents" ? styles.animalTypeTextBird: styles.animalTypeText)}}>Roedents</Text>


      </TouchableOpacity>
    </View>

);
};

const styles = StyleSheet.create({

    animalTypeContainer: {
        flexDirection: 'row',
        width: '102%',
        marginTop: 8,
        marginBottom: 5,
      
    },
    animalTypeBlock: {
      flex: 1,
      marginRight: 8,
      alignItems: 'center',

    },
    xdd:{
     // backgroundColor: 'red'
    },

    selectedBlock: {
      backgroundColor: 'red'
    },


     
     shadowView: {
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 3

     },

     
    
      animalTypeImage: {
      //  width: 60,
       // height: 60,
        borderRadius: 8, 
        //backgroundColor: '#A8B6FA',
     backgroundColor: '#C3CDFC',
       //backgroundColor: '#B1BDF8',
       //#BBC5F6
        //#A8B6FA
        overflow: 'hidden', // Ensure the image is clipped to the border radius

      },

      animalTypeImage2: {
        //  width: 60,
         // height: 60,
          borderRadius: 8, 
          backgroundColor: '#657EFF',
          opacity: 1
        },
        
      
      animalTypeText: {
        fontSize: 13,
        color:     '#7B6F82'
      },
    
      animalTypeTextBird:{
    
        fontSize: 13,
        color : '#657EFF'
      },
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2, // Android shadow
  

})


export default AnimalHeader;
