import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, FlatList, Platform , TouchableOpacity} from 'react-native';
import Footer from '../components/Footer';
import MapView, { Marker } from 'react-native-maps';
import CardProductsHor from '../components/CardProductsHor';
import UserManagementService from '../services/UserManagementService';
import PetManagementService from '../services/PetManagementService';
import { MaterialIcons, AntDesign  } from '@expo/vector-icons';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import UseImage from '../services/UseImage';
import CardProductsHor2 from '../components/CardProductsHor2';
import AuthenticationService from '../services/AuthenticationService';
import CustomAlert2 from '../components/CustomAlertReq2';



export default function UserPage() {

  const authService = new AuthenticationService();


  const isFocused = useIsFocused();


  const [products, setProducts] = useState([{'key':'val2'}, {'key':'val3'}, {'key':'val4'}]);
  const imageSource = require('../../assets/banz2.png');
  const imageSource2 = require('../../assets/person.png');
  const imageSource3 = require('../../assets/IMG_9257.jpg');
  const navigation = useNavigation();


  const [showAlertLogOut, setShowAlertLogout] = useState(false);

  const handleShowAlertLogout = () => {
    setShowAlertLogout(true);
  };

  const handleLogoutNo = () => {
    setShowAlertLogout(false);
  }

  async function handleLogoutYes() {
    await doSignOut();
  }

  

  const route = useRoute();

  const { userIdd } = route.params ?? {};


  const[animalsUser, setAnimalsUser] = useState([])
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

 // const userId = "VBbCNzPIMCrmLQvIGyG8";


  const [user, setUser] = useState(null);

  const userManagementService = new UserManagementService(); 
  const petManagementService = new PetManagementService(); 
  const useImage = new UseImage();

  const [pin, setPin] = useState(null);

  const [favNumb, setFavNumb] = useState(null);
  const [petNumb, setPetNumb] = useState(null);
  const [postNumb, setPostNumb]  = useState(null);

 // userManagementService.fetchUserById(userId);
const[imageUrl, setImageUrl] = useState(null);


async function doSignOut(){

  try {

    await authService.doLogout();
    setUser(null);
    navigation.navigate('Login')

 } catch (error) {
   console.log("error logging out")
   return;
 }
 finally{
  navigation.navigate('Login')
 }
}



function checkLocEmpty(geoLoc){

  if( null!== geoLoc){

    setPin(geoLoc);
    
  }
}
fetchAndHandleUser = async (id) => {

  if(user==null){

    try {

      let userReq = await userManagementService.fetchUserById(id);

      console.log("conareq", userReq)

      checkLocEmpty(userReq.geoLocation)

      setImageUrl(userReq.profileImage);
      setUser(userReq);

    }
    catch (error) {
      console.error('Error fetching user:', error);
    }
  }
}


async function getUserPets(){
  let pets = await petManagementService.getPetsByUser(userIdd);
  setAnimalsUser(pets)
}


function goUser(){

  setUser(null), 
  navigation.navigate('EditProfile')
}

async function getCx(){
  let countFav = await petManagementService.countFavoritesForUser(userIdd)
  let countFavPet = await petManagementService.countPetsForOwner(userIdd)

  setPetNumb(countFavPet)
  setFavNumb(countFav)
  setPostNumb(0)

}




  useEffect(() => {

    if (isFocused){
    fetchAndHandleUser(userIdd);
    getCx()
    getUserPets()

    }

  }, [isFocused]);



  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.fds}>

      <Image source={imageSource} style={styles.bannerImage} />



      {authService.isCurrUser(userIdd) && (
        <>
      <TouchableOpacity style={styles.topRightIcon} onPress={() => goUser()} >

<MaterialIcons  name={"settings"} size={30} color="#E7EBFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.topLeftIcon} onPress={() => handleShowAlertLogout()} >

<MaterialIcons  name={"logout"} size={30} color="#E7EBFF" />
        </TouchableOpacity>
        </>
)}
    
  

        {imageUrl ? (
          
<View style={styles.xd}>

<View style={styles.userProfileImageContainer}>
<Image source={{uri: imageUrl}} style={styles.userProfileImage} />
</View>
</View>
): (
<View style={styles.xd}>

<View style={styles.userProfileImageContainer}>
<Image source={imageSource2} style={styles.userProfileImage} />
</View>
</View>
)

}




      <View style={styles.wrapperView}>

      {user ? (
        <View>
      <View style={styles.userTitleView}>
      <Text style={styles.textUserName}>{user.name}</Text>
      <Text style={styles.textUserType}>{user.isAdopter}</Text>
    </View>

      

    <View style={styles.containerTextInfo}>
      <View style={styles.column}>
        <Text style={styles.textTop}>{petNumb}</Text>
        <Text style={styles.textBottom}>PETS</Text>
      </View>
      <View style={{...styles.column, paddingLeft:4}}>
        <Text style={styles.textTop}>{favNumb}</Text>
        <Text style={styles.textBottom}>FAVOURITES</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.textTop}>{postNumb}</Text>
        <Text style={styles.textBottom}>POSTS</Text>
      </View>
    </View>

</View>


): (
  <View>
  <View style={styles.userTitleView}>
  <Text style={styles.textUserName}>User</Text>
  <Text style={styles.textUserType}>Owner</Text>
</View>

  

<View style={styles.containerTextInfo}>
  <View style={styles.column}>
    <Text style={styles.textTop}></Text>
    <Text style={styles.textBottom}>PETS</Text>
  </View>
  <View style={{...styles.column, paddingLeft:4}}>
    <Text style={styles.textTop}></Text>
    <Text style={styles.textBottom}>FAVOURITES</Text>
  </View>
  <View style={styles.column}>
    <Text style={styles.textTop}></Text>
    <Text style={styles.textBottom}>POSTS</Text>
  </View>
</View>

</View>


)

}

