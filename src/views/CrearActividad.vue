<template>
  <div class="mainC">
    <div class="container-fluid">
      <form  id="regForm">
        <b-container id="titleContainer">
          <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"> 
          <div class="titlePublish">Publish your activity</div>
        </b-container>
        <div class="row">
          <b-container  id="area1">
          <b-row>
            <b-col>
              <b-row>
                  <input type="text" placeholder="       
                                Activity Name" id="inputName" v-model="activityName" />
                  <textarea
                    id="description"
                    rows="10"
                    cols="50"
                    placeholder="                                  
                    
                                  Activity Description"
                    v-model="description"
                  ></textarea>
              </b-row>
            </b-col>
                
            <b-col>
              <b-carousel
                id="carouselCrateA"
                style="text-shadow: 0px 0px 2px #000"
                fade
                indicators
                img-width="400 !important"
                img-height="250 !important"
              >
                <b-carousel-slide caption img-src="../assets/Fondo1.png" id="image1"></b-carousel-slide>
                <b-carousel-slide caption img-src="../assets/Fondo2.png" id="image2"></b-carousel-slide>
                <b-carousel-slide caption img-src="../assets/Fondo3.png" id="image3"></b-carousel-slide>
              </b-carousel>
              <b-row style="background:transparent;margin:5%" align-h="between">
                <b-form-file
                  id="dropImagesInput"
                  size="sm"
                  placeholder="Drop your activity images"
                  drop-placeholder="Drop the image file"
                  style="width:50%;;height:100%;margin:0 0 0 -5%"
                  @change="onSelectedFile"
                ></b-form-file>
                <b-button
                  id="addfilebutton"
                  style="margin:-2% 27% 0 0"
                  align-h="center"
                  variant="success"
                  v-on:click="addFile"
                >Upload <b-icon icon="cloud-upload" type></b-icon>
                </b-button>
              </b-row>
            </b-col>
          </b-row>
            <hr class="divisorline">
          </b-container>
          <!-------------------------------------------------- Area 2 -------------------------------------->
          <b-container id="area2">
            <div class="container">
              <b-row>
                <b-col>
                  <b-row>
                    <b-col>
                      <p 
                        style="font-size: 25px; 
                        font-weight: 700;
                        color: #01a026; 
                        text-align: center; 
                        margin:25px -20px 0px 0px"
                        >Event date</p>
                    </b-col><b-col cols="8">
                    <div id="dateRow">
                       <b-form-datepicker
                        type="time"
                        id="time1"
                        :min="min"
                        placeholder="Start Date"
                        v-model="dateStart"
                      ></b-form-datepicker>
                      <b-form-datepicker
                        type="time"
                        id="time2"
                        :min="min"
                        placeholder="End Date"
                        v-model="dateEnd"
                      ></b-form-datepicker>
                    </div>
                    </b-col>
                  </b-row>
                </b-col><b-col>
                  <b-row>
                    <b-col>
                    <p 
                      style="font-size: 25px;  
                      font-weight: 700;
                      color: #01a026;
                      margin:25px 0px 0px 0px"
                      >Enter event price</p>
                    </b-col><b-col cols="6">
                    <input
                      type="number"
                      placeholder=" 💰 Select the activity's price"
                      id="inputPrice"
                      v-model="activityPrice"
                      max="10000000"
                      min="50000"
                      step="50000"
                    />
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <br>
              <hr class="divisorline">
              <b-row>
                <b-col>
                  <p 
                  style="font-size: 25px;
                  font-weight: 700;
                  color: #ffffff;
                  margin:30px 0px 0px 63px">Enter event Type</p>
                  <!--  <input type="text" placeholder="   ☠ Activity Type" id="inputType" v-model="activityType" />-->
                  <select v-model="activityType" id="inputType">
                      <option value="Extreme">Extreme</option>
                      <option value="Ecological">Ecological</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Familiar">Familiar</option>
                      <option value="Events">Events</option>
                      <option value="Rural">Rural</option>
                      <option value="Lodging">Lodging</option>
                    </select>
                </b-col>
                
                <b-col>         
                    <p 
                    style="font-size: 25px; 
                    font-weight: 700;
                    color: #01a026;
                    margin:30px 0px 0px 115px">Transport</p>
                    <select v-model="activityTransport" id="inputTransport">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                </b-col>
                
                <b-col>
                    <p 
                    style="font-size: 25px; 
                    font-weight: 700;
                    color: #ffff;
                    margin:30px 0px 0px 20px">Enter event location</p>
                    <input type="text" placeholder="     ✈ Location" id="inputLocation" v-model="activityLocation" />
                </b-col>

              </b-row>

              <b-row>
              <section class="col-md-8">
                <div class="row justify-content-between" style="background:transparent">
                  
                </div>
              </section> 
              </b-row>
            </div>
              
            <b-row align-h="center" style="background:transparent">
              <div class="form-group text-center" id="publish">
                <button
                  id="publishbutton"
                  v-on:click="addActivity"
                  class="btn btn-success"
                  style="width:200px;height:50px; border-radius:15px"
                >Publish</button>
              </div>
            </b-row>
          </b-container>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
