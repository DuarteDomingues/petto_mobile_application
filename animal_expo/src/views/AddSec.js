import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity,Platform,Image } from 'react-native';
import {  serverTimestamp  } from "firebase/firestore"; 
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import PetManagementService from '../services/PetManagementService';
import PetRequest from '../entities/PetRequest';
import { auth } from '../services/FirebaseModule'; // Adjust the path as needed
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import DropdownComponent from '../components/DropdownComponent';
import UserManagementService from '../services/UserManagementService';


export default function AddSec() {

  
  const isFocused = useIsFocused();
  const userManagementService = new UserManagementService();


   const navigation = useNavigation();
   const route = useRoute();

   const petManagementService = new PetManagementService();

   const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };


  let imageSource = null;
  let imgCat =  require('../../assets/icon_user.png')
  imageSource =  imgCat 
   

  const [userProfileImage, setUserProfileImage] = useState(require('../../assets/person.png'));


  const [pin, setPin] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(null);




  const handleMapPress = (event) => {
   // if (!pin) {
      const { coordinate } = event.nativeEvent;
      const newPin = {
        coordinate,
        title: 'Pet Location',
        description: `Latitude: ${coordinate.latitude}, Longitude: ${coordinate.longitude}`,

      };
      setPin(newPin);
      setSelectedLocation(coordinate);

   // }
  };


    //CUSTOM ALERT
    const[alertMsg, setAlertMsg] = useState('');
    const[alertTitle, setAlertTitle] = useState('');
    const petOwner = auth.currentUser.uid;

  
    const [showAlert, setShowAlert] = useState(false);
  
    const handleShowAlert = () => {
      setShowAlert(true);
    };
  
    const handleCloseAlert = () => {
      setShowAlert(false);
    };

  const {selected,text,textAddress, selectedImgs, selectGender, inputMessage, selectedImgsShort,dateStr} = route.params ?? {};

  console.log("selected", selected)


   const [selectHome, setSelectHome] = useState(null);
   const [selectAct, setSelectAct] = useState(null);
   const [selectSpay, setSelectSpay] = useState(null);
   const [selectSpecial, setSelectSpecial] = useState(null);

   const [selectSize, setSelectSize] = useState(null);

   const [labelBreed, setLabelBreed] = useState(null);
   const [labelColor, setLabelColor] = useState(null);


   let dataBreed = [
    { label: 'Species', value: '1' },

   ];

    if (selected === "Cats"){
      dataBreed = [
        { label: 'Domestic Short Hair', value: '1' },
        { label: 'Domestic Medium Hair', value: '2' },
        { label: 'Taby', value: '3' },
        { label: 'Domestic Long Hair', value: '4' },
        { label: 'Siamese', value: '5' },
        { label: 'Persian', value: '6' },
        { label: 'Calico', value: '7' },
        { label: 'American Shorthair', value: '8' },
        { label: 'Oriental Short Hair', value: '9' },
        { label: 'Bengal', value: '10' },
        { label: 'Tuxedo', value: '11' },
        { label: 'Tortoiseshell', value: '12' },
        { label: 'Maine Coon', value: '13' },
        { label: 'British Shorthair', value: '14' },
        { label: 'Russian Blue', value: '15' },
        { label: 'Abyssinian', value: '16' },
        { label: 'Burmese', value: '17' },
        { label: 'Tiger', value: '18' },
        { label: 'Oriental Long Hair', value: '19' },
        { label: 'Bombay', value: '20' },
        { label: 'Bobtail', value: '21' },
        { label: 'American Curl', value: '22' },
        { label: 'Oriental Tabby', value: '23' },
        { label: 'Birman', value: '24' },
        { label: 'Tonkinese', value: '25' },
        { label: 'Turkish Angora', value: '26' },
        { label: 'Singapura', value: '27' },
        { label: 'Turkish Van', value: '28' },
        { label: 'Snowshoe', value: '29' },
        { label: 'RagDoll', value: '30' }
      ];
    }

    else if (selected === "Dogs"){

      dataBreed = [
        { label: 'Mixed Breed', value: '1' },
        { label: 'Shih Tzu', value: '2' },
        { label: 'Labrador Retriever', value: '3' },
        { label: 'Poodle', value: '4' },
        { label: 'Golden Retriever', value: '5' },
        { label: 'Terrier', value: '6' },
        { label: 'German Shepherd Dog', value: '7' },
        { label: 'Beagle', value: '8' },
        { label: 'Spitz', value: '9' },
        { label: 'Rottweiler', value: '10' },
        { label: 'Schnauzer', value: '11' },
        { label: 'Jack Russell Terrier', value: '12' },
        { label: 'Miniature Pinscher', value: '13' },
        { label: 'Pomeranian', value: '14' },
        { label: 'Cocker Spaniel', value: '15' },
        { label: 'Dalmatian', value: '16' },
        { label: 'Husky', value: '17' },
        { label: 'Chihuahua', value: '18' },
        { label: 'Silky Terrier', value: '19' },
        { label: 'Dachshund', value: '20' },
        { label: 'Pomeranian', value: '21' },
        { label: 'Pug', value: '22' },
        { label: 'Border Collie', value: '23' },
        { label: 'Siberian Husky', value: '24' },
        { label: 'Pit Bull Terrier', value: '25' },
        { label: 'Belgian Shepherd Malinois', value: '26' },
        { label: 'Corgi', value: '27' },
        { label: 'Maltese', value: '28' },
        { label: 'Pekingese', value: '29' },
        { label: 'Bull Terrier', value: '30' }
      ];
    }

    else if (selected === "Roedents"){

      dataBreed = [
        { label: 'Hamster', value: '1' },
        { label: 'Guinea Pig', value: '2' },
        { label: 'Chinchilla', value: '3' },
        { label: 'Gerbil', value: '4' },
        { label: 'Degus', value: '5' },
        { label: 'Mouse', value: '6' },

      ];
    }

    else if (selected === "Rabbits"){

      dataBreed = [
        { label: 'Netherland Dwarf', value: '1' },
        { label: 'Holland Lop', value: '2' },
        { label: 'Mini Rex', value: '3' },
        { label: 'Flemish Giant', value: '4' },
        { label: 'Lionhead', value: '5' },
      ];
    }

    else if (selected === "Birds"){

      dataBreed = [
        { label: 'Budgerigar', value: '1' },
        { label: 'Cockatiel', value: '2' },
        { label: 'African Grey Parrot', value: '3' },
        { label: 'Canary', value: '4' },
        { label: 'Lovebird', value: '5' },
        { label: 'Macaw', value: '6' },
        { label: 'Finch', value: '7' },
      ];


    }
   

   

  const dataColor = [
    { label: 'Black', value: '1' },
    { label: 'Brown', value: '2' },
    { label: 'Golden', value: '3' },
    { label: 'Yellow', value: '4' },
    { label: 'Cream', value: '5' },
    { label: 'Gray', value: '6' },
    { label: 'White', value: '7' },

  ]

    
   const handlePress = (numb, selectType,setSelectType ) => {

    if(selectType!=numb){
      setSelectType(numb);
    }
    else{
      setSelectType(null);
    }
  };

    //still need to check if there wasnt any exception, everything went okay
    async function handleAddPet(petReq){
      let animalId = await petManagementService.addPet(petReq);
      console.log("animId", animalId)
      return animalId;

     }


     async function saveImageBucket(imgArr){

       for (let i = 0; i < imgArr.length; i++) {

        console.log("index", i)
        
        if(imgArr[i] !==null){

         petManagementService.uploadToFirebase(imgArr[i],  (v) =>
      console.log(v)
    );
        }
     }
    }

  async function handleNext(){

    console.log("COORDENADAS ",selectedLocation)

    
    if(selectAct===null){
      setAlertMsg("Select pet activity level.");
      setAlertTitle("Activity level undefined");
      handleShowAlert();
      return;
    }

    if(selectSpay===null){
      setAlertMsg("Select if pet is spayed.");
      setAlertTitle("Spayed status undefined");
      handleShowAlert();
      return;
    }

    
    if(selectSpecial===null){
      setAlertMsg("Select if pet needs special needs.");
      setAlertTitle("Special needs status undefined");
      handleShowAlert();
      return;
    }


    //await saveImageBucket(selectedImgs)
    let downloadImages = await petManagementService.uploadImagesToFirebase(selectedImgs);

    let petReq = new PetRequest(null, selected, text, textAddress, labelBreed, labelColor, selectSize, " ", selectGender, selectAct, selectSpay, selectSpecial,petOwner, downloadImages, inputMessage, selectedLocation, null, serverTimestamp(), dateStr, null);


    let animalId = await handleAddPet(petReq)

  
   navigation.navigate('AnimalPage', {
    animalId })
 }
   


 async function loadUserImage(){

  let quests = await userManagementService.getUserPref()
  setUserProfileImage({ uri: quests[1]})

}



