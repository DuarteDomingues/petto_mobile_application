import { Card } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View , Dimensions, Text, Image} from 'react-native';
import { Feather, MaterialIcons,AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CardProductsHor2({ title, location, gender, age, selectedImage, petId}) {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();


  function truncateString(str) {

    
    if (str !== undefined && str !== null && typeof(str) !== "undefined") {
  
    if (str.length > 18) {
        return str.slice(0, 18) + "...";
    }
  }
    return str;
}

0
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

  age = categorizeAge(age);

  location = truncateString(location)



  const animalId = petId

  let imgCat =  require('../../assets/cat.jpg')

  let imageSource = null;

 
  if (selectedImage){


   imageSource = { uri: selectedImage }
  }
 
  else{
     imageSource =  imgCat 
   
  }


    return (
        <TouchableOpacity    onPress={() => navigation.navigate('AnimalPage', {
          animalId })}  style={{...styles.touch,  width: windowWidth * 0.4515}} >
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
        </TouchableOpacity>
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