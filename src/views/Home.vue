<template>
  <div class="wrapper">
    <b-img src="../assets/background.jpg" width="1349%" height="578" aling="top"></b-img>
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
      <b-row align-v="center" align-h="between">
        <Activity
          v-for="activity in activities"
          :key="activity.id"
          :nameActivity="activity.nameActivity"
          :description="activity.description"
          :datePublish="activity.datePublish"
          :userCreatorName="activity.userCreatorName"
          :prize="activity.prize"

        ></Activity>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import Activity from "@/components/Activity.vue";
export default {
  name: "Home",
  props: ["client", "activities"],
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth());
    minDate.setDate(minDate.getDay() + 5);

    return {
      valueA: "",
      valueD: "",
      min: minDate
    };
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
#boxFilters {
  margin-top: 2rem;
}
</style>