useEffect(() => {

  if(isFocused){ 
    loadUserImage();

  }
}, [isFocused]);


    
    return (
    

    <SafeAreaView  style={styles.container}>

<ScrollView>
<View style={styles.wrapperView}>

<View style={styles.containerTop}>
      <TouchableOpacity onPress={goBack}>


      <View  style={styles.profileImage2}>
<AntDesign name="arrowleft" size={20} color="#1D082B" style={styles.chatIcon} />
</View>

      </TouchableOpacity>
      <Text style={styles.titleTop}>Pet Details</Text>
      <Image source={userProfileImage} style={styles.userImage} />

    </View>






    <View style={styles.pageHeaderV}>

<Text style={{...styles.pageHeader, paddingTop: 16}}>Breed</Text>
</View>

<View style={styles.padExtra}>

<DropdownComponent data={dataBreed} label={labelBreed} setLabel={setLabelBreed}></DropdownComponent>
</View>



<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>Color</Text>
</View>

<View style={styles.padExtra}>
<DropdownComponent data={dataColor} label={labelColor} setLabel={setLabelColor}></DropdownComponent>
</View>








<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>Sterilized</Text>
</View>

<View style={styles.squareContainer2}>

<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Yes", selectSpay, setSelectSpay)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectSpay==="Yes" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
  <Text style={{...styles.squareText2, color: selectSpay ==="Yes" ? 'white' : '#657EFF'}}>Yes</Text>
</View>
</View>
</TouchableOpacity>


<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("No", selectSpay, setSelectSpay)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectSpay==="No" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectSpay ==="No" ? 'white' : '#657EFF'}}>No</Text>
</View>
</View>