{/* 

<View style={styles.wrapFck}>
<View style={{...styles.squareContinue,  backgroundColor: '#657EFF'}}>
<View style={{...styles.squareContent}}>
<Text style={{...styles.squareTextContinue, color: 'white'}}>Add favourite</Text>
</View>
</View>

<View style={{...styles.squareContinue,  backgroundColor: '#657EFF'}}>
<View style={{...styles.squareContent}}>
<Text style={{...styles.squareTextContinue, color: 'white'}}>Send message</Text>
</View>
</View>

</View>
*/}

<View style={styles.wrapperView2}>

{user ? (

<View>
<View style={styles.pageHeaderV}>

<Text style={{...styles.pageHeader, marginTop: 2}}>About {user.name}</Text>

</View>



<View style={styles.containerTextCorrid}>
      <Text style={styles.textCorrid}>{user.description}</Text>
    </View>
    </View>
): (
<View>
<View style={styles.pageHeaderV}>

<Text style={{...styles.pageHeader}}>About </Text>

</View>

<View style={styles.containerTextCorrid}>
      <Text style={styles.textCorrid}></Text>
    </View>
    </View>

)

}





</View>


{user ? (


<View style={styles.attsV}  >

<View style={{...styles.pageHeaderV2,  marginTop: 10}}>
        <Text style={{...styles.attHeader}}>Phone number</Text>
        <Text style={styles.attVal}>{user.phone}</Text>
      </View>


      <View style={{...styles.pageHeaderV2,  marginTop: 3}}>
        <Text style={{...styles.attHeader}}>Email</Text>
        <Text style={styles.attVal}>{user.email}</Text>
      </View>




      </View>

): (
<View style={styles.attsV}  >

  <View style={{...styles.pageHeaderV2,  marginTop: 10}}>
        <Text style={{...styles.attHeader}}>Phone</Text>
        <Text style={styles.attVal}>Phone</Text>
      </View>


      <View style={{...styles.pageHeaderV2,  marginTop: 3}}>
        <Text style={{...styles.attHeader}}>Email</Text>
        <Text style={styles.attVal}>Email</Text>
      </View>

      </View>
    )

  }

<View style={styles.mapWrapper}>

{pin ? (

<MapView
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
  />

</MapView>
   )
  :(
    <View style={styles.mapTContainer}>
    <AntDesign name="exclamationcircleo" size={14} color="#657EFF" style={styles.locationIcon} />

  <Text style={styles.txtCenter}>  Map Unnavailable</Text>
 </View>


  )
  
  }
        </View>


<View style={{...styles.pageHeaderaddx, paddingTop: 10}}>

<Text style={{...styles.pageHeaderadd}}>Address</Text>

{user ? (

<View>
{/* <Text style={{ ...styles.pageHeaderaddloc }}>{user.address}</Text>  */}
{ <Text style={{ ...styles.pageHeaderaddloc }}>{user.location}</Text>  }
</View>

): (  

  <View>
  <Text style={{ ...styles.pageHeaderaddloc }}>Unkown</Text>
  </View>
)
}

</View>



<View style={styles.pageHeaderVS}>

<Text style={{...styles.pageHeader, marginTop: 8}}>Pets for adoption</Text>

</View>
<View style={styles.wrapperSiml}>

{animalsUser.length>0 ? (

<FlatList
          horizontal
          data={animalsUser}
          keyExtractor={(item, index) => index.toString()}
          //numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsHorizontalScrollIndicator={false}


          renderItem={({ item }) => (
            <TouchableOpacity >
              <CardProductsHor2 imgLink={imageSource}
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
          <CardProductsHor2 imgLink={imageSource} location=" Not Available"
              />
              </TouchableOpacity>
      )}
  />

    )
  }

