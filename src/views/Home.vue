<template>
  <div class="wrapper">
    <div class="bg-img">
      <form  class="containerFilterBox">
        <h2>Encuentra tus actividades</h2>
        
        <input
          type="text"
          placeholder=" ✈ Buscar por título"
          v-model="keyWordFilter"
        >

        <input
          type="text"
          placeholder="📍Ubicación"
          v-model="locationFilter"
        >

        <b-select v-model="typeFilter" id="Inputtypefilter">
          <option value="" disabled selected>Tipo</option>
          <option value="">Cualquiera</option>
          <option value="Extreme">Extreme</option>
          <option value="Ecological">Ecological</option>
          <option value="Cultural">Cultural</option>
          <option value="Familiar">Familiar</option>
          <option value="Events">Events</option>
          <option value="Rural">Rural</option>
          <option value="Lodging">Lodging</option>
        </b-select>

        <button class="btnSearch1" v-on:click="search">
          <b-icon icon="search"></b-icon> Buscar
        </button>

      </form>
    </div>

    <!--<b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      background="#ababab"
      img-width="1349"
      img-height="500"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide id="p1" img-src="../assets/bc8.jpg">
        <div class="a">
          FIND THE PERFECT
          <br />RURAL ACTIVITIES
          <br />FOR YOU
        </div>
      </b-carousel-slide>
      <b-carousel-slide id="p2" img-src="../assets/bc7.jpg">
        <div class="b">TO WHOM YOU APPRECIATE</div>
      </b-carousel-slide>
      <b-carousel-slide id="p3" img-src="../assets/bc10.jpg">
        <div class="c">

          <br>NEW EXPERIENCES <br>IN NEW PLACES

        </div>
      </b-carousel-slide>
    </b-carousel>

    <div class="box" id="boxHome">
      <b-form inline>
        <input
          id="InputSearchA"
          class="w-25 p-3 mb-1 h-100 d-inline-block"
          placeholder=" ✈ Buscar por título"
          v-model="keyWordFilter"
        >

        <input
          id="InputGuests"
          class="w-20 p-3 mb-1 h-100 d-inline-block"
          placeholder="📍Ubicación"
          v-model="locationFilter"
        >

      
        <b-select v-model="typeFilter" id="Inputtypefilter">
          <option value="" disabled selected>Tipo</option>
          <option value="">Cualquiera</option>
          <option value="Extreme">Extreme</option>
          <option value="Ecological">Ecological</option>
          <option value="Cultural">Cultural</option>
          <option value="Familiar">Familiar</option>
          <option value="Events">Events</option>
          <option value="Rural">Rural</option>
          <option value="Lodging">Lodging</option>
        </b-select>
      

        <b-form-datepicker
          id="ArriveDatePicker"
          v-model="dateFilter"
          :min="min"
          size="lg"
          placeholder="Fecha"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }"
          locale="en"
        ></b-form-datepicker>

        <b-form-datepicker
          id="DepartDatePicker"
          v-model="valueD"
          :min="min"
          size="lg"
          placeholder="Depart"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }"
          locale="en"
    ></b-form-datepicker>-->

    <!-- <b-input
          id="InputGuests"
          class="w-sm p-3 mb-1 h-100 d-inline-block"
          placeholder="👥 Guests"
    ></b-input>-->

    <!--    <button id="SearchBtn" variant="success" style="float: right;" v-on:click="search">
          <b-icon icon="search"></b-icon> Buscar

        </button>
      </b-form>
    </div>-->
    <b-container id="containerimages">
      
      <b-row id="rowImages">
        <ImageFilter picture="https://i.ibb.co/2Nt5kYT/Ecological.png" type="Ecological"></ImageFilter>
        <ImageFilter picture="https://i.ibb.co/6m48CJT/Extreme.png" type="Extreme"></ImageFilter>
        <ImageFilter picture="https://i.ibb.co/W3FNM1B/Cultural.png" type="Cultural"></ImageFilter>
        <ImageFilter picture="https://i.ibb.co/LRPfYzx/Familiar.png" type="Familiar"></ImageFilter>
      </b-row>

    </b-container>
    <div class="box" id="boxFilters">
      <!-- <h3 align="center">-------------------- Filtros --------------------</h3>-->

      <b-form inline style="margin-top:1%; margin-bottom:1%;">
        <!-- <b-input
          id="InputSearchA"
          class="w-25 p-3 mb-1 h-100 d-inline-block"
          placeholder=" ✈ Search activity or destination"
          v-model="keyWordFilter"
        ></b-input>-->

        <!--   <b-form-datepicker
          id="ArriveDatePicker"
          v-model="dateFilter"
          :min="min"
          size="lg"
          placeholder="Arrive"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }"
          locale="en"
        ></b-form-datepicker>-->

        <h5 style="margin-left: 6%; margin-right: 2%;  color: green;">
          <strong>Precio:</strong>
        </h5>
        <select v-model="priceFilter">
          <option disabled selected>Precio</option>
          <option value="0">Cualquiera</option>
          <option value="100000">$0 - $100.000</option>
          <option value="200000">$100.000 - $200.000</option>
          <option value="300000">$200.000 - $300.000</option>
          <option value="400000">$300.000 - $400.000</option>
          <option value="500000">$400.000 - $500.000</option>
          <option value="500001">más de 500.000</option>
        </select>

        <!-- <b-input
          id="InputGuests"
          class="w-sm p-3 mb-1 h-100 d-inline-block"
          placeholder="👥 Local"
          v-model="locationFilter"
        ></b-input>-->

        <!--   <b-input
          id="InputType"
          class="w-sm p-3 mb-1 h-100 d-inline-block"
          placeholder="Tipo"
          v-model="typeFilter"
        ></b-input>-->

        <h5 style="margin-left: 3%; margin-right: 2%;  color: green;">
          <strong>Transporte:</strong>
        </h5>
        <select v-model="transportFilter">
          <option disabled selected>Transporte</option>
          <option value="-1">Cualquiera</option>
          <option value="Yes">Si</option>
          <option value="No">No</option>
        </select>


        <h5 style="margin-left: 3%; margin-right: 2%;  color: green;"><strong>Calificación: </strong></h5>
        <select
          id="RatingStart"  
          v-model="ratingFilterStart">
          <option disabled selected>Calificación</option>
          <option value="-1">Cualquiera</option>
          <option value="1">1 ★</option>
          <option value="2">2 ★</option>
          <option value="3">3 ★</option>
          <option value="4">4 ★</option>
          <option value="5">5 ★</option>
        </select>



        
        <b-form-datepicker
          style="margin-bottom:1%; width: auto;"
          id="ArriveDatePicker"
          v-model="dateFilter"
          :min="min"
          size="lg"
          placeholder="Fecha"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }"
          locale="en"
        ></b-form-datepicker>

        <b-button id="buttonSize" variant="success" style="margin-left: 2%; " v-on:click="search">
          <b-icon icon="search"></b-icon>Añadir filtro
        </b-button>
      </b-form>
    </div>
    <b-container id="ContainerActivities">
      <b-row align-v="center" align-h="start">
        <Activity
          v-for="activity in displayActivities"
          :key="activity.id"
          :activityKey="activity.id"
          :nameActivity="activity.nameActivity"
          :description="activity.description"
          :datePublish="activity.datePublish"
          :dataStart="activity.dataStart"
          :dataEnd="activity.dataEnd"
          :userCreator="activity.userCreator"
          :userCreatorName="activity.userCreatorName"
          :prize="activity.prize"
          :rating="activity.rating"
          :pictures="activity.pictures"
          :comments="activity.comments"
          :userClient="activity.userClient"
          :currentDate="currentDate"
          :activityLocation="activity.activityLocation"
        ></Activity>
      </b-row>
      <b-pagination
        v-model="currentPage"
        pills
        :total-rows="rows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        align="center"
        @input="paginate(currentPage)"
      ></b-pagination>
    </b-container>

    <b-container fluid id="footerweb">
      <b-row>
        <div class="imageFooter">
          <b-col>
            <b-img style="max-width: 250px;" src="../assets/BannerBB.png"></b-img>
          </b-col>
        </div>
      </b-row>
      <b-row>
          <div class="descriptionFooter">
            <b-col>Plan, Search and find perfect activities for you and yours<br> 
            in the best locations, Agrovacations allows you to <br>
            publish your activities and contact those who wish<br> 
            to take them Live a new experience, <br>meet and receive an extra income.</b-col>
          </div>
        <b-col>
          <ul class="listF">
            <li>
              <router-link to="/perfilcliente" style="color: white;">Profile</router-link>
            </li>
            <li>
              <router-link to="/home" style="color: white;">Activities</router-link>
            </li>
            <li>
              <router-link to="/logincliente" style="color: white;">Log in</router-link>
            </li>
            <li>
              <router-link to="/registrocliente" style="color: white;">Sign in</router-link>
            </li>
          </ul>
        </b-col>
        <b-col>
            <div class="aList">
              Extreme<br>
              Ecological<br>
              Cultural<br>
              Familiar<br>
              Rural<br>
            </div>
        </b-col>
        <b-col>
          <b-button id="footerButton" to="/registrocliente" v-if="!client">Publish Now</b-button>
          <b-button id="footerButton" to="/crearactividad" v-if="client">Publish Now</b-button>
        </b-col>
      </b-row>
      <hr class="lineFooter" />

      <div class="icons">
        <span>
          <b-img src="../assets/facebook.png" width="50%" height="auto" style="margin-right: 23px;"></b-img>
          <b-img src="../assets/twitter.png" width="50%" height="auto" style="margin-right: 23px;"></b-img>
          <b-img src="../assets/youtube.png" width="50%" height="auto" style="margin-right: 23px;"></b-img>
          <b-img src="../assets/linkedin.png" width="50%" height="auto" style="margin-right: 23px;"></b-img>
        </span>
      </div>
    </b-container>
  </div>