</TouchableOpacity>


</View>

<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>Health</Text>
</View>

<View style={styles.squareContainer2}>

<TouchableOpacity  style={styles.buttonstuff} onPress={() => handlePress("Healthy", selectSpecial, setSelectSpecial)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectSpecial==="Healthy" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
  <Text style={{...styles.squareText2, color: selectSpecial ==="Healthy" ? 'white' : '#657EFF'}}>Healthy</Text>
</View>
</View>
</TouchableOpacity>


<TouchableOpacity  style={styles.buttonstuff} onPress={() => handlePress("Injured", selectSpecial, setSelectSpecial)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectSpecial==="Injured" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectSpecial ==="Injured" ? 'white' : '#657EFF'}}>Injured</Text>
</View>
</View>

</TouchableOpacity>


</View>

<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>Activity level</Text>
</View>

<View style={styles.squareContainer2}>

<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Low", selectAct, setSelectAct)}>

<View style={{...styles.smallSquareAge2,backgroundColor: selectAct==="Low" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
  <Text style={{...styles.squareText2, color: selectAct ==="Low" ? 'white' : '#657EFF'}}>Low</Text>
</View>
</View>
</TouchableOpacity>


<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Medium", selectAct, setSelectAct)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectAct==="Medium" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectAct ==="Medium" ? 'white' : '#657EFF'}}>Medium</Text>
</View>
</View>

</TouchableOpacity>

<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("High Energy", selectAct, setSelectAct)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectAct==="High Energy" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectAct ==="High Energy" ? 'white' : '#657EFF'}}>High Energy</Text>
</View>
</View>

</TouchableOpacity>


</View>


<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>Size</Text>
</View>

<View style={styles.squareContainer2}>

<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Small", selectSize, setSelectSize)}>

<View style={{...styles.smallSquareAge2,backgroundColor: selectSize==="Small" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
  <Text style={{...styles.squareText2, color: selectSize ==="Small" ? 'white' : '#657EFF'}}>Small</Text>
</View>
</View>
</TouchableOpacity>


<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Medium", selectSize, setSelectSize)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectSize==="Medium" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectSize ==="Medium" ? 'white' : '#657EFF'}}>Medium</Text>
</View>
</View>

</TouchableOpacity>

<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Large", selectSize, setSelectSize)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectSize==="Large" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectSize ==="Large" ? 'white' : '#657EFF'}}>Large</Text>
</View>
</View>

</TouchableOpacity>


</View>










<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>Location</Text>
</View>

<View style={styles.mapWrapper}>


<MapView
        provider={PROVIDER_GOOGLE} // Use Google Maps on iOS & Android
        style={styles.map}
        onPress={handleMapPress}
       
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




</View>







</ScrollView>



<TouchableOpacity onPress={handleNext}>

<View style={styles.wrapFck}>
<View style={{...styles.squareContinue,  backgroundColor: '#657EFF'}}>
<View style={{...styles.squareContent}}>
<Text style={{...styles.squareTextContinue, color: 'white'}}>Continue</Text>
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

      
      containerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24,
        justifyContent: 'space-between',

      },
      
      titleTop: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        color: '#0D0D0D',
        marginLeft: 5.5

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


      mapWrapper: {
        height: 160,
        backgroundColor: 'white',
        marginLeft: 6,
        marginRight: 6,
        marginTop: 10,
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
    


    squareText: {

        alignItems: 'center',
        color: '#7B6F82',
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
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
      },


      squareContainer2: {
        flexDirection: 'row',
        width: "100%",
        marginTop: 8,
        marginBottom: 12,
        marginStart: 6,
        border: 'None',

      },

      buttonstuff: {
        flex: 1,
      },

      

      smallSquareAge2: {
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
        paddingBottom: 1,
      },  
      squareContent2: {
        flex: 1,
        justifyContent: 'center',
      },
    
    squareContinue: {
        width: "100%",
        height: 34,
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
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500'

      },
      
      squareContent: {
        flex: 1,
        justifyContent: 'center',
      },
     



      wrapFck:{
        paddingLeft: 16,
        paddingRight: 14,
        paddingBottom: 24,


      },

      inputNumeric: {
        height: 32,
        borderRadius: 8,
      //  opacity: 0.85
      borderColor: '#C3CDFF',
      borderWidth: 1, 
      backgroundColor: '#ffffff',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 6,
      width: "48%",

      },

      userImage: {
        width: 38,
        height: 38,
        borderRadius: 20,
        marginRight: 2.5
      },

})