import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons, AntDesign} from '@expo/vector-icons';
import DropdownComponent from '../components/DropdownComponent';
import { useNavigation, useRoute  } from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import DatePicker from 'react-native-date-picker'

export default function QuestionnaireSec() {

  const navigation = useNavigation();
  const route = useRoute();

  const { selected, textAddress, value, valueColor, selectedLocation } = route.params ?? {};

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  
  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };


  const[alertMsg, setAlertMsg] = useState('');
  const[alertTitle, setAlertTitle] = useState('');

  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  //dropdown data
  const data = [
    { label: 'Dog', value: '1' },
    { label: 'Cat', value: '2' },
    { label: 'Rabbit', value: '3' },
    { label: 'Bird', value: '4' },
    { label: 'Roedent', value: '5' },
  ];

  let dataBreed = [
    { label: 'Species', value: '1' },

   ];

    if (value === "Cat"){
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

    else if (value === "Dog"){

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

    else if (value === "Roedent"){

      dataBreed = [
        { label: 'Roedents', value: '1' },
      ];
    }

    else if (value === "Rabbit"){

      dataBreed = [
        { label: 'Rabbits', value: '1' },
      ];
    }

    else if (value === "Bird"){

      dataBreed = [
        { label: 'Birds', value: '1' },
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

  const dataAge = [

    { label: 'Baby', value: '1' },
    { label: 'Young', value: '2' },
    { label: 'Adult', value: '3' },
    { label: 'Senior', value: '4' },

  ]



  //radio buttons
  const [selectedGend, setSelectedGend] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAct, setSelectedAct] = useState(null);


  //dropdown
  const [valueBreed, setValueBreed] = useState(null);
  const [valueAge, setValueAge] = useState(null);


  //handle radio buttons
  const handlePress = (numb, selectType, setSelectedType) => {

    if(selectType!=numb){
      setSelectedType(numb);
    }
    else{
      setSelectedType(null);
    }
  };
    
  //handle next button
  function handleNext(){


    if(valueBreed===null){
      setAlertMsg("Choose an ideal breed.");
      setAlertTitle("Breed not chosen");
      handleShowAlert();
      return;
    }

    if(valueAge===null){
      setAlertMsg("Choose an ideal age.");
      setAlertTitle("Age not chosen");
      handleShowAlert();
      return;
    }

    if(selectedGend===null){

      setAlertMsg("Choose an ideal pet gender.");
      setAlertTitle("Gender not chosen");
      handleShowAlert();
      return;
    }

   

    if(selectedSize===null){
      setAlertMsg("Choose an ideal pet size.");
      setAlertTitle("Size not chosen");
      handleShowAlert();
      return;

    }

    if(selectedAct===null){
      setAlertMsg("Choose an ideal pet activity level.");
      setAlertTitle("Activity level not chosen");
      handleShowAlert();
      return;

    }

    navigation.navigate('QuestionnaireThird', {

      selected,
      textAddress,
      value,
      selectedGend,
      valueAge,
      selectedSize,
      selectedLocation,
      selectedAct,
      valueColor,
      valueBreed
    });
   }

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>


      <View style={styles.pageHeaderaddx}>
<View style={styles.userPeterCont}>


      <View style={styles.textContainer}>

<Text style={{...styles.pageHeaderadd, marginBottom:-1}}>Step 2 of 3</Text>

<Text style={{...styles.pageHeaderaddloc}}>My perfect pet</Text>
</View>


<View  style={styles.profileArrows}>


<TouchableOpacity>
<AntDesign name="left" size={17} color="#D9D9D9" style={styles.chatIcon} onPress={() => navigation.navigate('QuestionnaireFirst')} />
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

<Text style={styles.pageHeader}>What's a breed you are interested in? *</Text>
</View>

<View style={styles.padExtra}>

<DropdownComponent data={dataBreed} label={valueBreed} setLabel={setValueBreed}></DropdownComponent>
</View>



<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>What's the ideal age of my pet? *</Text>
</View>

<View style={styles.padExtra}>

<DropdownComponent data={dataAge} label={valueAge} setLabel={setValueAge}></DropdownComponent>
</View>








<View style={styles.pageHeaderV}>

        <Text style={styles.pageHeader}>What's the ideal gender of my pet? *</Text>
</View>


<View style={styles.buttons}>

<TouchableOpacity
        style={styles.smallSquareColors}
        onPress={() => handlePress("Male", selectedGend, setSelectedGend)}
      >
        <MaterialIcons
          name={selectedGend==="Male" ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={18}
          color="#657EFF"
          style={styles.radioButton}
        />
        <View style={styles.squareContent}>
          <Text style={styles.squareText}>Male</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.smallSquareColors}
        onPress={() => handlePress("Female", selectedGend, setSelectedGend)}
      >
        <MaterialIcons
          name={selectedGend==="Female" ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={18}
          color="#657EFF"
          style={styles.radioButton}
        />
        <View style={styles.squareContent}>
          <Text style={styles.squareText}>Female</Text>
        </View>
      </TouchableOpacity>

      </View>




      
<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>What's the ideal size of my pet? *</Text>
</View>

<View style={styles.buttons}>

<TouchableOpacity
style={styles.smallSquareColors}
onPress={() => handlePress("Small", selectedSize, setSelectedSize)}
>
<MaterialIcons
  name={selectedSize==="Small"? 'radio-button-checked' : 'radio-button-unchecked'}
  size={18}
  color="#657EFF"
  style={styles.radioButton}
/>
<View style={styles.squareContent}>
  <Text style={styles.squareText}>Small</Text>
</View>
</TouchableOpacity>

<TouchableOpacity
style={styles.smallSquareColors}
onPress={() => handlePress("Medium", selectedSize, setSelectedSize)}
>
<MaterialIcons
  name={selectedSize==="Medium" ? 'radio-button-checked' : 'radio-button-unchecked'}
  size={18}
  color="#657EFF"
  style={styles.radioButton}
/>
<View style={styles.squareContent}>
  <Text style={styles.squareText}>Medium</Text>
</View>
</TouchableOpacity>

<TouchableOpacity
style={styles.smallSquareColors}
onPress={() => handlePress("Large", selectedSize, setSelectedSize)}
>
<MaterialIcons
  name={selectedSize==="Large" ? 'radio-button-checked' : 'radio-button-unchecked'}
  size={18}
  color="#657EFF"
  style={styles.radioButton}
/>
<View style={styles.squareContent}>
  <Text style={styles.squareText}>Large</Text>
</View>
</TouchableOpacity>

</View>


     
<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>What's my preferred pet activity level? *</Text>
</View>

<View style={styles.buttons}>

<TouchableOpacity
style={styles.smallSquareColors}
onPress={() => handlePress("Low", selectedAct, setSelectedAct)}
>
<MaterialIcons
  name={selectedAct==="Low"? 'radio-button-checked' : 'radio-button-unchecked'}
  size={18}
  color="#657EFF"
  style={styles.radioButton}
/>
<View style={styles.squareContent}>
  <Text style={styles.squareText}>Low</Text>
</View>
</TouchableOpacity>

<TouchableOpacity
style={styles.smallSquareColors}
onPress={() => handlePress("Medium", selectedAct, setSelectedAct)}
>
<MaterialIcons
  name={selectedAct==="Medium" ? 'radio-button-checked' : 'radio-button-unchecked'}
  size={18}
  color="#657EFF"
  style={styles.radioButton}
/>
<View style={styles.squareContent}>
  <Text style={styles.squareText}>Medium</Text>
</View>
</TouchableOpacity>

<TouchableOpacity
style={styles.smallSquareColors}
onPress={() => handlePress("High", selectedAct, setSelectedAct)}
>
<MaterialIcons
  name={selectedAct==="High" ? 'radio-button-checked' : 'radio-button-unchecked'}
  size={18}
  color="#657EFF"
  style={styles.radioButton}
/>
<View style={styles.squareContent}>
  <Text style={styles.squareText}>High</Text>
</View>
</TouchableOpacity>

</View>




</View>


      </ScrollView>

      <TouchableOpacity onPress={handleNext}>

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
    backgroundColor: '#657EFF', // Adjust the color of the lines
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





squareText: {
  alignItems: 'center',
  color: '#0D0D0D',
  fontSize: 14,
  fontWeight: '400',
},
radioButton: {
  marginLeft: 13,
},

padExtra:{
  marginBottom:4
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

squareContentxd: {
  flex: 1,
  justifyContent: 'center',
},


wrapFck:{
paddingLeft: 15,
paddingRight: 15,
paddingBottom: 34,

},


});
