import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, Platform, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WriteStuff2 from '../components/WriteFile2';


export default function Login() {

  const navigation = useNavigation();

  const imageSource = require('../../assets/imgs/logo.png');

    return (
    
      
    <SafeAreaView  style={styles.container}>

<View style={styles.xd}>

<Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />
</View>


<ScrollView>
<View style={styles.wrapperView}>




<View style={{...styles.centerStuff, paddingTop: 80}}>

<TouchableOpacity style={styles.smallSquareColors1} onPress={() => navigation.navigate('LoginSec')}>

<View style={styles.squareContent}>

        <Text style={styles.squareText}>Log-in with Email</Text>
        </View>
</TouchableOpacity>



<View style={styles.centerOption}>

        <Text style={styles.centerOptionText}>Or enter with</Text>
</View>

<TouchableOpacity style={styles.smallSquareColors2} >
<View style={styles.squareContent2}>
<AntDesign style={styles.iconGoogle} name="google" size={20} color="white" />

        <Text style={styles.squareText}>Log-in with Google</Text>
        </View>

</TouchableOpacity>



</View>

</View>


</ScrollView>

{/*

<WriteStuff2></WriteStuff2>
*/}

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


      centerStuff: {
        justifyContent: 'center',
        alignItems: 'center',
      },

      smallSquareColors1: {
        width: "88%",
        height: 36,
        borderRadius: 8,
      //  opacity: 0.85
      //borderColor: '#657EFF',
     // borderWidth: 1, 
      backgroundColor: '#657EFF',
      marginTop: 14,
      marginBottom: 14,
      textAlign: 'center',
      alignItems: 'center',

      
      ...Platform.select({
        android: {
          elevation:3,
        },
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
      }),
    
    },


    smallSquareColors2: {
      width: "88%",
      height: 36,
      borderRadius: 8,
    //  opacity: 0.85
    //borderColor: '#657EFF',
   // borderWidth: 1, 
    backgroundColor: '#657EFF',
    marginTop: 14,
    marginBottom: 14,
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Align icon and text in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
    
    ...Platform.select({
      android: {
        elevation:3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  
  },


    centerOptionText: {
        color: '#7B6F82',
        fontSize: 16
    },

    squareContent: {
      flex: 1,
      justifyContent: 'center',

    },

    squareContent2: {
      flexDirection: 'row', // Align icon and text in a row
      alignItems: 'center', // Center items vertically
      justifyContent: 'center', // Center items horizontally
    },
   
    squareText: {

      alignItems: 'center',
      color: 'white',
      fontSize: 18,
      fontWeight: '500',

    },  
    iconGoogle: {
      paddingRight:7
    },

    xd: {
      backgroundColor: '#657EFF'

    },
    image: {
      width: '100%',
      height: 252,
      transform: [{ scale: 0.68 }],
    },
})