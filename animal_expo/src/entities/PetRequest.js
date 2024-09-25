class PetRequest {
    constructor(images, species, name, address, breed, color, size, dateBirth, gender,actLevel,isSpayed,spNeeds, petOwner, petImages, description, geoLocation, petId, dateAdded, age, dbId) {
        this.images=images;
        this.species = species;
        this.name = name;
        this.address = address;
        this.breed = breed;
        this.color = color;
        this.size = size;
        this.dateBirth = dateBirth;
        this.gender = gender;
        this.actLevel = actLevel;
        this.isSpayed = isSpayed;
        this.spNeeds = spNeeds;
        this.petOwner = petOwner;
        this.petImages = petImages;
        this.description = description;
        this.geoLocation = geoLocation;
        this.petId = petId;
        this.dateAdded = dateAdded;
        this.age = age;
        this.dbId = dbId;
    }

    setPetImagesFist(url){

        this.petImages[0] = url
    }
}


export default PetRequest;