</template>

<script>
import db from "../db.js";
//import firebase from "firebase";
import Activity from "@/components/Activity.vue";
import ImageFilter from "@/components/ImageFilter.vue";
export default {
  name: "Home",
  props: ["client", "activities"],
  mounted() {
    
    db.collection("activities").onSnapshot(snapshot => {
      const snapData = [];
      snapshot.forEach(doc => {
        let unix_timestamp = doc.data().datePublish;
        var date = new Date(unix_timestamp * 1000);
        //var hours = date.getHours();
        var day = date.getDate();
        var months = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12"
        ];
        var month = months[date.getMonth()];
        var formattedTime = "2020" + "-" + month + "-" + day;
        if (doc.data().isShowed == true) {
          if (new Date(doc.data().dataEnd).getTime() > Date.now()) {
            snapData.push({
              id: doc.id,
              description: doc.data().description,
              userCreator: doc.data().userCreator,
              userCreatorName: doc.data().userCreatorName,
              datePublish: formattedTime,
              dataStart: doc.data().dataStart,
              dataEnd: doc.data().dataEnd,
              nameActivity: doc.data().activityName,
              prize: doc.data().price,
              rating: doc.data().activityRate,
              pictures: doc.data().pictures,
              comments: doc.data().comments,
              userClient: doc.data().userClient,
              activityLocation: doc.data().activityLocation
            });
          }
        }
      });
      this.activitiesD = snapData;
      this.rows = this.activitiesD.length;
      this.displayActivities = this.activitiesD.slice(0, 12);
      this.paginate(this.currentPage);
    });
  },
  data() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = now.getFullYear();
    const cD = mm + "/" + dd + "/" + yyyy;
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth());
    //minDate.setDate(minDate.getDay() + 5);
    minDate.setDate(minDate.getDay());

    return {
      activityD: [],
      displayActivities: [],
      currentPage: 1,
      rows: 1,
      perPage: 12,

      valueA: "",
      valueD: "",

      min: minDate,
      currentDate: cD,

      priceFilter: "",
      locationFilter: "",
      keyWordFilter: "",
      dateFilter: "",

      typeFilter: "",
      transportFilter: "",
      ratingFilterStart: "",
      ratingFilterEnd: ""
    };
  },
  methods: {
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage;
      this.displayActivities = this.activitiesD.slice(start, start + 12);
    },
    search() {
      db.collection("activities").onSnapshot(snapshot => {
        const snapData = [];
        snapshot.forEach(doc => {
          console.log(doc.data().activityLocation);
          if (
            (this.keyWordFilter == "" ||
              (this.keyWordFilter != "" &&
                doc
                  .data()
                  .activityName.toLowerCase()
                  .includes(this.keyWordFilter.toLowerCase()))) &&
            (this.dateFilter == "" ||
              (this.dateFilter != "" &&
                Math.round(new Date(this.dateFilter).getTime() / 1000) >=
                  Math.round(new Date(doc.data().dataStart).getTime() / 1000) &&
                Math.round(new Date(this.dateFilter).getTime() / 1000) <=
                  Math.round(new Date(doc.data().dataEnd).getTime() / 1000))) &&
            (this.priceFilter == "" ||
              (this.priceFilter != "" &&
                (parseInt(this.priceFilter, 10) == 0 ||
                  (parseInt(this.priceFilter, 10) != 500001 &&
                    doc.data().price <= parseInt(this.priceFilter, 10) &&
                    doc.data().price >=
                      parseInt(this.priceFilter, 10) - 100000) ||
                  (parseInt(this.priceFilter, 10) == 500001 &&
                    parseInt(this.priceFilter, 10) <= doc.data().price)))) &&
            (this.locationFilter == "" ||
              (this.locationFilter != "" &&
                doc
                  .data()
                  .activityLocation.toLowerCase()
                  .includes(this.locationFilter.toLowerCase()))) &&
            (this.typeFilter == "" ||
              (this.typeFilter != "" &&
                doc
                  .data()
                  .activityType.toLowerCase()
                  .localeCompare(this.typeFilter.toLowerCase()) == 0)) &&
            (this.transportFilter == "" ||
              (this.transportFilter != "" &&
                ((this.transportFilter != -1 &&
                  doc
                    .data()
                    .activityTransport.toLowerCase()
                    .localeCompare(this.transportFilter.toLowerCase()) == 0) ||
                  this.transportFilter == -1))) &&
            ((this.ratingFilterStart == "" && this.ratingFilterEnd == "") ||
              (this.ratingFilterStart == "" &&
                this.ratingFilterEnd != "" &&
                doc.data().activityRate <= parseInt(this.ratingFilterEnd, 0)) ||
              (this.ratingFilterStart != "" &&
                ((this.ratingFilterEnd == "" &&
                  parseInt(this.ratingFilterStart, 0) <=
                    doc.data().activityRate) ||
                  (this.ratingFilterEnd != "" &&
                    parseInt(this.ratingFilterStart, 0) <=
                      doc.data().activityRate &&
                    doc.data().activityRate <=
                      parseInt(this.ratingFilterEnd, 0)))))
          ) {
            //console.log("TEEEEEEEESTTTTTTTTT")
            let unix_timestamp = doc.data().datePublish;
            var date = new Date(unix_timestamp * 1000);
            var day = date.getDate();
            var months = [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12"
            ];
            var month = months[date.getMonth()];
            var formattedTime = "2020" + "-" + month + "-" + day;
            if (doc.data().isShowed == true) {
              if (new Date(doc.data().dataEnd).getTime() > Date.now()) {
                snapData.push({
                  id: doc.id,
                  description: doc.data().description,
                  userCreator: doc.data().userCreator,
                  userCreatorName: doc.data().userCreatorName,
                  datePublish: formattedTime,
                  dataStart: doc.data().dataStart,
                  dataEnd: doc.data().dataEnd,
                  nameActivity: doc.data().activityName,
                  prize: doc.data().price,
                  rating: doc.data().activityRate,
                  pictures: doc.data().pictures,
                  comments: doc.data().comments,
                  userClient: doc.data().userClient,
                  activityLocation: doc.data().activityLocation
                });
              }
            }
          }
        });
        console.log(snapData.length);
        this.activitiesD = snapData;
        this.rows = this.activitiesD.length;
        this.displayActivities = this.activitiesD.slice(0, 12);
        this.paginate(this.currentPage);
      });
    }
  },
  components: {
    Activity,
    ImageFilter
  }
};
</script>

