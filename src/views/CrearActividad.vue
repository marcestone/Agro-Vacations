<template>
  <div class="mainC">
    <div class="container-fluid">
      <form id="regForm">
        <b-container id="titleContainer">
          <link
            href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
            rel="stylesheet"
          />
          <div class="titlePublish">Publica tu actividad</div>
        </b-container>
        <div class="row">
          <b-container id="area1">
            <b-row>
              <b-col id="decripBox" style="min-width: 20%;">
                <b-row>
                  <input
                    type="text"
                    placeholder="Nombre de la actividad "
                    id="inputName"
                    v-model="activityName"
                    required
                  />
                  <textarea
                    id="description"
                    rows="10"
                    cols="50"
                    placeholder="Descripción de la actividad"
                    v-model="description"
                    required
                  ></textarea>
                </b-row>
              </b-col>

              <b-col align="center" style="margin-top: 20px">
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
                <b-row
                  style="background:transparent; max-width: 400px; padding: 20px 5%;"
                  align-h="between"
                >
                  <b-form-file
                    id="dropImagesInput"
                    size="sm"
                    placeholder="Sube las imágenes de tu actividad"
                    drop-placeholder="Drop the image file"
                    style="width:65%;height:100%;margin:10px 0 0 0"
                    @change="onSelectedFile"
                  ></b-form-file>
                  <b-button
                    id="addfilebutton"
                    align-h="center"
                    variant="success"
                    v-on:click="addFile"
                  >
                    Cargar
                    <b-icon icon="cloud-upload" type></b-icon>
                  </b-button>
                </b-row>
              </b-col>
            </b-row>
            <hr class="divisorline" />
          </b-container>
          <!-------------------------------------------------- Area 2 -------------------------------------->
          <b-container id="area2">
            <div class="container">
              <b-row>
                <b-col cols="6">
                  <b-row>
                    <b-col id="dateCol">
                      <p
                        id="FirstTitleColumn"
                        style="font-size: 25px; 
                        font-weight: 700;
                        color: #ffff; 
                        text-align: center; 
                        margin:25px 0px 0px 0px"
                      >Fecha de la actividad</p>
                    </b-col>
                    <b-col id="dateCol2" cols="8" style="display:flex;align-items: center; align:center;">
                      <div id="dateRow">
                        <b-form-datepicker
                          type="time"
                          id="time1"
                          :min="min"
                          placeholder="Fecha de inicio"
                          v-model="dateStart"
                          style="width:100%; height:100%"
                          required
                        ></b-form-datepicker>
                        <b-form-datepicker
                          type="time"
                          id="time2"
                          :min="min"
                          placeholder="Fecha final"
                          v-model="dateEnd"
                          style="width:100%; height:100%"
                          required
                        ></b-form-datepicker>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="6">
                  <b-row>
                    <b-col id="minpricecol" cols="6"  align="center">
                      <p
                      id="FirstTitleColumn2"
                      style="font-size: 25px;  
                      font-weight: 700;
                      color: #ffff;
                      margin:25px 0px 0px 0px"
                      >Precio de la actividad</p>
                    </b-col>
                    <b-col id="minpricecol" cols="6" style="display:flex;align-items: center">
                      <input
                        type="number"
                        placeholder=" 💰 Precio"
                        id="inputPrice"
                        v-model="activityPrice"
                        max="10000000"
                        min="50000"
                        step="10000"
                        required
                      />
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <br />
              <hr class="divisorline" />
              <b-row>
                <b-col cols="4" align="center">
                  <p
                  id="divLastCol"
                  style="font-size: 25px;
                  font-weight: 650;
                  color: #ffffff;"
                  >Tipo de actividad</p>
                  <!--  <input type="text" placeholder="   ☠ Activity Type" id="inputType" v-model="activityType" />-->
                  
                </b-col>

                <b-col cols="4" align="center">
                  <p
                    id="divLastCol"
                    style="font-size: 25px; 
                    font-weight: 650;
                    color: #ffff;
                    margin:0px 0px 0px 0px"
                  >Transporte</p>
                </b-col>

                <b-col cols="4" align="center">
                  <p
                    id="divLastCol"
                    style="font-size: 25px; 
                    font-weight: 650;
                    color: #ffff;
                    margin:0px 0px 0px 0px"
                  >Ubicación</p>
                </b-col>
              </b-row>
              <b-row>
                
                <b-col cols="4" align="center">
                <select v-model="activityType" id="inputType" required>
                      <option value="Extreme">Extreme</option>
                      <option value="Ecological">Ecological</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Familiar">Familiar</option>
                      <option value="Events">Events</option>
                      <option value="Rural">Rural</option>
                      <option value="Lodging">Lodging</option>
                    </select>
                  </b-col>
                <b-col cols="4" align="center">
                  <select v-model="activityTransport" id="inputTransport" required>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </b-col>
                <b-col cols="4" align="center">
                  <input
                    required
                    type="text"
                    placeholder="     ✈ Ubicación"
                    id="inputLocation"
                    v-model="activityLocation"
                  />
                </b-col>
              </b-row>
              <b-row>
                <section class="col-md-8">
                  <div class="row justify-content-between" style="background:transparent"></div>
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
                >Publicar</button>
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

      var actPrice = 0;

            try {
              actPrice = parseInt(info.activityPrice);
            } catch (error) {
              console.log(error);

            }

      if (user != null && this.activityName != null && this.activityType != null
      && this.description != null && this.dateStart != null
      && this.dateEnd != null && this.activityTransport != null && this.activityLocation != null
      && this.activityPrice != null && !isNaN(actPrice)==true) {
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
  position: relative;
  background-image: url("../assets/wallpaperCreate1.jpg");
  background-repeat: no-repeat;
  background-position: bottom;
}

