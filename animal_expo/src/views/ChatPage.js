import { GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat'
import { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image , Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserManagementService from '../services/UserManagementService';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function Chat() {

  const navigation = useNavigation();
  const route = useRoute();

  const userIdUser = "1g4F45nZ3FTBWYlcfalL3aHL56R2"
 // const userIdOtherUser = "7Gb6xl0oRlcm8HWG0zRgeHD1CXJ3"


  const {userIdOtherUser, userName, chatId, profileImage} = route.params ?? {};


  const userManagementService = new UserManagementService();


  const goBack = () => {
    navigation.navigate('HomePage')
  }


  let imgCat =  require('../../assets/person.png')


  let imageSource = null;
  
 
  if (profileImage){
   imageSource = { uri: profileImage }
  }
 
  else{
     imageSource =  imgCat 
   
  }



    let message={
      _id: '1',
      text: 'Hello, how are you?',
      createdAt: new Date(), // or any other valid timestamp
      user: {
        _id: 'user1',
        name: 'John Doe', // optional: you can include additional user properties
      }
    }

    let message2={
      _id: '2',
      text: 'Hello, how are you!!!!!?',
      createdAt: new Date(), // or any other valid timestamp
      user: {
        _id: 'user1',
        name: 'John Doe', // optional: you can include additional user properties
      }
    }

    const [messages, setMessages] = useState([]);


  const onSendMsg = async (msgArray) => {

    const msg = msgArray[0]

    console.log("MSG", msg)
    const time = new Date();
    const userMsg = {
      ...msg,
      createdAt: time
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, userMsg))
    

     await userManagementService.sendMessage(time, msg['text'], userIdOtherUser, chatId)

  }


  /*
    async function fetchUserMsgs(){

      await userManagementService.getUserMessages(setMessages, chatId, userName)

      console.log("messages", messages)

    }

    useEffect(() => {

      fetchUserMsgs()

    }, []);

*/

useEffect(() => {
  let unsubscribe;

  const fetchUserMsgs = async () => {
    unsubscribe = await userManagementService.getUserMessages(setMessages, chatId, userName);
  };

  fetchUserMsgs();

  return () => {
    // Call the unsubscribe function when the component unmounts
    if (unsubscribe) {
      unsubscribe();
    }
  };
}, []);


    return (

      <View style={styles.container}>


<View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
      <Ionicons name="arrow-back" style={styles.arrowBack} size={24} color="#1D082B" />
      </TouchableOpacity>


      <Text style={styles.titleText}>{userName}</Text> 

      <TouchableOpacity onPress={() => navigation.navigate('UserPage', { userIdd: userIdOtherUser })}>
      <Image source={imageSource} style={styles.userImage} />
      </TouchableOpacity>
    </View>


        <GiftedChat
        style={{flex: 1, backgroundColor:'#001973' }}
          messages={messages}
         onSend={text => onSendMsg(text)}
          user={{
                _id: userIdUser,

            }}

            renderBubble={props => {
              return (
                <Bubble
                  {...props}
        
                  textStyle={{
                    right: {
                      color: '#fdfdfd',
                      // fontFamily: "CerebriSans-Book"
                    },
                    left: {
                      color: '#24204F',
                      // fontFamily: "CerebriSans-Book"
                    },
                  }}
                  wrapperStyle={{
                    left: {
                      backgroundColor: '#e5e5ea',
                    },
                    right: {
                      backgroundColor: "#057ffe",
                    },
                  }}
                />
              );
            }}      

        />
            </View>       

    )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },


  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 35,
    backgroundColor: 'white',

    ...Platform.select({
      android: {
        elevation: 1,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },




  backText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    marginBottom:10,

  },
  titleText: {
    color: '#1D082B',
    fontWeight: '500',
    fontSize: 18,
    marginBottom:10,
    marginLeft:11

  },


  userImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginBottom:10

  },

  arrowBack: {
    marginBottom:10,

  }

});