<style lang="scss">

@media all and (max-width: 1200px) {
  #buttonSize {
    margin-left: 2%; 
    margin-top: 2%;
  }
}
#footerButton {
  background-color: #725922;
  height: 50px;
  width: 250px;
  font-size: 20px;
  margin-right: 100px;
  margin-left: 80px;
  display: inline-block;
  border-color: #755f2e;
  border-radius: 10px;
  line-height: 40px;
}

#InputSearchA {
  width: 320px !important;
  margin-top: 17px;
  margin-left: 15px;
}
#InputGuests {
  margin-top: 17px;
  margin-left: 15px;
  height: 60px;
  width: 140px;
}
#Inputtypefilter{
  width: 100%;
  height: 50%;
  border-color: #d8d8d8 !important;
  border-radius: 5px !important;
  margin-top: 1%;
  margin-bottom: 5%;
}
.form-control-lg {
  font-size: 1rem;
  margin-left: 15px;
  margin-top: 13px;
}
.b-form-btn-label-control > label.form-control-lg {
  min-height: calc(calc(1.5em + 1rem + 2px) - 2px);
  width: 115px;
}
#SearchBtn {
  height: 60px;
  width: 140px;
  border-radius: 35px;
  margin-top: 13px;
  margin-left: 20px;
  background-color: green;
  color: white;
}

