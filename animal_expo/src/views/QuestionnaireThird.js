import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons, AntDesign  } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import PetRequest from '../entities/PetRequest'
import UserManagementService from '../services/UserManagementService';


export default function QuestionnaireThird() {


  const navigation = useNavigation();
  const route = useRoute();

  const { textAddress, value,selectedGend,valueAge,selectedSize, valueColor,selectedAct,selectedLocation,valueBreed} = route.params ?? {};

  let arraySendFb = [value,valueColor, textAddress, selectedGend, valueAge,selectedSize, selectedAct,selectedLocation, valueBreed];

  const userService = new UserManagementService();

  const[alertMsg, setAlertMsg] = useState('');
  const[alertTitle, setAlertTitle] = useState('');

  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };


    //radio buttons
    const [selectedSpay, setSelectedSpay] = useState(null);
    const [selectedSpecial, setSelectedSpecial] = useState(null);

  //handle radio buttons
  const handlePress = (numb, selectType, setSelectedType) => {

    if(selectType!=numb){
      setSelectedType(numb);
    }
    else{
      setSelectedType(null);
    }
  };



const petReq = new PetRequest();


function handleNext(){

    if(selectedSpay===null){

      setAlertMsg("Choose pet sterilized preference.");
      setAlertTitle("Pet Sterilized not defined");
      handleShowAlert();
      return;
    }

    if(selectedSpecial===null){
      setAlertMsg("Choose if you would adopt with special needs.");
      setAlertTitle("Pet with special needs not defined");
      handleShowAlert();
      return;

    }

    arraySendFb.push(selectedSpay);
    arraySendFb.push(selectedSpecial);

    //update User Preferences in Firestore
    userService.updateUserPreferences(arraySendFb);

    navigation.navigate('HomePage')


  }


  const [isSelected, setIsSelected] = useState(false);
  

  const data = [
    { label: 'Dog', value: '1' },
    { label: 'Cat', value: '2' },
    { label: 'Rabbit', value: '3' },
    { label: 'Bird', value: '4' },
    { label: 'Roedent', value: '5' },
  ];
    


  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>


      <View style={styles.pageHeaderaddx}>
<View style={styles.userPeterCont}>


      <View style={styles.textContainer}>

<Text style={{...styles.pageHeaderadd, marginBottom:-1}}>Step 3 of 3</Text>

<Text style={{...styles.pageHeaderaddloc}}>My pet's health</Text>
</View>


<View  style={styles.profileArrows}>

<TouchableOpacity>
<AntDesign name="left" size={17} color="#D9D9D9" style={styles.chatIcon} onPress={() => navigation.navigate('QuestionnaireSec')} />
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

        <Text style={styles.pageHeader}>I prefer my pet sterilized? *</Text>
</View>

<View style={styles.buttons}>

<TouchableOpacity
        style={styles.smallSquareColors}
        onPress={() => handlePress("Yes", selectedSpay, setSelectedSpay)}
      >
        <MaterialIcons
          name={selectedSpay==="Yes" ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={18}
          color="#657EFF"
          style={styles.radioButton}
        />
        <View style={styles.squareContent}>
          <Text style={styles.squareText}>Yes</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.smallSquareColors}
        onPress={() => handlePress("No", selectedSpay, setSelectedSpay)}
      >
        <MaterialIcons
          name={selectedSpay==="No" ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={18}
          color="#657EFF"
          style={styles.radioButton}
        />
        <View style={styles.squareContent}>
          <Text style={styles.squareText}>No</Text>
        </View>
      </TouchableOpacity>

      </View>

      
<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>I don’t mind adopting a pet with special needs? *</Text>

</View>







<View style={styles.buttons}>

<TouchableOpacity
style={styles.smallSquareColors}
onPress={() => handlePress("Yes", selectedSpecial, setSelectedSpecial)}
>
<MaterialIcons
  name={selectedSpecial==="Yes" ? 'radio-button-checked' : 'radio-button-unchecked'}
  size={18}
  color="#657EFF"
  style={styles.radioButton}
/>
<View style={styles.squareContent}>
  <Text style={styles.squareText}>Yes</Text>
</View>
</TouchableOpacity>

<TouchableOpacity
style={styles.smallSquareColors}
onPress={() => handlePress("No", selectedSpecial, setSelectedSpecial)}
>
<MaterialIcons
  name={selectedSpecial==="No" ? 'radio-button-checked' : 'radio-button-unchecked'}
  size={18}
  color="#657EFF"
  style={styles.radioButton}
/>
<View style={styles.squareContent}>
  <Text style={styles.squareText}>No</Text>
</View>
</TouchableOpacity>

</View>




  



</View>


      </ScrollView>

      <TouchableOpacity onPress={handleNext}>

<View style={styles.wrapFck}>
<View style={{...styles.squareContinue,  backgroundColor: '#657EFF'}}>
<View style={{...styles.squareContentxd}}>
<Text style={{...styles.squareTextContinue, color: 'white'}}>Finish</Text>
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
    backgroundColor: '#D9D9D9', // Adjust the color of the lines
  },

  line2: {
    flex: 1,
    height: 3, // Adjust the height of the lines
    backgroundColor: '#D9D9D9', // Adjust the color of the lines
  },

  line3: {
    flex: 1,
    height: 3, // Adjust the height of the lines
    backgroundColor: '#657EFF', // Adjust the color of the lines
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





squareText: {
  alignItems: 'center',
  color: '#0D0D0D',
  fontSize: 14,
  fontWeight: '400',
},
radioButton: {
  marginLeft: 13,
},


buttons: {
  paddingBottom: 14
},

squareText2: {
  alignItems: 'center',
  color: '#7B6F82',
  fontSize: 14,
  fontWeight: '400',
},


     
squareContinue: {
  width: "100%",
  height: 34,
  borderColor: 'black',
  borderRadius: 12,
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

squareContentxd: {
  flex: 1,
  justifyContent: 'center',
},

});
