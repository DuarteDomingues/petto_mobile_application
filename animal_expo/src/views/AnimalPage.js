import React, { useState, useEffect } from 'react';
import {
  View, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions, Text, FlatList, TouchableOpacity, Platform
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import PetManagementService from '../services/PetManagementService';
import CustomAlert from '../components/CustomAlert';
import CustomAlertReq from '../components/CustomAlertReq';
import CustomAlert2 from '../components/CustomAlertReq2';
import CardProductsHor3 from '../components/CardProductHor3';
import UserManagementService from '../services/UserManagementService';
import { auth } from '../services/FirebaseModule'; // Adjust the path as needed



const AnimalPage = () => {

  function categorizeAge(dateStr) {

    const datePattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    
    if (!datePattern.test(dateStr)) {
      return dateStr;
  }
  
    let today = new Date();
    let [month, day, year] = dateStr.split('/').map(Number);
      
    let birthDate = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date
  
    const diffInMs = today - birthDate;
    let diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
  
    // Categorize based on the number of days
    if (diffInDays < 365) {
        return "Baby";
    } else if (diffInDays >= 365 && diffInDays < 1080) {
        return "Young";
    } else if (diffInDays >= 1080 && diffInDays < 2520) {
        return "Adult";
    } else {
        return "Senior";
    }
  }


  async function toServerAttributesReq(data) {
    try {
      const response = await fetch('https://myflaskapp-cccrohvifa-uw.a.run.app/text_recommendations', {

    //  const response = await fetch('http://10.0.2.2:5000/text_recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      return response.json();
    } catch (error) { 
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  const dataEx = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Pet',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Pet',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Pet',
    },
  ];

  function goToAnimal(animalId){

    navigation.push('AnimalPage', {animalId});
  }




  function convertPetToJson(petInfo){

    let petJson = {
      Species: petInfo.species.toUpperCase(),
      Age: petInfo.age.toUpperCase(),
      Gender: petInfo.gender.toUpperCase(),
      Breed: petInfo.breed.toUpperCase(),
      Color: petInfo.color.toUpperCase(),
      Size: petInfo.size.toUpperCase(),
      Health: getHealthy(petInfo.spNeeds),
      Sterilized: petInfo.isSpayed.toUpperCase()     
     };

    return JSON.stringify(petJson);    
  }

  function getHealthy(val){
    if(val==="Yes"){
      return "HEALTHY"
    }
    else{
      return "INJURED"
    }
  }



  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();
  let { animalId} = route.params ?? {};


  const[animalQuestRec, setAnimalQuestRec] = useState([])

  const [pin, setPin] = useState(null);

  const [chatExist, setChatExist] = useState(false);
  const [chatExistId, setChatExistId] = useState(false);


  let userId = auth.currentUser.uid;

  const petManagService = new PetManagementService();
  const userManagementService = new UserManagementService();

  const [imageUrl, setImageUrl] = useState(null);
  const [pet, setPet] = useState(null);
  const [fav, setFav] = useState(false);
  const [user, setUser] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [imagesPetsFirestore, setImagesStore] = useState([])


  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  let alertMsgTitle = "Send adoption request"
  let alertMsgReq = "Explain why you would like to adopt this pet."

  const [showAlertReq, setShowAlertReq] = useState(false);

  const handleShowAlertReq = () => {
    setShowAlertReq(true);
  };

  const handleCloseAlertReq = () => {

    handleAddChat(user['id'], inputMessage)
    setShowAlertReq(false);

  };


  const handleCloseNo = () => {

    setShowAlertReq(false);

  };

  function handleSendAlertReq() {

    handleShowAlertReq();
  }


  async function handleAddChat(userId, textInp){

     let chatId = await userManagementService.addChat(userId, textInp, animalId, chatExistId)
      
      let userIdOtherUser = userId
      let userName = user['name']
      let profileImage = imageUrl

      navigation.navigate('ChatPage', {
        userIdOtherUser,
        userName,
        chatId,
        profileImage
      });
      
  }

  const[alertMsgTitleFav, setAlertMsgTitleFav] = useState("Add to favourites");
  const[alertMsgFav, setMsgFav] = useState("Add this pet to favourites.")

  const [showAlertFav, setShowAlertFav] = useState(false);
  const [showFav, setShowFav] = useState(false);

  const[favId, setFavId] = useState(null);


  const handleShowAlertFav = () => {
    setShowAlertFav(true);
  };

  const handleCloseAlertFav = () => {

    setShowAlertFav(false);

    if(showFav==false || showFav==null){
    setAlertMsgTitleFav("Remove from Favourites");
    setMsgFav("Remove this pet from favourites.");

    handleAddFav();

    }
    else{
      setAlertMsgTitleFav("Add to favourites");
      setMsgFav("Add this pet to favourites.");


      setFavId(null);
      handleDeleteFav();
    }

    setShowFav(prevState => !prevState);

  };

  const handleCloseNoFav = () => {

    setShowAlertFav(false); 

  };

  function handleSendAlertFav() {

    handleShowAlertFav();
  }

  async function handleAddFav(){


    let favRef = await  petManagService.addPetToFav(userId, animalId);
    setFavId(favRef)

  }

  async function handleDeleteFav(){
      await petManagService.removePetFromFav(favId)
  }

  async function handleCheckFav(){
    let existsFavDoc = await petManagService.checkExistsFavPetsById(userId, animalId)

    if(existsFavDoc!==null){
    setAlertMsgTitleFav("Remove from Favourites");
    setMsgFav("Remove this pet from favourites.");
    }

    setShowFav(existsFavDoc)

    setFavId(existsFavDoc)
  }


  function addFavourite() {

    handleShowAlertFav();

  }

  async function fetchImageUrl(path) {


    if((path!==null) && (typeof path !== 'undefined')){

    setImageUrl(path);
    }
  }


  const goBack = () => {
    navigation.navigate("HomePage")
  }

  function checkLocEmpty(geoLoc){

    if( null!== geoLoc){

      setPin(geoLoc);
      
    }
  }


  function removeStringFromList(list, stringToRemove) {

    if(list == null){
      return null
    }

    return list.filter(pet => pet.petId !== stringToRemove);

  }


async function checkIfChatExists(uid){

  
   let chatEx = await userManagementService.checkIfChatExists(uid, animalId);
   setChatExist(chatEx[0])
   setChatExistId(chatEx[1])

   console.log("chatExist: ", chatEx[0])
   console.log("chatExistID: ", chatEx[1])

}

  useEffect(() => {

    fetchAndHandlePet = async (animalId) => {

      if (pet == null) {
        try {

          petReq = await petManagService.fetchPetById(animalId);
    
          setImagesStore(petReq.petImages);

          petReq.age = categorizeAge(petReq.age);

          setPet(petReq);


          checkLocEmpty(petReq.geoLocation)
          
          userReq = await userManagementService.fetchUserMinInfoById(petReq.petOwner);
       
          fetchImageUrl(userReq.profileImage);
          setUser(userReq);
          
          checkIfChatExists(userReq['id'], animalId);

          convertPetToJson(petReq)
          let jsonString = JSON.parse(convertPetToJson(petReq));

          let reccoms = await toServerAttributesReq(jsonString)
          let labels = reccoms["cat_ids"]

          let petsRequests = await petManagService.fetchPetsByIds(labels)

          petsRequests = removeStringFromList(petsRequests, animalId)
          setAnimalQuestRec(petsRequests)
          

        } catch (error) {
          // Handle any errors that occur during the fetch operation
          console.error('Error fetching pet:', error);
        }
      }
    };

    if(isFocused){
    fetchAndHandlePet(animalId);
    handleCheckFav();
    }
  }, [isFocused]);


  const imageSource = require('../../assets/IMG_9257.jpg');

  const images = [
    require('../../assets/cat.jpg'),
    require('../../assets/person.png')
  ];

  const { width } = Dimensions.get('window');
  const height = width * 0.7;

  const [active, setActive] = useState(0);

  const onScrollChange = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.fds}>

        {imagesPetsFirestore.length > 0 ? (

          <ScrollView
            pagingEnabled
            horizontal
            onScroll={onScrollChange}
            showsHorizontalScrollIndicator={false}
            style={{ width, height }}>

            {imagesPetsFirestore.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width: width, height: height, resizeMode: 'cover' }}
              />
            ))}
          </ScrollView>

        ) : (

          <ScrollView
            pagingEnabled
            horizontal
            onScroll={onScrollChange}
            showsHorizontalScrollIndicator={false}
            style={{ width, height }}>
            {images.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={{ width: width, height: height, resizeMode: 'cover' }}
              />
            ))}
          </ScrollView>

        )
        }

        <TouchableOpacity style={styles.topV} onPress={goBack}>

          <View style={styles.profileImage3}>
            <AntDesign name="arrowleft" size={20} color="#1D082B" style={styles.chatIcon} />
          </View>
        </TouchableOpacity>




        {pet ? (
          <View style={{ ...styles.pagination, marginTop: height - 65 }}>
            {pet.petImages.map((i, k) => (
              <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
                •
              </Text>
            ))}
          </View>

        ) : null}



        <TouchableOpacity style={styles.topRightIcon} onPress={addFavourite}>


          <AntDesign name={showFav ? "heart" : "hearto"} size={29} color="#FF6262" />
        </TouchableOpacity>


        <View style={styles.wrapperView}>



            <View style={styles.userPeterCont}>

            {imageUrl ? (
              <View>
              <Image
                source={{ uri: imageUrl }}
                style={styles.profileImage}
              />
              </View>
               ) : (
                <View>
                <Image
                  source={images[1]}
                  style={styles.profileImage}
                />
                </View>
               )
              }

                {user ? (    

              <TouchableOpacity style={styles.textContainer}  onPress={() => navigation.navigate('UserPage', { userIdd: user.id })}>

                <Text style={{ ...styles.pageHeaderadd, marginBottom: -2, marginLeft: 3, fontWeight: '500' }}>{user.name}</Text>

                <Text style={{ ...styles.pageHeaderaddloc, marginLeft: 3 }}>{user.isAdopter}</Text>
              </TouchableOpacity>


                ) : (

                  <View style={styles.textContainer}>

                  <Text style={{ ...styles.pageHeaderadd, marginBottom: -2, marginLeft: 3, fontWeight: '500' }}>Owner</Text>
  
                  <Text style={{ ...styles.pageHeaderaddloc, marginLeft: 3 }}>Owner</Text>
                </View>

                )
              }


            </View>
          
         


          {pet ? (
            <View>
              <View style={styles.pageHeaderV}>

                <Text style={{ ...styles.pageHeader, marginTop: 10 }}>About {pet.name}</Text>

              </View>


              <View style={styles.containerTextCorrid}>
                <Text style={styles.textCorrid}>{pet.description}</Text>
              </View>
            </View>

          ) : (

            <View>
              <View style={styles.pageHeaderV}>

                <Text style={{ ...styles.pageHeader, marginTop: 10 }}>About</Text>

              </View>

              <View style={styles.containerTextCorrid}>
                <Text style={styles.textCorrid}>pet description...</Text>
              </View>
            </View>



          )
          }



        </View>

        <View style={styles.squareContainer}>



        
        </View>




        <View style={styles.wrapAtrs}>


          {pet ? (

            <View>

              <View style={{ ...styles.pageHeaderV, marginTop: 9 }}>




              <Text style={{ ...styles.attHeader }}>Age</Text>
               { <Text style={styles.attVal}>{pet.age}</Text>   }
                
              </View>

              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={{ ...styles.attHeader }}>Breed</Text>
                <Text style={styles.attVal}>{pet.breed}</Text>
              </View>


              
              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={{ ...styles.attHeader }}>Gender</Text>
                <Text style={styles.attVal}>{pet.gender}</Text>
              </View>

        


              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
              <Text style={{ ...styles.attHeader }}>Color</Text>
                <Text style={styles.attVal}>{pet.color}</Text>
              </View>

              
        



              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={{ ...styles.attHeader }}>Size</Text>
                <Text style={styles.attVal}>{pet.size}</Text>
              </View>


              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={{ ...styles.attHeader }}>Activity level</Text>
                <Text style={styles.attVal}>{pet.actLevel}</Text>
              </View>

        
              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={styles.attHeader}>Sterilized</Text>
                <Text style={styles.attVal}>{pet.isSpayed}</Text>
              </View>


              <View style={{ ...styles.pageHeaderV, marginTop: 3, marginBottom: 10 }}>
                <Text style={styles.attHeader}>Health</Text>
                <Text style={styles.attVal}>{pet.spNeeds}</Text>
              </View>

            </View>
          ) : (


            <View>

              <View style={{ ...styles.pageHeaderV, marginTop: 8 }}>


                <Text style={{ ...styles.attHeader }}>Age</Text>

              </View>

              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={{ ...styles.attHeader }}>Breed</Text>
              </View>

              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={{ ...styles.attHeader }}>Gender</Text>
              </View>

              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={{ ...styles.attHeader }}>Color</Text>
              </View>



              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={{ ...styles.attHeader }}>Size</Text>
              </View>

              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={{ ...styles.attHeader }}>Activity level</Text>
              </View>

         

              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={styles.attHeader}>Sterilized</Text>
              </View>


              <View style={{ ...styles.pageHeaderV, marginTop: 3 }}>
                <Text style={styles.attHeader}>Health</Text>
              </View>

            </View>

          )}

        </View>



        <View style={styles.mapWrapper}>


        {pin ? (

        <MapView
        provider={PROVIDER_GOOGLE} // Use Google Maps on iOS & Android
        style={styles.map}
        initialRegion={{
          latitude: pin['latitude'],
          longitude: pin['longitude'],
          latitudeDelta: 4,
          longitudeDelta: 4,
        }}
      >
        
          <Marker
            coordinate= {{ latitude: pin['latitude'], longitude: pin['longitude'] }}
            title= "pet location"
          />
       
      </MapView>
           )
          : (  

            <View style={styles.mapTContainer}>
              <AntDesign name="exclamationcircleo" size={14} color="#657EFF" style={styles.locationIcon} />

            <Text style={styles.txtCenter}>  Map Unnavailable</Text>
           </View>
          )
          
          }





        </View>



        <View style={{ ...styles.pageHeaderaddx, paddingTop: 10 }}>

          <Text style={{ ...styles.pageHeaderadd }}>Address</Text>

          
          {pet ? (

          <View>
          <Text style={{ ...styles.pageHeaderaddloc }}>{pet.address}</Text>
          </View>

          ): (  

            <View>
            <Text style={{ ...styles.pageHeaderaddloc }}>Unkown</Text>
            </View>
  
          )

        }
        


        </View>


        <View style={styles.pageHeaderVS}>

          <Text style={{ ...styles.pageHeader, marginTop: 8 }}>Similar animals</Text>

        </View>
        <View style={styles.wrapperSiml}>

        {animalQuestRec.length>0 ? (

<FlatList
          horizontal
          data={animalQuestRec}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}

          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goToAnimal(item.petId)}>
            <CardProductsHor3 imgLink={imageSource}
                title={item.name} location={item.address} age={item.age} selectedImage={item.petImages[0]} gender={item.gender} petId={item.petId} />
                </TouchableOpacity>
          )}
      />
    ) : (

      <FlatList
      horizontal
      data={dataEx}
      keyExtractor={item => item.id}
      //numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      showsHorizontalScrollIndicator={false}


      renderItem={({ item }) => (
        <TouchableOpacity >
          <CardProductsHor3 imgLink={imageSource} location=" Not Available"
              />
              </TouchableOpacity>
      )}
  />
)
}

        </View>



        {/* 
<View style={styles.userPeterCont}>

<Image
    source={imageSource} // Replace with the actual image path
    style={styles.profileImage}
  />

<View style={styles.textContainer}>

<Text style={{...styles.pageHeaderadd, marginBottom:-2, marginLeft:3,fontWeight: '500'}}>Minhoquin</Text>

<Text style={{...styles.pageHeaderaddloc, marginLeft:3}}>Owner</Text>
</View>

<View  style={styles.profileImage2}>
<AntDesign name="message1" size={20} color="white" style={styles.chatIcon} />
</View>

</View>

*/}

