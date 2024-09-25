import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, TextInput, Platform, Button, Image} from 'react-native';
import Line6 from '../components/Line6'; 
import AnimalHeader from '../components/AnimalHeader';
import { AntDesign } from '@expo/vector-icons';
import DropdownComponent from '../components/DropdownComponent';
import { useNavigation,useRoute,useIsFocused } from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer2 from '../components/ImageViewer2';
import DateTimePicker from '@react-native-community/datetimepicker';
import UserManagementService from '../services/UserManagementService';


export default function Add() {

  const isFocused = useIsFocused();
  const userManagementService = new UserManagementService();

  const [date, setDate] = useState(new Date(1698051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

 
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [textAddress, setTextAddress] = useState('');

  const [inputMessage, setInputMessage] = useState('');

  const [selectGender, setSelectGender] = useState(null);


  let imageSource = null;
  
  let imgCat =  require('../../assets/icon_user.png')

  const [userProfileImage, setUserProfileImage] = useState(require('../../assets/person.png'));



  imageSource =  imgCat 
   

  //CUSTOM ALERT
  const[alertMsg, setAlertMsg] = useState('');
  const[alertTitle, setAlertTitle] = useState('');

  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  
  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

    const [search, setSearch] = useState("");

   // const [open, setOpen] = useState(false)

   //const [valueBreed, setValueBreed] = useState(null);
   //const [valueColor, setValueColor] = useState(null);

   const [selectedImage, setSelectedImage] = useState(null);
   const [selectedImage2, setSelectedImage2] = useState(null);
   const [selectedImage3, setSelectedImage3] = useState(null);
   const [selectedImage4, setSelectedImage4] = useState(null);



   const pickImage = async (setSelectedImg) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled && result.assets) {

      let imgUri = result.assets[0].uri;


      setSelectedImg(imgUri)


    }
  }

    

    const [selected, setSelected] = useState(null);
    
    const handlePress = (numb) => {

      if(selected!=numb){
      setSelected(numb);
      }
      else{
        setSelected(null);
      }
    };

    
    const handlePress2 = (numb, selectType,setSelectType ) => {

      if(selectType!=numb){
        setSelectType(numb);
      }
      else{
        setSelectType(null);
      }
    };


    // handle next button, validate input
    function handleNext(){
      //adicionar as imagens ao animal

      //console.log("DATEBU", date)
      let dateStr = date.toLocaleString()

      let comma = dateStr.indexOf(',');
      dateStr = dateStr.substring(0, comma);
      
      if(selected===null){
  
        setAlertMsg("Select pet type.");
        setAlertTitle("Pet type undefined");
        handleShowAlert();
        return;
      }

      if(text===null || /^\s*$/.test(text)){
  
        setAlertMsg("Select pet name.");
        setAlertTitle("Pet name undefined");
        handleShowAlert();
        return;
      }



      if(inputMessage===null || /^\s*$/.test(inputMessage)){
  
        setAlertMsg("Select pet description.");
        setAlertTitle("Pet description undefined");
        handleShowAlert();
        return;
      }

      
    if(selectGender===null){
  
      setAlertMsg("Select pet gender.");
      setAlertTitle("Pet Gender undefined");
      handleShowAlert();
      return;
    }

    if(date.toLocaleString() === "10/23/2023, 10:02:10 AM" ){
      setAlertMsg("Select pet birth date.");
      setAlertTitle("Pet birth date undefined");
      handleShowAlert();
      return;
    }





    //  navigation.navigate('QuestionnaireSec', {
    //    selected,
    //    textAddress,
    //    value,
    //  });

    selectedImgs = []
    selectedImgsShort = []

    if(selectedImage!==null ){
      selectedImgs.push(selectedImage)

      let fileName = selectedImage.split("/").pop();
      let fileNameImg = "images/"+fileName;
      selectedImgsShort.push(fileNameImg)
    }
    if(selectedImage2!==null ){
      selectedImgs.push(selectedImage2)

      let fileName = selectedImage2.split("/").pop();
      let fileNameImg = "images/"+fileName;
      selectedImgsShort.push(fileNameImg)

    }
    if(selectedImage3!==null ){
      selectedImgs.push(selectedImage3)

      let fileName = selectedImage3.split("/").pop();
      let fileNameImg = "images/"+fileName;
      selectedImgsShort.push(fileNameImg)

    }
    if(selectedImage4!==null ){
      selectedImgs.push(selectedImage4)

      let fileName = selectedImage4.split("/").pop();
      let fileNameImg = "images/"+fileName;
      selectedImgsShort.push(fileNameImg)

    }



    navigation.navigate('AddSec', {
      selected,
      text,
      textAddress,

      selectedImgs,
      inputMessage,
      selectGender,
      selectedImgsShort,
      dateStr
    });

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
      <Text style={styles.titleTop}>Add Pet</Text>
      <Image source={userProfileImage} style={styles.userImage} />

    </View>





<View style={{...styles.pageHeaderV, paddingTop: 16}}>

        <Text style={styles.pageHeader}>Images</Text>

</View>


       
<View style={styles.imageRow}>

<View style={styles.shadowView} >
        <TouchableOpacity onPress={() => pickImage(setSelectedImage)} style={styles.centerImg}>
          <ImageViewer2
            selectedImage={selectedImage}
          />
        </TouchableOpacity>
        </View>

        <View style={styles.shadowView} >

        <TouchableOpacity onPress={() => pickImage(setSelectedImage2)} style={styles.centerImg}>
          <ImageViewer2
            selectedImage={selectedImage2}
          />
        </TouchableOpacity>
</View>

<View style={styles.shadowView} >

        <TouchableOpacity onPress={() => pickImage(setSelectedImage3)} style={styles.centerImg}>
          <ImageViewer2
            selectedImage={selectedImage3}
          />
        </TouchableOpacity>
</View>

<View style={styles.shadowView} >

        <TouchableOpacity onPress={() => pickImage(setSelectedImage4)} style={styles.centerImg}>
          <ImageViewer2
            selectedImage={selectedImage4}
          />
        </TouchableOpacity>
</View>
 

  </View>







<Line6></Line6>



        
<View style={{...styles.pageHeaderV}}>

        <Text style={styles.pageHeader}>Species</Text>

</View>

<View style={styles.padHeadV}>
<AnimalHeader selected={selected} setSelected={setSelected} handlePress={handlePress} />
</View>



<View style={styles.pageHeaderV}>

        <Text style={styles.pageHeader}>Name</Text>
</View>

<View style={styles.smallSquareColors}>
<View style={styles.squareContent}>
        <TextInput style={styles.squareText}
         placeholder="Your name"
         placeholderTextColor="#7B6F82" // Customize placeholder text color

         value={text}
         onChangeText={setText}

        />
        </View>

</View>





<View style={styles.pageHeaderV}>

        <Text style={styles.pageHeader}>Address</Text>
</View>

<View style={styles.smallSquareColors}>
<View style={styles.squareContent}>
        <TextInput style={styles.squareText}
         placeholder="Your Address"
         placeholderTextColor="#7B6F82" // Customize placeholder text color
         value={textAddress}
         onChangeText={setTextAddress}
        />
        </View>

</View>


<View style={styles.pageHeaderV}>

        <Text style={styles.pageHeader}>About</Text>
</View>

<View style={styles.textInpxd}>
          <TextInput
  style={styles.input}
  placeholder="Add your description"
  placeholderTextColor="#888"
  onChangeText={setInputMessage}
  value={inputMessage}
  multiline
/>
</View>



<View style={styles.pageHeaderV}>

<Text style={{...styles.pageHeader}}>Gender</Text>
</View>

<View style={styles.squareContainer3}>

<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress2("Male", selectGender, setSelectGender)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectGender==="Male" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectGender ==="Male" ? 'white' : '#657EFF'}}>Male</Text></View>
</View>
</TouchableOpacity>


