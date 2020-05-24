<template>
  <div class="mainC">
    <div class="container-fluid">
      <div class="row" id="titleA">
        <div class="justify-content-center col-md-6">
          <div class="col-md-7">
            <h4 class="text-success font-weight-bold">Publish your activity</h4>
          </div>
        </div>
      </div>
      <form class="mt-4" id="regForm">
        <div class="row">
          <div class="justify-content-center areas col-md-6" id="area2">
            <section class="col-md-8">
              <p style="  font-weight: 700;color: #01a026;">Enter event name</p>
              <b-input type="text" placeholder="Activity Name" id="input" v-model="activityName" />
            </section>
            <section class="col-md-8">
              <p style="  font-weight: 700;color: #01a026;">Enter event Type</p>
              <b-input type="text" placeholder="Activity Type" id="input" v-model="activityType" />
            </section>
            <section class="col-md-8">
              <p style="  font-weight: 700;color: #01a026;">Enter event date</p>
              <div>
                <div class="row justify-content-between" id="dateRow">
                  <b-form-datepicker
                    type="time"
                    class="dateP col-md-5"
                    id="time1"
                    placeholder="Start Date"
                    v-model="dateStart"
                  ></b-form-datepicker>
                  <b-form-datepicker
                    type="time"
                    class="dateP col-md-5"
                    id="time2"
                    placeholder="End Date"
                    v-model="dateEnd"
                  ></b-form-datepicker>
                </div>
              </div>
            </section>
            <section class="col-md-8">
              <p style="  font-weight: 700;color: #01a026;">Enter event location</p>
              <b-input type="text" placeholder="Location" id="input" v-model="activityLocation" />
            </section>
            <section class="col-md-8">
              <div class="row justify-content-between" style="background:transparent">
                <section class="col-md-5" style="margin:0">
                  <p style="  font-weight: 700;color: #01a026;">Enter event price</p>
                  <b-input
                    type="number"
                    placeholder="Price Name"
                    id="input"
                    v-model="activityPrice"
                  />
                </section>
                <section class="col-md-5" style="margin:0">
                  <p style="  font-weight: 700;color: #01a026;">Transport</p>
                  <select v-model="activityTransport">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </section>
              </div>
            </section>
            <b-row align-h="center" style="background:transparent">
              <div class="form-group text-center" id="publish">
                <button v-on:click="addActivity" class="btn btn-success" style="width:100px;height:40px">Publish</button>
              </div>
            </b-row>
          </div>
          <div class="areas col-md-6" id="area1">
            <div class="container">
              <!--
              <img id="activityImage" placeholder="Set an image" />
              
                <button type="submit" class="btn btn-outline-success" id="addImage">+</button>
            
                <font-awesome-icon icon="star"></font-awesome-icon>
              -->

              <div>
                <b-row align-h="center" style="background:transparent">
                  <b-carousel
                  id="carousel-fade"
                  style="text-shadow: 0px 0px 2px #000"
                  fade
                  indicators
                  img-width="1000"
                  img-height="20"
                >
                  <b-carousel-slide
                    caption=""
                    img-src="../assets/landscape1.jpg"
                    id="image1"
                  >
                </b-carousel-slide>
                  <b-carousel-slide
                    caption=""
                    img-src="../assets/landscape2.jpg"
                    id="image2"
                  ></b-carousel-slide>
                  <b-carousel-slide
                    caption=""
                    img-src="../assets/landscape3.jpg"
                    id="image3"
                  ></b-carousel-slide>
                </b-carousel>
                </b-row>
              </div>
            </div>
            <b-row style="background:transparent;margin:5%" align-h="between">
              <b-form-file 
                align-h="center" 
                size="sm"
                placeholder="Drop your activity images"
                drop-placeholder="Drop the image file"
                style="width:50%;;height:100%;margin:0 5% 0 5%"
                @change="onSelectedFile"
                >
              </b-form-file>
              <b-button 
                style="margin:0 5% 0 5%" 
                align-h="center" 
                variant="success"
                v-on:click="addFile"
              >Add Image</b-button>
            </b-row>
            <textarea
              id="description"
              rows="10"
              cols="50"
              placeholder="Activity Description"
              v-model="description"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";

//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  data: function() {
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
      //picturesUrl: [],
      //UploadValue: 0
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

            document.set({
              datePublish: new Date(),
              description: info.description,
              activityName: info.activityName,
              price: parseInt(info.activityPrice),
              dataStart: new Date(info.dateStart),
              dataEnd: new Date(info.dateEnd),
              activityTransport: info.activityTransport,
              activityRate: null,
              userClient: [],
              userCreator: user.uid,
              userCreatorName: snapshot.data().name
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
    onSelectedFile: function(event){
      this.selectedFile = event.target.files[0];
    },
    addFile: function(){

      this.images.push(this.selectedFile);

      if(this.images.length <= 3){
        var preview = null;
        if(this.images.length == 1){
          preview = document.getElementById("image1").querySelector('img');
        }else if(this.images.length == 2){
          preview = document.getElementById("image2").querySelector('img'); 
        }else if(this.images.length == 3){
          preview = document.getElementById("image3").querySelector('img');     
        }

        var file = this.selectedFile;
        var reader = new FileReader();

        reader.addEventListener("load", function () {
          preview.src = reader.result;
          preview.style.width = "600px";
          preview.style.height = "400px";
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      }

      console.log(this.images.length);
    },
    createFileFolder(id){
      
      this.images.forEach(function(file){

        var storageRef = Firebase.storage().ref();

        var path = 'activities/' + id + "/activitiesImages/" + file.name; 

        var task = storageRef.child(path).put(file);  
        /* 
        task.on('state_changed',snapshot=>{
          let percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          this.UploadValue = percentage; 
        }, error=>{console.log(error.message)},
          ()=>{this.UploadValue==100;
              task.snapshot.ref.getDownloadURL().then((url)=>{
                this.picture = url;
              });
            }); */
        console.log(task);
      }); 
      //console.log(this.picture);
    }
  },
  components: {
    //FontAwesomeIcon
  }
};
</script>

<style lang="scss">
.mainC {
  height: 700px !important;
  position: relative;
}

.areas {
  height: 100%;
  margin-top: 10px;
}
#area1 {
  width: 65%;
  margin: 3% 0px 3% 0px;
}

#titleA {
  margin: 40px 0 40px 0;
}

#regForm .row {
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("../assets/travel.jpg");
  background-size: cover !important;
  background-position-y: center;
}

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

.carousel-inner {
  border-radius: 20px;
}
#description {
  width: 80%;
  height: 130px;
  margin: 20px 10% 20px 10%;
}
#area2 {
  width: 25%;
  margin: 3% 0px 3% 0px;
}
section {
  margin: 20px 10% 0px 10%;
  padding: 1px 0px 10px 0px;
  //background-color: #f8f9fa;
  border-radius: 2%;
  border-color: green !important;
  border-radius: 0.5rem;
}

input {
  width: 80%;
}

#dateRow {
  margin: 0px 10px 0px 0px;
  background: transparent !important;
}

#dateRow div {
  background-color: #f8f9fa;
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
</style>