import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList, Platform, Image, TouchableOpacity} from 'react-native';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import AnimalHeader from '../components/AnimalHeader';
import CardProductsHor2 from '../components/CardProductsHor2';
import { useNavigation, useRoute, useIsFocused  } from '@react-navigation/native';
import PetManagementService from '../services/PetManagementService';
import UserManagementService from '../services/UserManagementService';

export default function HomePage() {

    const isFocused = useIsFocused();
    const petManagementService = new PetManagementService();
    const userManagementService = new UserManagementService();

    const [inputSearchHome, setInputSearch] = useState('');

    function handleOnSubmitEditing() {

      console.log("subbbbmited")

      navigation.navigate("SearchPage",
        {
          inputSearchHome
        }
      )
    };
  
    

    // add this to a requestService
    async function toServerAttributesReq(data) {
      try {

       // const response = await fetch('http://10.0.2.2:5000/text_recommendations', {
        const response = await fetch('https://myflaskapp-cccrohvifa-uw.a.run.app/text_recommendations', {
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

    const [animalsRec, setAnimalsRec] = useState([])
    const[animalQuestRec, setAnimalQuestRec] = useState([])
  
    const [search, setSearch] = useState("");

    const navigation = useNavigation();

    const imageSource = require('../../assets/IMG_9257.jpg');
    const [imageSource3, setImageSource3] = useState(require('../../assets/imgs/quest3.png'));

    const [userProfileImage, setUserProfileImage] = useState(null);

    const updateSearch = (search) => {
      setSearch(search);
    };

    function convertAttToJson(quest){

      let petJson = {
        Species: quest[0].toUpperCase(),
        Age: quest[4].toUpperCase(),
        Gender: quest[3].toUpperCase(),
        Breed: quest[8].toUpperCase(),
        Color: quest[1].toUpperCase(),
        Size: quest[5].toUpperCase(),
        Health: getHealthy(quest[10]),
        Sterilized: quest[9].toUpperCase()     
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

    const [selected, setSelected] = useState(null);
    
    const handlePress = (numb) => {
      
      if(selected!=numb){
      setSelected(numb);
      loadRecentPetsFilt(numb);
      }
      else{
        setSelected(null);
      }
    };

    function goRecentSearch(){

      let recentAnimals = [true, selected]
      navigation.navigate('SearchPage', {
        recentAnimals
      
    });
    }

    function goRecommendedSearch(){

      navigation.navigate('SearchPage', {
        animalQuestRec
      
    });
    }

    async function loadRecentPetsFilt(petStr){

      let petx = await petManagementService.getPetsRecent(petStr, 5)
      setAnimalsRec(petx)
      
    }

    async function loadRecentPets(){

      let petx = await petManagementService.getPetsRecent(null, 5);
      setAnimalsRec(petx)
    }

    async function loadRecommends(){

      let quests = await userManagementService.getUserPref()
      setUserProfileImage(quests[1])


      if (quests[0] != null && typeof(quests[0]) != undefined){


        if(quests[0][0] === "Bird" || quests[0][0] === "Roedent" || quests[0][0] === "Rabbit"){

      //    let petReqs = await petManagementService.fetchPetsByIds(labels)

        let animString = quests[0][0] + "s"

        let petx = await petManagementService.getPetsNotRec(animString, 5)
        setAnimalQuestRec(petx)

        }
        else{

        setImageSource3(require('../../assets/imgs/quest6.png'))
        
        console.log("tou a mandar req")

        let jsonQuest = JSON.parse(convertAttToJson(quests[0]));
        let reccoms = await toServerAttributesReq(jsonQuest)
        let labels = reccoms["cat_ids"]

        let petReqs = await petManagementService.fetchPetsByIds(labels)
        setAnimalQuestRec(petReqs)
        }
      }
    }


    useEffect(() => {

      if(isFocused){ 
        setSelected(null)
        loadRecentPets();
        loadRecommends();
    
      }
    }, [isFocused]);


    
  return (
    

    <SafeAreaView  style={styles.container}>

    <ScrollView style={styles.fds}>

            <View style={styles.wrapperView2}>
     
    <SearchBar userImage={userProfileImage} inputSearch={inputSearchHome}  setInput={setInputSearch}  handleInput={handleOnSubmitEditing}></SearchBar>
</View>


  <View style={styles.wrapperView}>



<View style={styles.extraPad}>

<AnimalHeader selected={selected} setSelected={setSelected} handlePress={handlePress} />

</View>

    
      <View style={styles.pageHeaderV}>
        <Text style={styles.pageHeader}>Recently added</Text>
        <TouchableOpacity onPress={goRecentSearch}>
        <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>

      {animalsRec.length>0 ? (

      <FlatList
                horizontal
                data={animalsRec}
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
            

      <View style={{...styles.pageHeaderV, paddingTop: 7}}>
        <Text style={styles.pageHeader}>Recommended</Text>
        <TouchableOpacity onPress={goRecommendedSearch}>
        <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>


      {animalQuestRec.length>0 ? (

      <FlatList
                horizontal
                data={animalQuestRec.slice(0, 5)}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}

                renderItem={({ item }) => (
                  <TouchableOpacity  >
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
            

  {/*
     
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeader}>Recommended</Text>
      </View>

      <FlatList
                horizontal
                data={products}
                keyExtractor={item => item.key}
                //numColumns={2}
                columnWrapperStyle={styles.columnWrapper}


                renderItem={({ item }) => (
                    <CardProducts imgLink={imageSource}
                        title="Fonseca" price="Telheiras" />
                )}

            />
            */}

<TouchableOpacity style={styles.fillScreen2} onPress={() => navigation.navigate('QuestionnaireFirst')}> 

<View style={styles.shadowView}>

<Image
    source={imageSource3} // Replace with the actual image path
    style={styles.fillScreen}
  />

</View>

</TouchableOpacity>

</View>
          
          


<View style={styles.fillView}>
</View>


</ScrollView>


<Footer footerPage='home'></Footer>


    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFCFF'

  },


  fds:{
    width:'100%'
  },


  wrapperView:{
    width:'100%',
    padding: 10,
  },

  wrapperView2:{
    marginTop: 8,
    marginLeft:13,
    marginBottom: -10
  },



  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },


  content: {
    marginBottom: 20,
  },

  pageHeaderV:{
    flexDirection: 'row',
    alignItems: 'center',
  },

  fillView: {
    height: 10
  },
  pageHeader: {
    flex: 1, // Takes up all available space
    fontSize: 18,   
    padding: 4,          
    paddingTop: 6, 
    marginBottom: 4,
    fontWeight: '600',
   // color: '#292b2c'
    color: '#181818'
  },

  seeMore: {
    fontSize: 13,
    paddingRight: 5,
    color: "#657EFF",
  },

  extraPad:{
    paddingTop: 5,
    paddingBottom: 4
  },

  fillScreen: {
    height: 130,
    width: '100%',
    borderRadius: 10, 
    paddingRight: 30,
    paddingBottom: 20,
    resizeMode: 'stretch'
    
  },
  
     
  shadowView: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,

   },

  fillScreen2: {
    marginTop: 20,
    width: '99%',
    marginLeft: 3

  }

 
});

