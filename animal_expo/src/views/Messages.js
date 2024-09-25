import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Platform, FlatList, TouchableOpacity} from 'react-native';
import SearchBar2 from '../components/SearchBar2';
import Footer from '../components/Footer';
import MessageComp from '../components/MessageComp';
import UserManagementService from '../services/UserManagementService';
import { useNavigation,useRoute, useIsFocused } from '@react-navigation/native';

export default function Favourites() {

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const imageSource = require('../../assets/IMG_9257.jpg');
  const imageSource2 = require('../../assets/imgs/chu.jpg');

  const[messageData, setMessageData] = useState([["Woody", "Owner", "5 mins","4"], ["Tavora", "Owner", "5 mins","3"], ["Fonseca", "Owner", "5 mins","2"]])

  const[messageInfo , setMessageInfo] = useState([])

  const userManagService = new UserManagementService();


  async function getUserMessages(){

    let msgInfo = await userManagService.getAuthUserMessages();
    console.log(msgInfo)
    setMessageInfo(msgInfo)
  }

  function navigateToChat(idOtherUser, name, idChat, profImage){
    const userIdOtherUser = idOtherUser
    const userName = name
    const chatId = idChat
    let profileImage = profImage
    navigation.navigate('ChatPage', {
      userIdOtherUser,
      userName,
      chatId,
      profileImage
    });

  }


  useEffect(() => {
    if(isFocused){
    getUserMessages()
    }
  }, [isFocused]);






  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.searchV}>

      <SearchBar2></SearchBar2>
</View>

<View style={styles.extraPad}>
      </View>

<FlatList
                data={messageInfo}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => (
                  <TouchableOpacity  onPress={() => navigateToChat(item[0], item[2]['name'], item[3], item[2]['profileImage'])}> 
                  <MessageComp  
                  userName={item[2]['name']}
                  type={item[2]['isAdopter']}
                  dataSince={item[1]}
                 // numMsgs= {item[3]}
                  selectedImage= {item[2]['profileImage']}


                  ></MessageComp>
                </TouchableOpacity>
                )}
                />






      <Footer footerPage='messages'></Footer>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCFF'
  },

  searchV: {
    paddingTop: 10,
    paddingRight: 14,
    paddingLeft: 12,
  },

  extraPad:{
    height:6
  },

  wrapperView:{
    width:'100%',
    paddingLeft: 12,
    paddingBottom: 10,
    paddingRight: 12,
  },

  pageHeaderaddx: {
    paddingLeft: 6,
    paddingRight: 7,    

  },

  pageHeaderadd: {
    fontSize: 16,
    fontWeight: '500',
    color: '#181818'
  },



  pageHeaderMinutes: {
    fontSize: 13,
    color : '#657EFF'
  },


  pageHeaderaddloc: {
    fontSize: 14,
    color: '#7B6F82',
    marginTop: 1,

  },

  pageHeaderVS: {

    paddingBottom: 2,
    paddingLeft: 14,
    paddingRight: 14,    
  
  },

  wrapperSiml:{
    paddingLeft: 10,
    paddingRight: 14,    
  },


  wrapFck:{
    padding: 14,
    marginTop: -5
  },

  profileImage: {
    width: 45, // Set the desired width
    height: 45, // Set the desired height
    marginRight: 10, // Adjust spacing as needed
    borderRadius: 25, // Assuming you want a circular image, adjust border radius as needed
  },

  profileImage2: {
    width: 35, // Set the desired width
    height: 35, // Set the desired height
    borderRadius: 10, // Half of the width and height for a circular shape
    marginLeft: 'auto',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    borderColor: '#899DFF', // Set the desired border color
    borderWidth: 1, // Set the desired border width

  },



    userPeterCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    //backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white', // Set the background color
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,

     // Shadow for Android
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

  userPeterCont2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
    //backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white', // Set the background color
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,

     // Shadow for Android
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



  
  textContainer: {
    flexDirection: 'column', // Vertical arrangement,
    paddingLeft: 5
  },

  textContainer2: {
    flexDirection: 'column', // Vertical arrangement,
    paddingLeft: 5,
    marginLeft: 'auto'
  },

  circle: {
    width: 15,
    height: 15,
    borderRadius: 13,
    backgroundColor: '#657EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginTop: 7,
    textAlign: 'center', // Center the text horizontally

  },
  number: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    lineHeight: 15.1
  },

 

 // #0D0D0D
});
