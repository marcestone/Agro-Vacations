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
          NEW EXPERIENCES
          <br />IN NEW PLACES
        </div>
      </b-carousel-slide>
    </b-carousel>
    <!--<b-img src="../assets/background1.png" width="1349%" height="678" aling="top"></b-img>-->
    <!-- <img id="myimg"/>-->
    <!--
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
          <b-icon icon="search"></b-icon>Search
        </b-button>
      </b-form>
    </div>
    -->
    <div class="box" id="boxFilters">
      <h3 align="center">-------------------- Filtros --------------------</h3>
      <b-form inline>
        <b-input
          id="InputSearchA"
          class="w-25 p-3 mb-1 h-100 d-inline-block"
          placeholder=" ✈ Search activity or destination"
          v-model="keyWordFilter"
        ></b-input>

        <b-form-datepicker
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
        ></b-form-datepicker>

        <select v-model="priceFilter">
          <option disabled selected>Precio</option>
          <option value="0">Cualquiera</option>
          <option value="100000">$0 - $100.000</option>
          <option value="200000">$100.000 - $200.000</option>
          <option value="300000">$200.000 - $300.000</option>
          <option value="400000">$300.000 - $400.000</option>
          <option value="500000">$400.000 - $500.000</option>
          <option value="600001">más de 500.000</option>
        </select>

        <b-input
          id="InputGuests"
          class="w-sm p-3 mb-1 h-100 d-inline-block"
          placeholder="👥 Local"
          v-model="locationFilter"
        ></b-input>

        <b-input
          id="InputType"
          class="w-sm p-3 mb-1 h-100 d-inline-block"
          placeholder="Tipo"
          v-model="typeFilter"
        ></b-input>

        <select v-model="transportFilter">
          <option disabled selected>Transporte</option>
          <option value="-1">Cualquiera</option>
          <option value="Yes">Si</option>
          <option value="No">No</option>
        </select>

        <b-input
          id="RatingStart"
          class="w-sm p-3 mb-1 h-100 d-inline-block"
          placeholder="Rating minimo"
          v-model="ratingFilterStart"
        ></b-input>

        <b-input
          id="RatingEnd"
          class="w-sm p-3 mb-1 h-100 d-inline-block"
          placeholder="Rating minimo"
          v-model="ratingFilterEnd"
        ></b-input>

        <b-button id="SearchBtn" variant="success" style="float: right;" v-on:click="search">
          <b-icon icon="search"></b-icon>Search
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
    <div class="flex-rectangle"></div>
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
      //nameA: "",
      valueA: "",
      valueD: "",
      //guest: "",
      min: minDate,

      priceFilter: "",
      locationFilter:"",
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
          console.log(doc.data().activityLocation) 
          if(((this.keyWordFilter == "") || (this.keyWordFilter != "" && doc.data().activityName.toLowerCase().includes(this.keyWordFilter.toLowerCase())))
             && ((this.dateFilter == "") || (this.dateFilter != "" && (Math.round(new Date(this.dateFilter).getTime()/1000)>=Math.round(new Date(doc.data().dataStart).getTime()/1000) && Math.round(new Date(this.dateFilter).getTime()/1000)<=Math.round(new Date(doc.data().dataEnd).getTime()/1000)) ))
             && ((this.priceFilter == "") || (this.priceFilter != "" && 
                      ((parseInt(this.priceFilter, 10) == 0)
                      ||(parseInt(this.priceFilter, 10) != 600001 && doc.data().price <= parseInt(this.priceFilter, 10) && doc.data().price >= parseInt(this.priceFilter, 10)-100000)
                      ||(parseInt(this.priceFilter, 10) == 600001 && parseInt(this.priceFilter, 10) <= doc.data().price))
                      ))
             && ((this.locationFilter == "") || (this.locationFilter != "" && doc.data().activityLocation.toLowerCase().includes(this.locationFilter.toLowerCase()))) 
             && ((this.typeFilter == "") || (this.typeFilter != "" && doc.data().activityType.toLowerCase().localeCompare(this.typeFilter.toLowerCase()) == 0))
             && ((this.transportFilter == "") || (this.transportFilter != "" && 
                      ((this.transportFilter != -1 && doc.data().activityTransport.toLowerCase().localeCompare(this.transportFilter.toLowerCase()) == 0)
                      ||(this.transportFilter == -1))
                      ))
             && ((this.ratingFilterStart == "" && this.ratingFilterEnd == "") || (this.ratingFilterStart == "" && this.ratingFilterEnd != "" && doc.data().activityRate <= parseInt(this.ratingFilterEnd,0)) || (this.ratingFilterStart != "" && 
                      ((this.ratingFilterEnd == "" &&  parseInt(this.ratingFilterStart,0) <= doc.data().activityRate) 
                      ||(this.ratingFilterEnd != "" &&  parseInt(this.ratingFilterStart,0) <= doc.data().activityRate && doc.data().activityRate <= parseInt(this.ratingFilterEnd,0)))) )
             )
              {
                
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
    Activity
  }
};
</script>

<style lang="scss">
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
  //width: 1349px;
  //height: 40px;
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
#p1,
#p2,
#p3 {
  width: 1349px !important;
  height: 590px !important;
  border-radius: 1px;
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
.flex-rectangle {
  width: 100%;
  background: #47803e;
  margin-top: 50px;
}
.flex-rectangle:before {
  content: "";
  display: block;
  padding-top: 20%;
}

.carousel-caption{
  width: 1000px;
  height: 200px;
  margin-bottom: 320px;
  
}
</style>