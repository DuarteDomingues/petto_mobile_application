import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Platform, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ImageViewer from '../components/ImageViewer';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import * as ImagePicker from 'expo-image-picker';
import UserManagementService from '../services/UserManagementService';
import UseImage from '../services/UseImage';
import { auth } from '../services/FirebaseModule'; // Adjust the path as needed
import MapView, { Marker } from 'react-native-maps';
import {  GeoPoint } from "firebase/firestore";



export default function EditProfile() {

  const userService = new UserManagementService();

  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [textAddress, setTextAddress] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [inputMessage, setInputMessage] = useState('');


  //CUSTOM ALERT
  const [alertMsg, setAlertMsg] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [imgUpd, setImgUpd] = useState(null);


  const [userProfileImage, setUserProfileImage] = useState(require('../../assets/person.png'));


  let imageSource = null;
  
  let imgCat =  require('../../assets/person.png')

  imageSource =  imgCat 
   


  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };


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


  const [selectType, setSelectType] = useState(null);
  const userId = auth.currentUser.uid;
  const [user, setUser] = useState(null);


  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageSend, setSelectedImageSend] = useState(null);



  useEffect(() => {

    fetchAndHandleUser = async (id) => {

      if (user == null) {

        try {

          let userReq = await userService.fetchUserById(id);
          setUser(userReq);
          console.log(userReq)
          setSelectedImage(userReq.profileImage);
          let quests = await userService.getUserPref()
      setUserProfileImage({ uri: quests[1]})
        }

        catch (error) {

          console.error('Error fetching user:', error);
        }
      }
    }
    fetchAndHandleUser(userId);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets) {

      let imgUri = result.assets[0].uri;
      setSelectedImageSend(imgUri)

    }
  }

  const handlePress = (numb) => {

    if (selectType != numb) {
      setSelectType(numb);
    }
    else {
      setSelectType(null);
    }
  };

  // handle next button, validate input
  async function handleNext() {

    let userDic = {}

    if (null !== selectedImageSend) {

      console.log("hereee")

      let fileName = selectedImageSend.split("/").pop();

      let  uploadResp = await userService.uploadToFirebase(selectedImageSend, fileName);

      //await saveImageBucket();

      //let fileName = selectedImageSend.split("/").pop();
      //let fileNameImg = "images/"+fileName;

      console.log("imguod", uploadResp)

      userDic['profileImage'] =uploadResp;
    }

    if (!isEmptyString(text)) {
      userDic['name'] = text

    }
    if (!isEmptyString(textAddress)) {
      userDic['location'] = textAddress
    }

    if (!isEmptyString(phoneNum)) {
      userDic['phone'] = phoneNum
    }

    if (!isEmptyString(inputMessage)) {
      userDic['description'] = inputMessage
    }

    console.log("Select type: ", selectType)

    if (!isEmptyString(selectType)) {
      userDic['adopter'] = selectType
    }

    console.log("loca", selectedLocation)

    if(null!= selectedLocation){
      userDic['userGeoLocation'] = new GeoPoint(selectedLocation["latitude"], selectedLocation["longitude"])
    }

    if(Object.keys(userDic).length !== 0){
    callUpdate(userDic)
    }

    navigation.goBack();

  }

  async function callUpdate(userUpd) {

    await userService.updateUser(userUpd)
  }


  function isEmptyString(str) {
    if ((str !== undefined) && (str !== null) && (str !== "")) {
      return false;
    }
    else {
      return true;
    }
  }

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.wrapperView}>

          <View style={styles.containerTop}>
            <TouchableOpacity onPress={goBack}>

              <View style={styles.profileImage2}>
                <AntDesign name="arrowleft" size={20} color="#1D082B" style={styles.chatIcon} />
              </View>

            </TouchableOpacity>

            <Text style={styles.titleTop}>Edit profile</Text>
            <Image source={userProfileImage} style={styles.userImage} />

          </View>

          <View style={{ ...styles.pageHeaderVcentered, paddingTop: 12 }}>

          </View>

          <TouchableOpacity onPress={pickImage} style={styles.centerImg}>

            <ImageViewer placeholderImageSource={selectedImage} selectedImage={selectedImageSend} />
          </TouchableOpacity>

          <View style={styles.pageHeaderV}>

            <Text style={styles.pageHeader}>Name</Text>
          </View>


          {user ? (

            <View style={styles.smallSquareColors}>
              <View style={styles.squareContent}>
                <TextInput style={styles.squareText}

                  placeholder={user.name}
                  placeholderTextColor="#7B6F82" // Customize placeholder text color

                  value={text}
                  onChangeText={setText}

                />
              </View>

            </View>
          ) : (
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

          )

          }

          <View style={styles.pageHeaderV}>

            <Text style={styles.pageHeader}>Address</Text>
          </View>


          {user ? (
            <View style={styles.smallSquareColors}>
              <View style={styles.squareContent}>
                <TextInput style={styles.squareText}
                  placeholder={user.location}
                  placeholderTextColor="#7B6F82" // Customize placeholder text color
                  value={textAddress}
                  onChangeText={setTextAddress}
                />
              </View>

            </View>

          ) : (

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

          )
          }

          <View style={styles.pageHeaderV}>

            <Text style={styles.pageHeader}>Phone number</Text>
          </View>


          {user ? (

            <View style={styles.smallSquareColors}>
              <View style={styles.squareContent}>
                <TextInput style={styles.squareText}
                  placeholder={user.phone}
                  placeholderTextColor="#7B6F82" // Customize placeholder text color
                  value={phoneNum}
                  onChangeText={(text) => {
                    // Replace non-numeric characters with empty string
                    const numericText = text.replace(/[^0-9]/g, '');
                    setPhoneNum(numericText);
                  }}


                  keyboardType='numeric'
                />
              </View>
            </View>


          ) : (
            <View style={styles.smallSquareColors}>
              <View style={styles.squareContent}>
                <TextInput style={styles.squareText}
                  placeholder="Your phone number"
                  placeholderTextColor="#7B6F82" // Customize placeholder text color
                  value={phoneNum}
                  onChangeText={(text) => {
                    // Replace non-numeric characters with empty string
                    const numericText = text.replace(/[^0-9]/g, '');
                    setPhoneNum(numericText);
                  }}


                  keyboardType='numeric'
                />
              </View>
            </View>

          )

          }

          <View style={styles.pageHeaderV}>

            <Text style={styles.pageHeader}>About</Text>
          </View>

          {user ? (

            <View style={styles.textInpxd}>
              <TextInput
                style={styles.input}
                placeholder={user.description}
                placeholderTextColor="#888"
                onChangeText={setInputMessage}
                value={inputMessage}
                multiline
              />
            </View>


          ) : (
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


          )

          }

          <View style={styles.pageHeaderV}>

            <Text style={styles.pageHeader}>User type</Text>
          </View>

          <View style={styles.squareContainer2}>



            <TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Adoption Center", selectType, setSelectType("Adoption Center"))}>

              <View style={{ ...styles.smallSquareAge2, backgroundColor: selectType === "Adoption Center" ? '#657EFF' : 'white' }}>
                <Text style={{ ...styles.squareText2, color: selectType === "Adoption Center" ? 'white' : '#657EFF' }}>Adoption Center</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonstuff} onPress={() => handlePress("Owner", selectType, setSelectType("Owner"))}>

              <View style={{ ...styles.smallSquareAge3, backgroundColor: selectType === "Owner" ? '#657EFF' : 'white' }}>
                <Text style={{ ...styles.squareText2, color: selectType === "Owner" ? 'white' : '#657EFF' }}>Owner</Text>
              </View>
            </TouchableOpacity>

          </View>


          <View style={styles.pageHeaderV}>

