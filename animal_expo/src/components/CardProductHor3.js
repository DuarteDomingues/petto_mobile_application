import { Card } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View , Dimensions, Text, Image} from 'react-native';
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function CardProductsHor3({ title, location, gender, age, selectedImage, petId}) {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();


  const animalId = petId

  let imgCat =  require('../../assets/cat.jpg')

  let imageSource = null;

 
  if (selectedImage){


   imageSource = { uri: selectedImage }
  }
 
  else{
     imageSource =  imgCat 
   
  }
//<TouchableOpacity    onPress={() => navigation.navigate('AnimalPage', {
//    animalId })} 

    return (
        <View style={{...styles.touch,  width: windowWidth * 0.4515}} >
            <Card style={{...styles.wrapper, height:  230}}>

                <Card.Cover source={imageSource} style={styles.imageBorder} />


                <View style={styles.squareContainer}>

                {age ? (
          <View style={{...styles.smallSquareAge, width: age=='Senior' ? 55 : 50}}>

            <Text style={styles.squareText}>{age}</Text>
          </View>
          ) : (
                <View></View>
          )
        }


        {gender ? (

          <View style={{...styles.smallSquareGender, width: gender==="Male" ? 40 : 55}}>
            <Text style={styles.squareText}>{gender}</Text>
          </View>

) : (

  <View></View>
)
}

        </View>



                <Card.Content style={styles.wrapperText}>

                    <Text  variant="titleLarge" style={{width: (windowWidth * 0.458) - 10, ...styles.cardTitle}}>
                        {title}
                    </Text>

                   
                    {location!=" Not Available" ? (

                      

<View style={styles.locationContainer}>

<MaterialIcons name="location-on" size={14} color="#657EFF" style={styles.locationIcon} />

<Text variant="bodyMedium" style={styles.cardText}> {location} </Text>

</View>
) : (

<View style={styles.locationContainer}>

<AntDesign name="exclamationcircleo" size={14} color="#657EFF" style={styles.locationIcon} />

<Text variant="bodyMedium" style={styles.cardText}> {location} </Text>

</View>                  )
}

            
                </Card.Content>

            </Card>
        </View>
    )
}

const styles = StyleSheet.create({

    touch: {
        margin: 6,
    },

    wrapper: {
        margin: '1%',
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        //height: 229,

        borderRadius: 10,
        backgroundColor: 'white',
       // marginBottom: 6,
    },
    

    imageBorder: {
        borderRadius: 2,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        height: 145

    },

    wrapperText: { 

    },

  
    fillView:{
      height: 30,
    },
    squareContainer: {
        flexDirection: 'row',
        marginStart: 19,
        marginTop: 8,
        marginBottom: 3,
        border: 'None',

      },

      smallSquareGender: {
        width: 40,
        height: 18,
        alignItems: 'center',
        borderRadius: 9,
        textAlign: 'center',
        borderWidth: 1, 

        borderColor: '#C3CDFF',
      //  borderWidth: 1, 
      // backgroundColor: '#657EFF'
      //backgroundColor: '#657EFF'

      },

      smallSquareAge: {
        width: 49,
        height: 18,
        alignItems: 'center',
        borderColor: '#C3CDFF',
        borderRadius: 9,
        textAlign: 'center',
        borderWidth: 1, 

      marginRight: 5,
    //  backgroundColor: '#657EFF'


   // backgroundColor: '#657EFF'
    },

      squareText: {
        alignItems: 'center',
      //  color: '#0D0D0D',
        color: '#657EFF',
        fontSize: 12,
        fontWeight: 'medium',
        marginTop: -1
      },


      
 

    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginStart: 2,
        color: '#0D0D0D'

      },

      cardText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#7B6F82'
      },

    
      locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center'
      },
  

})