<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress2("Female", selectGender, setSelectGender)}>

<View style={{...styles.smallSquareAge2,  backgroundColor: selectGender==="Female" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectGender ==="Female" ? 'white' : '#657EFF'}}>Female</Text>
</View>
</View>




</TouchableOpacity>




</View>



<View style={styles.pageHeaderV}>

<Text style={{...styles.pageHeader}}>Age</Text>
</View>


<TouchableOpacity onPress={showDatepicker} style={styles.smallSquareColors}>
  <View style={{...styles.squareContent3}}>
  <AntDesign
              style={styles.icon}
              color="#657EFF"
              name="calendar"
              size={17}
            />
<Text style={{...styles.squareText2, color: '#657EFF'}}>Date of Birth</Text>
</View>

</TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          onChange={onChange}

        />
      )}





</View>





<TouchableOpacity onPress={ handleNext}>

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



</ScrollView>



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

      imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 8,
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

      squareContainer3: {
        flexDirection: 'row',
        width: "100%",
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

    squareContent: {
      flex: 1,
      justifyContent: 'center',
    },
    squareTextContinue: {
        alignItems: 'center',
        fontSize: 18,
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
      },

      userImage: {
        width: 38,
        height: 38,
        borderRadius: 20,
        marginRight: 2.5
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

      squareContent3: {
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop:5
      },



      dateTimePicker: {
        width: 320,
        height: 260,
        backgroundColor: 'red',
      },
         icon: {
      marginRight: 6,
    },
})