</View>



<CustomAlert2
            visible={showAlertLogOut}
            onClose={handleLogoutYes}
            onNo={handleLogoutNo}
            title={"Logout"}
            message={"Logout from your account."}
            inputMessage={"xd1"}
            setInputMessage={"xd2"}
          />





</View>


      </ScrollView>

<Footer></Footer>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCFF',
    alignItems: 'center',

  },

  fds:{
    width:'100%'
  },

  wrapperView:{
    width:'100%',
    paddingTop: 20,
    paddingBottom: 10,
  },


  topRightIcon: {
    position: 'absolute',
    top: 36,
    right: 14,
},

topLeftIcon: {
  position: 'absolute',
  top: 36,
  left: 14,
},



  userTitleView:{
    marginTop: -7
  },


  squareContent: {
    flex: 1,
    justifyContent: 'center',
  },
 
  bannerImage: {
    width: '100%',
    height: 130,
    resizeMode: 'cover', // Adjust the image content mode as needed
  },


  userProfileImageContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: -70, // Adjust the margin as needed
  },


  userProfileImage: {
    width: 140,
    height: 140,
    borderRadius: 70, // Make it half of the width/height for a circular image
    borderWidth: 1,
    borderColor: 'white', // Set the border color to match the background color
  },

  xd: {
    marginBottom:60,
  },

  textUserName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    color: '#0D0D0D',

  },

  textUserType: {
    fontSize: 15,
    textAlign: 'center',
    color: '#7B6F82',
    fontWeight: '400',
    paddingBottom:4,
  },
 

  attsV: {
    paddingBottom: 1,
    marginTop: 1,
    borderTopWidth: 1, // Add this line for the bottom border
    borderTopColor: '#CCCCCC', // Choose your desired color for the bottom border


  },



  containerTextInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:6,
    marginBottom:12,
    paddingTop: 2,
    paddingBottom: 7,
    marginLeft:14,
    marginRight:14,
    borderRadius: 10,

    paddingLeft: 25,
    paddingRight: 25,
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
  column: {
    alignItems: 'center',
    paddingTop: 2,
  },




  textTop: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1D082B', // Adjust text color as needed,
  },
  textBottom: {
    fontSize: 12,
    color: '#7B6F82', // Adjust text color as needed
    fontWeight: '400'
    
  },


  squareContinue: {
    width: "48%",
    height: 28,
    borderColor: 'black',
    borderRadius: 8,
  //  opacity: 0.85
  borderColor: '#899DFF',
backgroundColor: '#ffffff',
    alignItems: 'center',
    textAlign: 'center',

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
  color: '#181818',
  fontSize: 15,
  textAlign: 'center',
  fontWeight: '500'

},  

wrapFck:{
  paddingLeft:14,
  paddingRight:14,
  paddingTop:13,
  paddingBottom:12,
  marginTop: -5,
  flexDirection: 'row',
  justifyContent: 'space-between'
},



wrapperView2:{
  width:'100%',
  paddingLeft: 14,
  paddingTop: 10,
  paddingBottom: 10,
  paddingRight: 14,
},



pageHeader: {
  fontSize: 18,   
  fontWeight: '600',
 // color: '#292b2c'
  color: '#181818',
  paddingBottom: 7,
},


textCorrid: {
  fontSize: 14,
  fontWeight: 'normal',
  color: '#000000',
},



squareContainer: {
  flexDirection: 'row',

},

smallSquareGender: {
  width: 120,
  height: 22,
  alignItems: 'center',
  borderColor: 'black',
  borderRadius: 11,
  textAlign: 'center',
  backgroundColor: 'white',


 backgroundColor: '#657EFF',
marginRight: 8

},

smallSquareAge: {
  width: 60,
  height: 22,
  alignItems: 'center',
  borderColor: 'black',
  borderRadius: 11,
  backgroundColor: 'white',
  textAlign: 'center',

marginRight: 8,
backgroundColor: '#657EFF'
},

smallSquareSpecies: {
  width: 66,
  height: 22,
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
  color: 'white',

  fontSize: 14,
 // lineHeight:21,

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

pageHeaderV:{
  flexDirection: 'row',
  alignItems: 'center',

},

pageHeaderV2:{
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 14,
  marginRight: 14
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

  marginTop:6,
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

txtCenter: {
  textAlign: 'center',
  fontSize: 14,
  color: '#7B6F82'
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


wrapperSiml:{
  paddingLeft: 10,
  paddingRight: 14,    
  width: '100%'
},


});
