<template>
  <div class="wrapper">
    <b-img src="../assets/background1.png" width="1349%" height="678" aling="top"></b-img>
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
  </div>
</template>

<script>
import db from "../db.js";
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
          rating: doc.data().activityRate
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
  height: 40px;
  width: 100px;
  border-radius: 35px;
  margin-top: 13px;
  margin-left: 15px;
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
</style>