.areas {
  height: 100%;
  margin-top: 10px;
}
#area1 {
  width: 100%;
  height: 100%;
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

#carouselCrateA {
  width: 400px;
  height: 250px;
}

#description {
  width: 80%;
  height: 230px;
  margin-top: 2%;
  margin-right: 10%;
  margin-left: 10%;
}
#inputName {
  width: 80%;
  height: 60px;
  margin-right: 10%;
  margin-left: 10%;
}
#area2 {
  width: 100%;
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

#addfilebutton {
  border-radius: 5px;
}

#dateRow {
  background: transparent !important;
}
#time1 {
  height: 150px;
}
#dateRow div {
  background-color: #f8f9fa;
  border-color: #28a745;
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

#titleContainer {
  background-color: #28a745;
  height: 100%;
  max-width: 1540px !important;
}
div.titlePublish {
  font-size: 3.5rem;
  color: #f8f9fa;
  text-align: center;
  font-family: "Lobster", cursive;
  line-height: 70px;
}
hr.divisorline {
  border: 2px solid #28a745;
}
#inputType {
  margin-top: 15px;
  width: 80%;
  height: 40px;
}
#inputLocation {
  margin-top: 15px;
  width: 80%;
  height: 40px;
}
#inputTransport {
  width: 30%;
  height: 40px;
  margin-top: 15px;
}
#inputPrice {
  margin-top: 25px;
  width: 90%;
  height: 40px;
}
.carousel-fade .carousel-item {
  width: 100%;
  height: 250px !important;
}

@media all and (max-width: 450px) {
  #dateRow{
    width: 100%;
  }
  #carouselCrateA {
    width: 100%;
    min-width: 200px;
    max-width: 400px;
  }
  #carouselCrateA ol{
    padding-bottom: 30px;
  }
  #decripBox {
    min-width: 100% !important;
  }
  #inputType, #inputTransport, #inputLocation{ 
    width: 100%;
  }
  #dateCol, #dateCol2, #priceCol{
    min-width: 100%;
  }
  #inputprice{
    margin: 10px 70%;
    width: 100%;
  }
  #time1 div, #time2 div{
    min-width: 100%;
  }
  #divLastCol{
    font-size: 17px !important;
  }
  #FirstTitleColumn{
    color:#28a745 !important;
  }
  #FirstTitleColumn1{
    font-size: 20px !important;
    color:#ffff !important;
  }
  #area2 .col-6 {
    max-width: 0%;
    min-width: 100%;
  }
}
</style>