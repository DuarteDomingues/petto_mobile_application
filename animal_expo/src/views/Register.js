import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView,TouchableOpacity, Platform, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import AuthenticationService from '../services/AuthenticationService';
import CustomAlert from '../components/CustomAlert';


export default function Register() {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

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

  const imageSource = require('../../assets/imgs/logo.png');

  const authService = new AuthenticationService();

  async function registerUser() {
    try {
      let userCred = await authService.doRegister(email.trim(), password);
      await authService.createUser(email.trim(), userCred.uid);
      navigation.navigate('HomePage')

    } catch (error) {
      console.log("error: ", error)
      setAlertMsg("Error creating user.");
      setAlertTitle("Invalid user");
      handleShowAlert();
      return;
    }
  }

  const handleRegister = () => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the email is empty or doesn't match the pattern
    if (!email.trim() || !emailPattern.test(email.trim())) {

      setAlertMsg("Please enter a valid email address.")
      setAlertTitle("Invalid Email")
      handleShowAlert();
      return;
    }
    // password validation
    if (!password || password.length < 6|| /^\s*$/.test(password)) {
      setAlertMsg("Password must have at least 6 characters.");
      setAlertTitle("Invalid Password");
      handleShowAlert();
      return;
    }
    // confirm password validation
    if(password != password2){
      setAlertMsg("Passwords must match.");
      setAlertTitle("Invalid Password");
      handleShowAlert();
      return;
    }

    registerUser();

  };

    return (
    

    <SafeAreaView  style={styles.container}>
      <View style={styles.xd}>

<Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />
</View>

<TouchableOpacity style={styles.topV} onPress={goBack}>

<View  style={styles.profileImage3}>
<AntDesign name="arrowleft" size={20} color="#1D082B" style={styles.chatIcon} />
</View>
</TouchableOpacity>

<ScrollView>
<View style={styles.wrapperView}>


<View style={styles.pageHeaderV2}>

        <Text style={styles.pageHeader2}>Sign-up</Text>
</View>


<View style={styles.pageHeaderV}>

        <Text style={styles.pageHeader}>Email</Text>
</View>

<View style={styles.smallSquareColors}>
      <View style={styles.squareContent}>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor="#7B6F82" // Customize placeholder text color

          value={email}
          onChangeText={setEmail}
        />
      </View>
    </View>

    <View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>Password</Text>
</View>

<View style={styles.smallSquareColors}>
<View style={styles.squareContent}>
<TextInput
  style={styles.input}
  placeholder="Your password"
  placeholderTextColor="#7B6F82" // Customize placeholder text color
  secureTextEntry={true} // Set secureTextEntry to true

  value={password}
  onChangeText={setPassword}
/>
</View>
</View>

<View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>Confirm Password</Text>
</View>

<View style={styles.smallSquareColors}>
<View style={styles.squareContent}>
<TextInput
  style={styles.input}
  placeholder="Your password"
  placeholderTextColor="#7B6F82" // Customize placeholder text color
  secureTextEntry={true} // Set secureTextEntry to true

  value={password2}
  onChangeText={setPassword2}
/>
</View>
</View>

<TouchableOpacity onPress={handleRegister}>

<View style={styles.wrapFck}>
<View style={{...styles.squareContinue,  backgroundColor: '#657EFF'}}>
<View style={{...styles.squareContent}}>
<Text style={{...styles.squareTextContinue, color: 'white'}}>Register</Text>
</View>
</View>
</View>
</TouchableOpacity>

</View>

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

  customAlert: {
    backgroundColor: 'blue', // Background color
    borderRadius: 10, // Border radius
    borderWidth: 2, // Border width
    borderColor: '#657EFF', // Border color
  },

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

      image: {
        width: '100%',
        height: 252,
        transform: [{ scale: 0.68 }],
      },


    pageHeaderV:{
      flexDirection: 'row',
      alignItems: 'center',
    },

    topV: {
      position: 'absolute',
      top: 40,
      marginLeft: 14,
    },
    xd: {
      backgroundColor: '#657EFF'
    },

    profileImage3: {
      width: 28, // Set the desired width
      height: 28, // Set the desired height
      borderRadius: 8, // Half of the width and height for a circular shape
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // Center vertically

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
  
    pageHeader: {
      flex: 1, // Takes up all available space
      fontSize: 18,   
      padding: 4,          
      fontWeight: '500',
     // color: '#292b2c'
      color: '#181818'
    },

    pageHeader2: {
      flex: 1, // Takes up all available space
      fontSize: 22,   
      paddingLeft:4,
      paddingTop: 10,
      paddingBottom:12,
      fontWeight: '600',
     // color: '#292b2c'
      color: '#0D0D0D'
    },

    pageHeaderxd: {
      flex: 1, // Takes up all available space
      fontSize: 16,   
      paddingRight: 4, 
      paddingLeft: 8, 
      paddingTop: 18, 
      fontWeight: '400',
     // color: '#292b2c'
      color: '#7B6F82'
    },

    smallSquareColors: {
      width: "97%",
      height: 36,
      borderRadius: 8,
    //  opacity: 0.85
    borderColor: '#C3CDFF',
    borderWidth: 1, 
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 12,
    marginLeft: 6
  },
  squareContent: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {

    alignItems: 'center',
    color: 'black',
    fontSize: 16,
    paddingLeft: 12, 
    fontWeight: '400',

  },  

  squareContinue: {
    width: "97%",
    height: 40,
    borderColor: 'black',
    borderRadius: 8,
  //  opacity: 0.85

backgroundColor: '#ffffff',
    marginLeft: 6,
    marginTop: 12,

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

squareTextContinue: {
    alignItems: 'center',
    fontSize: 19,
    textAlign: 'center',
    fontWeight: '500'
  },  

  underline:{
    color:'#657EFF',
    textDecorationLine: 'underline', // Apply underline to this text
  }

})