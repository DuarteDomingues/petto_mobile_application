import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, Platform, TextInput, Image} from 'react-native';
import AnimalHeader from '../components/AnimalHeader';
import { AntDesign } from '@expo/vector-icons';
import DropdownComponent from '../components/DropdownComponent';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import UserManagementService from '../services/UserManagementService';


export default function Filter() {
   
  const isFocused = useIsFocused();
  const userManagementService = new UserManagementService();


  const [userProfileImage, setUserProfileImage] = useState(require('../../assets/person.png'));


  const navigation = useNavigation();
  const [text, setText] = useState('');
  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };


  let imageSource = null;
  
  let imgCat =  require('../../assets/icon_user.png')

  imageSource =  imgCat 

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
  


      
    const [selected, setSelected] = useState(null);

    const [labelBreed, setLabelBreed] = useState(null);
    const [labelColor, setLabelColor] = useState(null);

    const [selectGender, setSelectGender] = useState(null);
    const [selectAct, setSelectAct] = useState(null);
    const [selectSpecial, setSelectSpecial] = useState(null);
    const [selectSpay, setSelectSpay] = useState(null);

    const [selectAge, setSelectAge] = useState(null);
    const [selectSize, setSelectSize] = useState(null);


    const handlePress2 = (numb ) => {

      if(selected!=numb){
        setSelected(numb);
      }
      else{
        setSelected(null);
      }
    };





    const handlePress = (numb, selectType,setSelectType ) => {

      if(selectType!=numb){
        setSelectType(numb);
      }
      else{
        setSelectType(null);
      }
    };






    function handleNext(){

      /*
      console.log("slec", selected)
      console.log("breed", labelBreed)
      console.log("color", labelColor)


      console.log("gender", selectGender)
      console.log("actlevl", selectAct)
      console.log("specialNeeds", selectSpecial)
      console.log("spayed", selectSpay)
      console.log("home", selectHome)

      console.log("age", selectAge)
      console.log("size", selectSize)
      */

      let filters = {};

        filters.species = selected;
      
    
        filters.breed = labelBreed;
      
    
        filters.color = labelColor;
      
    
        filters.gender = selectGender;
      
    
        filters.specialNeeds = selectSpecial;
      
    
        filters.spayed = selectSpay;
      
      
        filters.age = null;   //change
      
        filters.size = selectSize;    //change

        
    navigation.navigate('SearchPage', {
        filters
      
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
      <Text style={styles.titleTop}>Filter</Text>
      <Image source={userProfileImage} style={styles.userImage} />

    </View>

        


<View style={{...styles.pageHeaderV, paddingTop: 16}}>

        <Text style={styles.pageHeader}>Species</Text>

</View>

<View style={styles.padHeadV}>
<AnimalHeader selected={selected} setSelected={setSelected} handlePress={handlePress2} />
</View>




<View style={styles.pageHeaderV}>

        <Text style={styles.pageHeader}>Breed</Text>
</View>

<DropdownComponent data={data} label={labelBreed} setLabel={setLabelBreed}></DropdownComponent>



<View style={styles.pageHeaderV}>

        <Text style={styles.pageHeader}>Color</Text>
</View>

<DropdownComponent data={dataColor} label={labelColor} setLabel={setLabelColor}></DropdownComponent>



<View style={styles.pageHeaderV}>

        <Text style={styles.pageHeader}>Age</Text>
</View>

<View style={styles.squareContainer2}>

<TouchableOpacity style={styles.buttonstuff}  onPress={() => handlePress("Young", selectAge, setSelectAge)}>

      <View style={{...styles.smallSquareAge2, backgroundColor: selectAge==="Young" ? '#657EFF' : 'white'}}>
      <View style={{...styles.squareContent2}}>
          <Text style={{...styles.squareText2, color: selectAge ==="Young" ? 'white' : '#657EFF'}}>Young</Text>
        </View>
      </View>
      </TouchableOpacity>


      <TouchableOpacity style={styles.buttonstuff}  onPress={() => handlePress("Adult", selectAge, setSelectAge)}>

      <View style={{...styles.smallSquareAge2,backgroundColor: selectAge==="Adult" ? '#657EFF' : 'white'}}>
        <View style={{...styles.squareContent2}}>
        <Text style={{...styles.squareText2, color: selectAge ==="Adult" ? 'white' : '#657EFF'}}>Adult</Text>
        </View>
        </View>

        </TouchableOpacity>


        <TouchableOpacity style={styles.buttonstuff}  onPress={() => handlePress("Senior", selectAge, setSelectAge)}>
        <View style={{...styles.smallSquareAge2 , backgroundColor: selectAge==="Senior" ? '#657EFF' : 'white'}}>
      <View style={{...styles.squareContent2}}>
          <Text style={{...styles.squareText2, color: selectAge ==="Senior" ? 'white' : '#657EFF'}}>Senior</Text>
        </View>
      </View>

      </TouchableOpacity>


        </View>


        <View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>Size</Text>
</View>

<View style={styles.squareContainer2}>

<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Small", selectSize, setSelectSize)}>
<View style={{...styles.smallSquareAge2 , backgroundColor: selectSize==="Small" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
  <Text style={{...styles.squareText2,  color: selectSize ==="Small" ? 'white' : '#657EFF'}}>Small</Text>
</View>
</View>
</TouchableOpacity>


<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Medium", selectSize, setSelectSize)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectSize==="Medium" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2,  color: selectSize ==="Medium" ? 'white' : '#657EFF'}}>Medium</Text>
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

<Text style={styles.pageHeader}>Gender</Text>
</View>

<View style={styles.squareContainer2}>

<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Male", selectGender, setSelectGender)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectGender==="Male" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectGender ==="Male" ? 'white' : '#657EFF'}}>Male</Text></View>
</View>
</TouchableOpacity>


<TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Female", selectGender, setSelectGender)}>

<View style={{...styles.smallSquareAge2,  backgroundColor: selectGender==="Female" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectGender ==="Female" ? 'white' : '#657EFF'}}>Female</Text>
</View>
</View>




</TouchableOpacity>



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

<Text style={styles.pageHeader}>Pet with special needs</Text>
</View>

<View style={styles.squareContainer2}>

<TouchableOpacity  style={styles.buttonstuff} onPress={() => handlePress("Yes", selectSpecial, setSelectSpecial)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectSpecial==="Yes" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
  <Text style={{...styles.squareText2, color: selectSpecial ==="Yes" ? 'white' : '#657EFF'}}>Yes</Text>
</View>
</View>
</TouchableOpacity>


<TouchableOpacity  style={styles.buttonstuff} onPress={() => handlePress("No", selectSpecial, setSelectSpecial)}>

<View style={{...styles.smallSquareAge2, backgroundColor: selectSpecial==="No" ? '#657EFF' : 'white'}}>
<View style={{...styles.squareContent2}}>
<Text style={{...styles.squareText2, color: selectSpecial ==="No" ? 'white' : '#657EFF'}}>No</Text>
</View>
</View>

</TouchableOpacity>



</View>





<TouchableOpacity onPress={handleNext}>

<View style={styles.wrapFck}>
<View style={{...styles.squareContinue}}>
<View style={{...styles.squareContent}}>
<Text style={{...styles.squareTextContinue}}>Continue</Text>
</View>
</View>
</View>
</TouchableOpacity>


</View>






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
 
      wrapperView:{
        width:'100%',
        padding: 10,
      },

      buttonstuff: {
        flex: 1,
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
        marginLeft: 9.5

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
    
      smallSquareCogtrflors: {
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

    padHeadV:{
      marginBottom:4
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

      squareContent2: {
        flex: 1,
        justifyContent: 'center',
      },



      squareContainer2: {
        flexDirection: 'row',
        width: "100%",
        marginTop: 8,
        marginBottom: 12,
        marginStart: 6,
        border: 'None',

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
        marginBottom: 1

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
    
    squareContinue: {
        width: "100%",
        height: 34,
        borderColor: 'black',
        borderRadius: 10,
      //  opacity: 0.85
   
      marginRight: 17, 
      backgroundColor: '#657EFF',
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
        fontWeight: '500',
        color: 'white'
      },  

      squareContent: {
        flex: 1,
        justifyContent: 'center',
      },

      wrapFck:{
        paddingTop: 8,
        paddingBottom:10,
        paddingLeft:7,
        paddingRight:8,

      },

      userImage: {
        width: 38,
        height: 38,
        borderRadius: 20,
        marginRight: 2.5
      },

})