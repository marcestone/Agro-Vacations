<template>

  <div class="wrapper">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1349"
      img-height="500"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide id="p1" img-src="../assets/bc8.jpg">
        <div class="a">
            FIND THE PERFECT <br>RURAL ACTIVITIES<br> FOR YOU
        </div>
      </b-carousel-slide>
      <b-carousel-slide id="p2" img-src="../assets/bc7.jpg">
        <div class="b">
          TO WHOM YOU APPRECIATE
        </div>
      </b-carousel-slide>
      <b-carousel-slide id="p3" img-src="../assets/bc10.jpg">
        <div class="c">
          <br>NEW EXPERIENCES <br>IN NEW PLACES
        </div>
      </b-carousel-slide>

    </b-carousel>
    <!--<b-img src="../assets/landscape1.jpg" width="1349%" height="678" aling="top"></b-img>-->
   
    <div class="box" id="boxHome">
      <b-form inline>
        <b-input
          id="InputSearchA"
          class="w-25 p-3 mb-1 h-100 d-inline-block"
          placeholder=" ✈ Search activity or destination"
        ></b-input>

        <b-form-datepicker
          id="ArriveDatePicker"
          v-model="valueA"
          :min="min"
          size="lg"
          placeholder="Arrive"
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
        ></b-form-datepicker>

        <b-input
          id="InputGuests"
          class="w-sm p-3 mb-1 h-100 d-inline-block"
          placeholder="👥 Guests"
        ></b-input>

        <b-button id="SearchBtn" variant="success" style="float: right;">
          <b-icon icon="search"></b-icon> Search
        </b-button>
      </b-form>
    </div>
    
    <div class="box" id="boxFilters">
      <h3 align="center">-------------------- Filtros --------------------</h3>
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
        <b-row >
          <div class="imageFooter">
            <b-col><b-img  src="../assets/BannerBB.png" ></b-img></b-col>
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
              
              <li><router-link to="/perfilcliente" style="color: white;">Profile</router-link></li>
              <li><router-link to="/home" style="color: white;">Activities</router-link></li>
              <li><router-link to="/logincliente" style="color: white;">Log in</router-link></li>
              <li><router-link to="/registrocliente" style="color: white;">Sign in</router-link></li>
            </ul>
          </b-col>
          <b-col>
            <div class="aList">
              Extreme<br>
              Ecological<br>
              Cultural<br>
              Familiar<br>
              Events<br>
              Rural<br>
              Lodging<br>
            </div>
          </b-col>
          <b-col>
            <b-button id= "footerButton" to="/registrocliente" v-if="!client">Publish Now</b-button>
            <b-button id= "footerButton" to="/crearactividad" v-if="client">Publish Now</b-button>
          </b-col>
        </b-row>
        <hr class="lineFooter">
        
          <div class="icons">
              <span>
                <b-img src="../assets/facebook.png" width="50%" height="auto" style="margin-right: 23px;" ></b-img>
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
        //var minutes = "0" + date.getMinutes();
        //var seconds = "0" + date.getSeconds();
        var formattedTime = "2020" + "-" + month + "-" + day;
        //let unix_timestamp1 = doc.data().dataStart;
        //var date1 = new Date(unix_timestamp1 * 1000);
        //var hours = date.getHours();
        //var day1 = date1.getDate();
        //var month1 = months[date1.getMonth()];
        //var minutes = "0" + date.getMinutes();
        //var seconds = "0" + date.getSeconds();
        //var formattedTime1 = "2020" + "-" + "05" + "-" + "03";

        //let unix_timestamp2 = doc.data().dataEnd;
        //var date2 = new Date(unix_timestamp2 * 1000);
        //var hours = date.getHours();
        //var day2 = date2.getDate();
        //ar month2 = months[date2.getMonth()];
        //var minutes = "0" + date.getMinutes();
        //var seconds = "0" + date.getSeconds();
        //var formattedTime2 = "2020" + "-" + month2 + "-" + day2;

        
        //console.log(formattedTime2);
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
          pictures: doc.data().pictures
        });
      });
      this.activitiesD = snapData;
      this.rows = this.activitiesD.length;
      this.displayActivities = this.activitiesD.slice(0, 12);
      this.paginate(this.currentPage);
    });
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth());
    minDate.setDate(minDate.getDay() + 5);

    return {
      activityD: [],
      displayActivities: [],
      currentPage: 1,
      rows: 1,
      perPage: 12,
      valueA: "",
      valueD: "",
      min: minDate
    };
  },
  methods: {
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage;
      this.displayActivities = this.activitiesD.slice(start, start + 12);
    }
    
  },
  components: {
    Activity
  }
};
</script>

<style lang="scss">
#footerButton{
  background-color: #725922;
  height: 60px;
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
  width: 120px;
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
  margin-top: 50px;
  width: 1349px;
  height: 40px;
  border-radius: 1px;
  border: 2px solid #47803e;
  border-left: transparent;
  border-right: transparent;
}
#ContainerActivities {
  margin-top: 2rem;
}
#InputGuests,
#InputSearchA {
  border-color: #e2e2e2 !important;
}
#p1,#p2,#p3 {
    width: 1349px !important;
    height: 590px !important;
    border-radius: 1px ;
}
hr.lineFooter{
  margin-top: 60px;
  border: 1px solid white;
}
ul.listF{
  color: #fff;
  font-family:'Aileron';
  font-size:18pt; 
  font-weight: 100;
  text-align: left;
  line-height: normal;
}
div.aList{
  color: #fff;
  font-family:'Aileron';
  font-size:14pt; 
  color:white;
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
div.descriptionFooter{
  font-family:'Aileron';
 font-size:16pt; 
 color:white;
 font-weight: 100;
 text-align: center;
 margin-top: 30px;
 margin-left:10px;
 line-height: normal;
}
div.imageFooter{
  margin-left: 50px;
  margin-top: 50px;
}

.flex-rectangle{
    width: 100%;
    background: #47803e;
    margin-top: 50px;
}
.flex-rectangle:before{
    content: "";
    display: block;
    padding-top: 15%;
}
#footerweb {
     background-image: url('../assets/Footer.jpg');
     background-repeat: no-repeat;
     background-size: cover;
     background-position: center;
     width: 100%;
     height: 460px;
     margin-top: 50px;
     
}
div.icons{
  text-align: center;
}
.carousel-caption{
  width: 1000px;
  height: 300px;
  margin-bottom: 220px;
  
}
</style>