#SearchBtn:hover {
  background-color: #47803e;
}

.wrapper {
  position: relative;
}

#boxHome {
  position: absolute;
  top: 340px;
  left: 175px;
  width: 1030px;
  height: 90px;
  border-radius: 5px;
  border: 2px solid #f5f4f3;
  background-color: #f5f4f3;
}
#boxFilters {
  margin-top: 3%;
  //width: 1349px;
  //height: 40px;
  border-radius: 1px;
  background-color: whitesmoke;
}
#ContainerActivities {
  margin-top: 2rem;
}
#InputGuests,
#InputSearchA {
  border-color: #e2e2e2 !important;
}
#p1,
#p2,
#p3 {
  width: 1349px !important;
  height: 590px !important;
  border-radius: 1px;
}
hr.lineFooter {
  margin-top: 60px;
  border: 1px solid white;
}
ul.listF {
  color: #fff;
  font-family: "Aileron";
  font-size: 100%;
  font-weight: 100;
  text-align: left;
  line-height: normal;
}
div.aList {
  color: #fff;
  font-family: "Aileron";
  font-size: 100%;
  color: white;
  font-weight: 100;
  text-align: left;
}
div.a {
  text-align: left;
  margin-bottom: 250px;
  font-size: 70px;
  line-height: 100%;
}
div.b {
  text-align: center;
  margin-bottom: 350px;
  font-size: 80px;
  line-height: 100%;
}
div.b {
  text-align: center;
  margin-bottom: 350px;
  font-size: 80px;
  line-height: 100%;
}
div.c {
  text-align: right;
  margin-bottom: 220px;
  font-size: 60px;
  text-shadow: 1px 2px 1px rgb(0, 0, 0);
}