Vue.use(BootstrapVue);

//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  data: function() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    console.log("TEST");
    return {
      activityName: null,
      activityType: null,
      datePublish: null,
      dateStart: null,
      dateEnd: null,
      description: null,
      dateActivity: null,
      activityLocation: null,
      activityTransport: null,
      activityPrice: null,
      userCreatorName: null,
      activityRate: null,
      selectedFile: null,
      UploadValue: 0,
      picture: null,
      images: [],
      imagesLen: 0,
      imagesURL: [],
      min: minDate
    };
  },
  methods: {
    addActivity: function() {
      const info = {
        activityName: this.activityName,
        activityType: this.activityType,
        datePublish: this.datePublish,
        description: this.description,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        activityTransport: this.activityTransport,
        activityLocation: this.activityLocation,
        activityPrice: this.activityPrice
      };
      //var date = new Date(document.getElementById("time1").value);
      //var timestamp = date.getTime();

      var user = Firebase.auth().currentUser;

      if (user != null) {
        db.collection("user")
          .doc(user.uid)
          .get()
          .then(snapshot => {
            let document;
            let newActivitiesName = snapshot.data().activitiesName;

            if (newActivitiesName == null) {
              newActivitiesName = [];
            }

            document = db.collection("activities").doc();

            newActivitiesName.push({
              name: info.activityName,
              id: document.id
            });

            var actPrice = 0;

            try {
              actPrice = parseInt(info.activityPrice);
            } catch (error) {
              console.log(error);

            }            


            document.set({
              datePublish: new Date(),
              description: info.description,
              activityName: info.activityName,
              price: actPrice,
              dataStart: info.dateStart,
              dataEnd: info.dateEnd,
              activityTransport: info.activityTransport,
              activityRate: null,
              activityLocation: info.activityLocation,
              activityType: info.activityType,
              userClient: [],
              comments:[],
              userCreator: user.uid,
              userCreatorName: snapshot.data().name,
              isShowed: true,
            });

            db.collection("user")
              .doc(user.uid)
              .update({
                activitiesName: newActivitiesName
              });

            this.createFileFolder(document.id);
          })
          .then(
            this.$bvModal
              .msgBoxOk("Activity published successfully", {
                title: "Confirmation",
                size: "sm",
                buttonSize: "sm",
                okVariant: "success",
                headerClass: "p-2 border-bottom-0",
                footerClass: "p-2 border-top-0",
                centered: true
              })
              .then(() => {
                this.$router.push("home");
              })
          );
      }
    },
    onSelectedFile: function(event) {
      this.selectedFile = event.target.files[0];
    },
    addFile: function() {

      
      if (this.images.length < 3) {
        this.images.push(this.selectedFile);
        console.log(this.images);
      }else{

        this.images = this.images.slice(1, 2);
        this.images.push(this.selectedFile);
        console.log(this.images);
      }

      this.imagesLen++;

      var preview = null;

        if ( this.imagesLen % 3 == 1) {
          preview = document.getElementById("image1").querySelector("img");
        } else if ( this.imagesLen % 3 == 2) {
          preview = document.getElementById("image2").querySelector("img");
        } else if ( this.imagesLen % 3 == 0) {
          preview = document.getElementById("image3").querySelector("img");
        }

        var file = this.selectedFile;
        var reader = new FileReader();

        reader.addEventListener(
          "load",
          function() {
            preview.src = reader.result;
            preview.style.width = "600px";
            preview.style.height = "400px";
          },
          false
        );

        if (file) {
          reader.readAsDataURL(file);
        }


      console.log(this.images.length);
    },
    createFileFolder(id) {
      let arrayImages = [];

      let length = this.images.length;

      this.images.forEach(function(file) {
        var storageRef = Firebase.storage().ref();

        var path = "activities/" + id + "/activitiesImages/" + file.name;

        var task = storageRef.child(path).put(file);

        task.on("state_changed", () => {
          task.snapshot.ref.getDownloadURL().then(url => {
            arrayImages.push(url.toString());

            if (length == arrayImages.length) {
              console.log(arrayImages);

              db.collection("activities")
                .doc(id)
                .update({
                  pictures: arrayImages
                });
            }
          });
        });
        console.log(task);
      });
    }
  },
  components: {
    //FontAwesomeIcon
  }
};
</script>

