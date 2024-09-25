class User {
  //  constructor(email) {
  //      this.email=email;
    
   // }

    constructor(name, isAdopter, description, phone, email, location, profileImage, geoLocation, id){

        if(!isEmptyString(name)){
            this.name=name;
        }

        if(isAdopter!=null){
            this.isAdopter=isAdopter;
        }

        if(!isEmptyString(description)){
            this.description=description;
        }
        if(phone!=null){
            this.phone=phone;
        }

        if(!isEmptyString(email)){
            this.email=email;
        }

        //if(!isEmptyString(location)){
            this.location=location;
        //}
        if(!isEmptyString(profileImage)){
            this.profileImage=profileImage;
        }

        this.geoLocation = geoLocation;

        this.id = id;

    }

}

function isEmptyString(str) {
    if ((str !== undefined) && (str !== null) && (str !== "")) {
            return false;
    }
    else{
        return true;
    }
}

export default User;