{ (( chatExist==false && chatExistId!=null)|| (chatExist==false && chatExistId==1)) ? (


        <TouchableOpacity onPress={handleSendAlertReq}>

          <View style={styles.wrapFck}>
            <View style={{ ...styles.squareContinue, backgroundColor: '#657EFF' }}>
              <View style={{ ...styles.squareContent }}>
                <Text style={{ ...styles.squareTextContinue, color: 'white' }}>Adopt me</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

): (

  <View style={styles.xdHeight}></View>
)

}



        <View style={{ ...styles.pageHeaderV, paddingTop: 20 }}>

          <CustomAlert
            visible={showAlert}
            onClose={handleCloseAlert}
            title={alertTitle}
            message={alertMsg}
          />

          <CustomAlertReq
            visible={showAlertReq}
            onClose={handleCloseAlertReq}
            onNo={handleCloseNo}
            title={alertMsgTitle}
            message={alertMsgReq}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
          />


      <CustomAlert2
            visible={showAlertFav}
            onClose={handleCloseAlertFav}
            onNo={handleCloseNoFav}
            title={alertMsgTitleFav}
            message={alertMsgFav}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
          />







        </View>

      </ScrollView>


    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },

  topV: {
    position: 'absolute',
    top: 40,
    marginLeft: 14,
  },

  xdHeight: {
    height:2
  },

  topRightIcon: {
    position: 'absolute',
    top: 38,
    right: 14,
  },

  fds:{
    width:'100%'
  },

  txtCenter: {
    textAlign: 'center',
    fontSize: 14,
    color: '#7B6F82'
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




  dot: {
    color: '#888',
    fontSize: 50,
  },
  activeDot: {
    color: '#FFF',
    fontSize: 50,
  },

  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFCFF'

  },

  ScrollView: {
    width: '100%',

  },

  wrapperView: {
    width: '100%',
    paddingLeft: 14,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 14,
  },

  wrapAtrs: {
    width: '100%',
    paddingLeft: 14,
    paddingRight: 14,

  },


  pageHeader: {
    fontSize: 18,
    fontWeight: '600',
    // color: '#292b2c'
    color: '#181818',
    paddingBottom: 6,
  },


  containerTextCorrid: {
    // backgroundColor: 'red',
  },


  textCorrid: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#000000',
  },




  squareContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 4,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: -10,
    borderBottomWidth: 1, // Add this line for the bottom border
    borderBottomColor: '#CCCCCC', // Choose your desired color for the bottom border


  },



  smallSquareGender: {
    width: 49,
    height: 19,
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 11,
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 1,

    //backgroundColor: '#657EFF',
    marginRight: 6,
    borderColor: '#C3CDFF'

  },

  smallSquareGenderFemale: {
    width: 62,
    height: 19,
    alignItems: 'center',
    borderColor: '#C3CDFF',
    borderRadius: 11,
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 1,


   // backgroundColor: '#657EFF',
    marginRight: 6
  },

  smallSquareAge: {
    width: 58,
    height: 19,
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 11,
    backgroundColor: 'white',
    textAlign: 'center',
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#C3CDFF'
    //backgroundColor: '#657EFF'
  },

  smallSquareSpecies: {
    width: 62,
    height: 19,
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 11,
    textAlign: 'center',
    backgroundColor: 'white',



    backgroundColor: '#657EFF'
  },

  squareText: {
    alignItems: 'center',
    //color: 'black',
    color: '#657EFF',
    fontSize: 13,
    lineHeight:16.5,
  },


  pageHeaderV: {
    flexDirection: 'row',
    alignItems: 'center',


  },


  attHeader: {
    fontSize: 15,
    marginBottom: 4,
    // color: '#292b2c'
    color: '#1D082B',
    width: "56%",
    fontWeight: '500'
    
    //#181818
    //0D0D0D
  }
  ,

  attVal: {
    fontSize: 15,
    color: '#7B6F82'
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

  pageHeaderaddx: {
    paddingLeft: 14,
    paddingTop: 25,
    paddingBottom: 10,
    paddingRight: 14,

  },

  pageHeaderadd: {
    fontSize: 15,
    marginBottom: 1,

  },

  pageHeaderaddloc: {
    fontSize: 14,
    color: '#7B6F82'
  },

  pageHeaderVS: {

    paddingBottom: 2,
    paddingLeft: 14,
    paddingRight: 14,

  },

  wrapperSiml: {
    paddingLeft: 10,
    paddingRight: 14,
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
    marginTop: 12,
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
    fontWeight: '500',

  },

  wrapFck: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 15,
    paddingRight: 12,


    marginTop: -5
  },

  profileImage: {
    width: 45, // Set the desired width
    height: 45, // Set th+e desired height
    marginRight: 10, // Adjust spacing as needed
    borderRadius: 25, // Assuming you want a circular image, adjust border radius as needed
  },

  profileImage2: {
    width: 28, // Set the desired width
    height: 28, // Set the desired height
    borderRadius: 8, // Half of the width and height for a circular shape
    marginLeft: 'auto',
    backgroundColor: '#657EFF',
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    borderColor: '#657EFF', // Set the desired border color
    borderWidth: 1, // Set the desired border width
    marginTop: 1
  },


  userPeterCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: 'white',
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
    borderRadius: 10,
    marginBottom: 8,

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



  squareContent: {
    flex: 1,
    justifyContent: 'center',
  },


  textContainer: {
    flexDirection: 'column', // Vertical arrangement
  },

  mapTContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center'
  },


  mapWrapper: {
    height: 160,
    justifyContent: 'center', // Center content vertically

    overflow: 'hidden', // Ensure the border radius is applied correctly
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
  }

});

export default AnimalPage;