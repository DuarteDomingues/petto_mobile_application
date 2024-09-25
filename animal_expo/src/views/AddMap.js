import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, TextInput, Platform} from 'react-native';
import Line6 from '../components/Line6'; 
import AnimalHeader from '../components/AnimalHeader';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import DropdownComponent from '../components/DropdownComponent';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer2 from '../components/ImageViewer2';

export default function AddMap() {

  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [textAddress, setTextAddress] = useState('');

  const [inputMessage, setInputMessage] = useState('');

  const [pin, setPin] = useState(null);

  const handleMapPress = (event) => {
   // if (!pin) {
      const { coordinate } = event.nativeEvent;
      const newPin = {
        coordinate,
        title: 'Your Pin',
        description: `Latitude: ${coordinate.latitude}, Longitude: ${coordinate.longitude}`,
      };
      setPin(newPin);
   // }
  };



  
  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };





    // handle next button, validate input
    function handleNext(){
        
        console.log("cona")
    
    }

    
    return (
    

    <SafeAreaView  style={styles.container}>

<ScrollView>
<View style={styles.wrapperView}>

  
<View style={styles.containerTop}>
      <TouchableOpacity onPress={goBack}>


      <View  style={styles.profileImage2}>
<AntDesign name="arrowleft" size={20} color="#657EFF" style={styles.chatIcon} />
</View>

      </TouchableOpacity>
      <Text style={styles.titleTop}>Pet location</Text>
    </View>


</View>



<View style={styles.mapWrapper}>


<MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {pin && (
          <Marker
            coordinate={pin.coordinate}
            title={pin.title}
            description={pin.description}
          />
        )}
      </MapView>

      </View>





</ScrollView>

<TouchableOpacity onPress={ handleNext}>

<View style={styles.wrapFck}>
<View style={{...styles.squareContinue,  backgroundColor: '#657EFF'}}>
<View style={{...styles.squareContent}}>
<Text style={{...styles.squareTextContinue, color: 'white'}}>Continue</Text>
</View>
</View>
</View>
</TouchableOpacity>




    </SafeAreaView >

);
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // justifyContent: 'center',
       // backgroundColor: '#EEEEEE'
       backgroundColor: '#FFFCFF'

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

       map: {
        flex: 1,
        width: "100%",
        // Shadow for Android
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

      mapWrapper: {
        height: 160,
        backgroundColor: 'white',
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
    
   
    
    

      containerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 32
        
      },
      titleTop: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        color: '#0D0D0D',
        paddingRight:32, //adicionei 4 por cause da margem esq
      },

      profileImage2: {
        width: 28, // Set the desired width
        height: 28, // Set the desired height
        borderRadius: 8, // Half of the width and height for a circular shape
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center', // Center vertically
   
        marginLeft: 4,
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
    

      wrapperView:{
        width:'100%',
        padding: 10,
      },



    pageHeaderV:{
        flexDirection: 'row',
        alignItems: 'center',
      },

    
      pageHeader: {
        flex: 1, // Takes up all available space
        fontSize: 16,   
        padding: 4,          
        fontWeight: '500',
       // color: '#292b2c'
        color: '#181818'
      },
    
      smallSquareColors: {
        width: "97%",
        height: 30,
        borderRadius: 8,
      //  opacity: 0.85
      borderColor: '#C3CDFF',
      borderWidth: 1, 
      backgroundColor: '#ffffff',
      marginTop: 8,
      marginBottom: 12,
      marginLeft: 6

    },

    squareText: {

        alignItems: 'center',
        color: '#0D0D0D',
        fontSize: 14,
        paddingLeft: 12, 
        fontWeight: '400',
      },  

      squareIcon: {
        marginLeft: 'auto', // Add margin to separate the icon from the text
        marginRight: 10,
        marginTop: 4

      },
      squareContent: {
        flex: 1,
        justifyContent: 'center',
      },


      squareContainer2: {
        flexDirection: 'row',
        width: "92%",
        marginTop: 9,
        marginBottom: 12,
        marginStart: 6,
        border: 'None',

      },

      
    padHeadV:{
      marginBottom:4
    },


      smallSquareAge2: {
        width: 54,
        height: 26,
        borderColor: '#C3CDFF',
        borderRadius: 8,
      borderWidth: 1, 
      marginRight: 13, 
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center'

    },


    squareText2: {
        alignItems: 'center',
        color: '#181818',
        fontSize: 14,
        marginTop: 2,

      },  

    
    squareContinue: {
        width: "100%",
        height: 35,
        borderColor: 'black',
        borderRadius: 10,
      //  opacity: 0.85

      marginRight: 17, 
    backgroundColor: '#ffffff',
        alignItems: 'center',
        textAlign: 'center',

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

    squareContent: {
      flex: 1,
      justifyContent: 'center',
    },
    squareTextContinue: {
        alignItems: 'center',
        fontSize: 19,
        textAlign: 'center',
        fontWeight: '500'

      },  

      wrapFck:{
        paddingLeft: 16,
        paddingRight: 15,
        paddingBottom: 24,


      },

      inputNumeric: {
        height: 30,
        borderRadius: 8,
      //  opacity: 0.85
      borderColor: '#C3CDFF',
      borderWidth: 1, 
      backgroundColor: '#ffffff',
      marginTop: 8,
      marginBottom: 12,
      marginLeft: 6,
      width: "48%",

      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden', // Ensure content doesn't overflow
      paddingLeft: 12
      },

      numericCena: {
        marginLeft: 'auto',
        justifyContent: 'center',
        backgroundColor: '#657EFF',
        height: '100%',
        paddingTop: 4,
        width: '16%',
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
       // paddingLeft: 5
       textAlign: 'center'
      },

      input: {
        flex: 1,
        height: 50,
        borderColor: '#C3CDFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        marginHorizontal: 5,
        marginRight: 6,
        marginTop: 8,
        fontSize: 14,
        color: '#333', // Text color
      }
      
})