import { Card } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View , Dimensions, Text, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function CardProductsHor({imgLink, title, location}) {

  const windowWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  let animalId = "PZMSwjnxOXJrF928rXXC";

    return (
        <TouchableOpacity    onPress={() => navigation.navigate('AnimalPage', {
          animalId })}  style={{...styles.touch,  width: windowWidth * 0.458}} >
            <Card style={styles.wrapper}>

                <Card.Cover source={imgLink} style={styles.imageBorder} />


                <View style={styles.squareContainer}>

          <View style={styles.smallSquareAge}>

            <Text style={styles.squareText}>Young</Text>
          </View>
        
          <View style={styles.smallSquareGender}>
            <Text style={styles.squareText}>Male</Text>
          </View>
        </View>

                <Card.Content style={styles.wrapperText}>

                    <Text  variant="titleLarge" style={{width: (windowWidth * 0.458) - 10, ...styles.cardTitle}}>
                        {title}
                    </Text>

                    <View style={styles.locationContainer}>

                    <MaterialIcons name="location-on" size={14} color="#657EFF" style={styles.locationIcon} />

                    <Text variant="bodyMedium" style={styles.cardText}> {location} </Text>

                  </View>

            
                </Card.Content>

            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    touch: {
        margin: 4,
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
        height: 229,
        borderRadius: 10,
        backgroundColor: 'white',
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