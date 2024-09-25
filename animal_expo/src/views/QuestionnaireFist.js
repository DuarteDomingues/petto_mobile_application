import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity,Platform, TextInput} from 'react-native';

import {  AntDesign  } from '@expo/vector-icons';
import DropdownComponent from '../components/DropdownComponent';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import MapView, { Marker } from 'react-native-maps';
import {  GeoPoint } from "firebase/firestore";
import UserManagementService from '../services/UserManagementService';

export default function QuestionnaireFirst() {

  const userService = new UserManagementService();


  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const [textAddress, setTextAddress] = useState('');
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(null);
  const [valueColor, setValueColor] = useState(null);


  //Alert Stuff
  const[alertMsg, setAlertMsg] = useState('');
  const[alertTitle, setAlertTitle] = useState('');

  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  const handlePress = (numb) => {

    if(selected!=numb){
    setSelected(numb);
    }
    else{
      setSelected(null);
    }
  };

  //--------------------------------


  const [pin, setPin] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);


  const handleMapPress = (event) => {
   // if (!pin) {
      const { coordinate } = event.nativeEvent;
      const newPin = {
        coordinate,
        title: 'Your Location',
        description: `Latitude: ${coordinate.latitude}, Longitude: ${coordinate.longitude}`,
      };
      setPin(newPin);
      setSelectedLocation(coordinate);

   // }
  };















   function handleNext(){

    if(value===null){

      setAlertMsg("Choose a pet you would like to adopt.");
      setAlertTitle("Pet not chosen");
      handleShowAlert();
      return;
    }

    if(valueColor===null){
      setAlertMsg("Choose an ideal pet color.");
      setAlertTitle("Color not chosen");
      handleShowAlert();
      return;
    }

    console.log("sel", value)

    if(value==="Rabbit" || value ==="Roedent" || value==="Bird"){

      let arraySendFb = []

      arraySendFb.push(value)

      userService.updateUserPreferences(arraySendFb);

      navigation.navigate('HomePage')
  

      console.log("STOP QUEST")
    }

    else{
    navigation.navigate('QuestionnaireSec', {
      selected,
      textAddress,
      value,
      valueColor,
      selectedLocation
    });
  }

   }
  

  const data = [
    { label: 'Dog', value: '1' },
    { label: 'Cat', value: '2' },
    { label: 'Rabbit', value: '3' },
    { label: 'Bird', value: '4' },
    { label: 'Roedent', value: '5' },
  ];

  const dataColor = [
    { label: 'Black', value: '1' },
    { label: 'Brown', value: '2' },
    { label: 'Golden', value: '3' },
    { label: 'Yellow', value: '4' },
    { label: 'Cream', value: '5' },
    { label: 'Gray', value: '6' },
    { label: 'White', value: '7' },

  ]

    

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      <View style={styles.pageHeaderaddx}>
<View style={styles.userPeterCont}>


      <View style={styles.textContainer}>

<Text style={{...styles.pageHeaderadd, marginBottom:-1}}>Step 1 of 3</Text>

<Text style={{...styles.pageHeaderaddloc}}>About me</Text>
</View>


<View  style={styles.profileArrows}>

<TouchableOpacity>
<AntDesign name="left" size={17} color="#D9D9D9" style={styles.chatIcon} onPress={goBack} />
</TouchableOpacity>


<AntDesign name="right" size={17} color="#657EFF" style={styles.chatIcon} />
</View>

</View>


<View style={styles.containerLine}>
      <View style={styles.line1} />
      <View style={styles.line2} />
      <View style={styles.line3} />
    </View>

</View>


<View style={styles.wrapperView}>


<View style={styles.pageHeaderV}>

        <Text style={styles.pageHeader}>What pet would you like to adopt? *</Text>
</View>

<View style={styles.padExtra}>
<DropdownComponent data={data} label={value} setLabel={setValue} ></DropdownComponent>
</View>




<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>What's your preferred pet color? * </Text>
</View>

<View style={styles.padExtra}>

<DropdownComponent data={dataColor} label={valueColor} setLabel={setValueColor}  ></DropdownComponent>
</View>





      <View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>What's your location?</Text>
</View>







<View style={styles.mapWrapper}>


<MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 38.7223, // Latitude of Lisbon
  longitude: -9.1393, // Longitude of Lisbon
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


      <View style={styles.smallSquareColors}>
<View style={styles.squareContent}>
        <TextInput style={styles.squareText3}
         placeholder="Your Location"
         placeholderTextColor="#7B6F82" // Customize placeholder text color
         value={textAddress}
         onChangeText={setTextAddress}
        />
        </View>

</View>





</View>


      </ScrollView>

      <TouchableOpacity  onPress={handleNext}>

<View style={styles.wrapFck}>
<View style={{...styles.squareContinue,  backgroundColor: '#657EFF'}}>
<View style={{...styles.squareContentxd}}>
<Text style={{...styles.squareTextContinue, color: 'white'}}>Next</Text>
</View>
</View>
</View>
</TouchableOpacity>

<CustomAlert
        visible={showAlert}
        onClose={handleCloseAlert}
        title={alertTitle}
        message={alertMsg}
      />


    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCFF'
  },

  wrapperView: {

    padding: 10
},

  pageHeaderaddx: {
    paddingTop: 50,
    paddingBottom: 10,
    
  },

  pageHeaderadd: {
    fontSize: 14,
    marginBottom: 3,
    paddingTop: 5,
    color: '#7B6F82',
    paddingLeft: 15,
    paddingRight: 15,   
  },

  padExtra:{
    marginBottom:4
  },


  pageHeaderaddloc: {
    fontSize: 16,
    color: '#181818',
    fontWeight: '500',
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,   
  },

  pageHeaderVS: {

    paddingBottom: 2,
    paddingLeft: 14,
    paddingRight: 14,    
  
  },


  wrapperSiml:{
    paddingLeft: 14,
    paddingRight: 14,    
  },

     userPeterCont: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1, // Adjust the border width as needed
    borderTopColor: '#657EFF', // Adjust the border color as needed
  },

  profileArrows: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    paddingLeft: 14,
    paddingRight: 14,   
  },

  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1, // Adjust the height of the bottom border
    backgroundColor: 'red', // Color of the bottom border
  },

  containerLine: {
    flexDirection: 'row',
    width: '100%', // Fills the screen width
  },
  line1: {
    flex: 1,
    height: 3, // Adjust the height of the lines
    backgroundColor: '#657EFF', // Adjust the color of the lines
  },

  line2: {
    flex: 1,
    height: 3, // Adjust the height of the lines
    backgroundColor: '#D9D9D9', // Adjust the color of the lines
  },

  line3: {
    flex: 1,
    height: 3, // Adjust the height of the lines
    backgroundColor: '#D9D9D9', // Adjust the color of the lines
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
  marginBottom: 4,
  marginLeft: 5,
  flexDirection: 'row',
    alignItems: 'center'


},

squareContent3: {
  paddingLeft: 13
},

squareContent: {
  paddingLeft: 5
},

squareContentxd: {
  flex: 1,
  justifyContent: 'center',
},



squareText: {
  alignItems: 'center',
  color: '#0D0D0D',
  fontSize: 14,
  fontWeight: '400',
},

squareText3: {

  alignItems: 'center',
  color: '#0D0D0D',
  fontSize: 14,
  paddingLeft: 12, 
  fontWeight: '400',
}, 


radioButton: {
  marginLeft: 13,
},


buttons: {
  paddingBottom: 14,
},

squareText2: {
  alignItems: 'center',
  color: '#7B6F82',
  fontSize: 14,
  fontWeight: '400',
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

squareTextContinue: {
alignItems: 'center',
color: '#181818',
fontSize: 18,
textAlign: 'center',
fontWeight: '500'

},  

wrapFck:{
paddingLeft: 15,
paddingRight: 15,
paddingBottom: 34,

},





mapWrapper: {
  height: 160,
  backgroundColor: 'white',
  marginLeft: 6,
  marginRight: 6,
  marginTop: 12,
  marginBottom: 8,
  overflow: 'hidden', // Ensure the border radius is applied correctly
  borderRadius: 8, // Add border radius

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


map: {
flex: 1,
width: "100%",
borderRadius: 10, // Add border radius
overflow: 'hidden', // Ensure the border radius is applied correctly

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




});