<style lang="scss">
.mainC {
  height: 870px !important;
  position: relative;
  background-image: url("../assets/wallpaperCreate1.jpg");
  background-repeat: no-repeat;
  background-position: center 400px;
 
}


.areas {
  height: 100%;
  margin-top: 10px;
}
#area1 {
  width: 100%;
  height: 320px;
  //background-color: aquamarine;
  margin-top: 1.5%;
}

#titleA {
  margin: 40px 0 40px 0;
}

/*#regForm .row  {
  
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      
    ),
    url("../assets/wallpaperCreate.jpg");
  background-size: cover !important;
  background-position-y: center;
} */

.container {
  position: relative;
}

#addImage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}


#carouselCrateA{
  width: 400px;
  height: 250px;

}


#description {
  
  width: 440px;
  height: 230px;
  margin-top: 2%;
  margin-left: 13%;

}
#inputName{
  width: 350%;
  height: 60px;
  margin-right: 10%;
  margin-left: 13%;

}
#area2 {
  width: 100%;
  margin: 3% 0px 0px 7.7%;
  //background-color:#dbdbdb;
}
section {
  margin: 20px 10% 0px 10%;
  padding: 1px 0px 10px 0px;
  //background-color: #f8f9fa;
  border-radius: 2%;
  border-color: green !important;
  border-radius: 0.5rem;
}

#addfilebutton{
 border-radius: 5px;
}

#dateRow {
  background: transparent !important;  
}
#time1{
  height: 150px;
}
#dateRow div {
  background-color: #f8f9fa;
  border-color: #28a745 ;
  margin-top: 5px;
  border-radius: 0.5rem;  
}

.dateP {
  width: 40%;
  height: 10px;
}

#publish {
  margin: 40px 0px 20px 0px;
}

input,
select,
textarea {
  border-color: #28a745 !important;
  border-radius: 0.5rem;
}

#titleContainer{
  background-color: #28a745;
  height: 80px;
  max-width: 1540px !important;
}
div.titlePublish{
  font-size: 3.5rem;
  color: #f8f9fa;
  text-align: center;
  font-family: 'Lobster', cursive;
  line-height: 70px;
}
hr.divisorline{
  border: 2px solid #28a745;
}
#inputType{
  margin-top: 15px;
  margin-left: 25px;
  width: 80%;
  height:40px;
}
#inputLocation{
  margin-top: 15px;
  width: 80%;
  height:40px;
}
#inputTransport{
  width: 30%;
  height: 40px;
  margin-left: 120px;
  margin-top: 15px;
}
#inputPrice{
  margin-top: 25px;
  margin-left: -50px;
  width: 90%;
  height: 40px;
}
.carousel-fade .carousel-item {
  width: 100%;
  height: 250px !important;

}


</style>