<Text style={styles.pageHeader}>Location</Text>
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

  <View  style={styles.fillView}>


  </View>



        </View>


        <CustomAlert
          visible={showAlert}
          onClose={handleCloseAlert}
          title={alertTitle}
          message={alertMsg}
        />



      <TouchableOpacity onPress={handleNext}>

        <View style={styles.wrapFck}>
          <View style={{ ...styles.squareContinue, backgroundColor: '#657EFF' }}>
            <View style={{ ...styles.squareContent }}>
              <Text style={{ ...styles.squareTextContinue, color: 'white' }}>Continue</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

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
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    justifyContent: 'space-between',

  },
  titleTop: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D0D0D',
    flex: 1,
    marginLeft: 5.5,
    textAlign: 'center',

  },





  centerImg: {
    marginTop: 8,
    alignItems: 'center',
    marginBottom: 8
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


  buttonstuff: {
    flex: 1,
  },


  wrapperView: {
    width: '100%',
    padding: 10,
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

  pageHeaderV: {
    flexDirection: 'row',
  },

  pageHeaderVcentered: {
    textAlign: 'center',
    alignItems: 'center'

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
    marginTop: 8,
    marginBottom: 12,
    marginStart: 6,
    border: 'None',

  },


  padHeadV: {
    marginBottom: 4
  },


  smallSquareAge2: {
    height: 26,
    borderColor: '#C3CDFF',
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 12,
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
  },

  smallSquareAge3: {
    height: 26,
    borderColor: '#C3CDFF',
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 6,
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
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

  wrapFck: {
    paddingLeft: 16,
    paddingRight: 15,
    paddingBottom: 24,


  },

  fillView: {

    paddingBottom: 14
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


})