div.descriptionFooter {
  font-family: "Aileron";
  font-size: 100%;
  color: white;
  font-weight: 100;
  text-align: center;
  margin-top: 30px;
  margin-left: 10px;
  line-height: normal;
}
div.imageFooter {
  margin-left: 50px;
  margin-top: 50px;
 
}

.flex-rectangle {
  width: 100%;
  background: #47803e;
  margin-top: 50px;
}
.flex-rectangle:before {
  content: "";
  display: block;
  padding-top: 15%;
}
#footerweb {
  background-image: url("../assets/Footer.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 460px;
  margin-top: 50px;
}
div.icons {
  text-align: center;
}
.carousel-caption {
  width: 1000px;
  height: 300px;
  margin-bottom: 220px;
}
#containerimages {
  width: 80%;
  height: 100%;
  background-color: #eeeeee;
  margin-top: -30px;
  box-shadow: 0px 3px 5px #ccc;
  border-radius: 5px;
}




* {
  box-sizing: border-box;
}

.bg-img {
  /* The image used */
  background-image: url("../assets/bc8.jpg");

  /* Control the height of the image */
  min-height: 600px;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

/* Add styles to the form container */
.containerFilterBox {
  position: absolute;
  right: 0;
  margin: 40px;
  max-width: 300px;
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
  input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}



/* Set a style for the submit button */
.btnSearch1 {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.btn:hover {
  opacity: 1;
}


</style>