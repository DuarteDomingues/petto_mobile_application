import { GeoPoint } from 'firebase/firestore';



const namesArray = ["Bella", "Max", "Charlie", "Daisy", "Lucy", "Buddy", "Molly", "Coco", "Rocky", "Chloe", "Milo", "Bailey", "Lola", "Teddy", "Sophie", "Leo", "Nala", "Simba", "Lily", "Ruby", "Oliver", "Maggie", "Sadie", "Rosie", "Duke", "Mia", "Jack", "Sophie", "Toby", "Oscar", "Bentley", "Luna", "Roxy", "Gizmo", "Zoe", "Harley", "Bear", "Zoe", "Lulu", "Shadow", "Bruno", "Pepper", "Ollie", "Stella", "Murphy", "Dexter", "Penny", "Jake", "Milo", "Ella", "Sammy", "Gracie", "Buster", "Jasmine", "Rex", "Angel", "Jasper", "Abby", "Scout", "Winston", "Ginger", "Finn", "Sasha", "Ziggy", "Zeus", "Cody", "Dakota", "Bailey", "Mocha", "Chester", "Emma", "Thor", "Rusty", "Boomer", "Peanut", "Olive", "Sparky", "Misty", "Bandit", "Pumpkin", "Maximus", "Honey", "Frankie", "Holly", "Ace", "Romeo", "Trixie", "Baxter", "Gus", "Cleo", "Prince", "Oreo", "Scout", "Heidi", "Simba", "Princess"]
const cityGeoPoints = {
    "New York": new GeoPoint(40.7128, -74.0060),
    "Los Angeles": new GeoPoint(34.0522, -118.2437),
    "Chicago": new GeoPoint(41.8781, -87.6298),
    "Houston": new GeoPoint(29.7604, -95.3698),
    "Phoenix": new GeoPoint(33.4484, -112.0740),
    "Philadelphia": new GeoPoint(39.9526, -75.1652),
    "San Antonio": new GeoPoint(29.4241, -98.4936),
    "San Diego": new GeoPoint(32.7157, -117.1611),
    "Dallas": new GeoPoint(32.7767, -96.7970),
    "San Jose": new GeoPoint(37.3382, -121.8863),
    "Austin": new GeoPoint(30.2672, -97.7431),
    "Jacksonville": new GeoPoint(30.3322, -81.6557),
    "Fort Worth": new GeoPoint(32.7555, -97.3308),
    "Columbus": new GeoPoint(39.9612, -82.9988),
    "Charlotte": new GeoPoint(35.2271, -80.8431),
    "San Francisco": new GeoPoint(37.7749, -122.4194),
    "Indianapolis": new GeoPoint(39.7684, -86.1581),
    "Seattle": new GeoPoint(47.6062, -122.3321),
    "Denver": new GeoPoint(39.7392, -104.9903),
    "Washington": new GeoPoint(38.9072, -77.0369),
    "Boston": new GeoPoint(42.3601, -71.0589),
    "El Paso": new GeoPoint(31.7619, -106.4850),
    "Nashville": new GeoPoint(36.1627, -86.7816),
    "Detroit": new GeoPoint(42.3314, -83.0458),
    "Oklahoma City": new GeoPoint(35.4676, -97.5164),
    "Las Vegas": new GeoPoint(36.1699, -115.1398),
    "Portland": new GeoPoint(45.5051, -122.6750),
    "Miami": new GeoPoint(25.7617, -80.1918),
    "Atlanta": new GeoPoint(33.7490, -84.3880),
    "New Orleans": new GeoPoint(29.9511, -90.0715),
    "Kansas City": new GeoPoint(39.0997, -94.5786),
    "Cleveland": new GeoPoint(41.4993, -81.6944),
    "Minneapolis": new GeoPoint(44.9778, -93.2650),
    "Tampa": new GeoPoint(27.9506, -82.4572),
    "Orlando": new GeoPoint(28.5383, -81.3792),
    "Cincinnati": new GeoPoint(39.1031, -84.5120),
    "Pittsburgh": new GeoPoint(40.4406, -79.9959),
    "Sacramento": new GeoPoint(38.5816, -121.4944),
    "St. Louis": new GeoPoint(38.6270, -90.1994),
    "Salt Lake City": new GeoPoint(40.7608, -111.8910),
    "Baltimore": new GeoPoint(39.2904, -76.6122),
    "San Bernardino": new GeoPoint(34.1083, -117.2898),
    "Memphis": new GeoPoint(35.1495, -90.0490),
    "Milwaukee": new GeoPoint(43.0389, -87.9065),
    "Albuquerque": new GeoPoint(35.0844, -106.6504),
    "Tucson": new GeoPoint(32.2226, -110.9747),
    "Fresno": new GeoPoint(36.7378, -119.7871),
    "Mesa": new GeoPoint(33.4152, -111.8315)
  };

  const colors = ["Black", "Brown", "Golden", "Yellow", "Cream", "Gray", "White"]

  const breedBunny = ["Holland Lop", "Netherland Dwarf", "Mini Rex", "Flemish Giant", "Lionhead"]


  const breedBird = ["Budgerigar", "Cockatiel", "Parrot", "Canary", "Lovebird", "Macaw", "Finch"]

  const breedRoe = ["Hamster", "Guinea Pig", "Chinchilla", "Gerbil", "Degus", "Rat", "Sugar Glider"]


  const imageMapping = {

  };

const userArray = ["1g4F45nZ3FTBWYlcfalL3aHL56R2", "VBbCNzPIMCrmLQvIGyG8"]







export { namesArray, cityGeoPoints, userArray, imageMapping, colors, breedBunny, breedBird, breedRoe}