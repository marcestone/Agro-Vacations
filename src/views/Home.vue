<template>
  <div class="wrapper">
    <b-img
      src="../assets/background.jpg"
      width="1366"
      height="578"
      aling="top"
    ></b-img>
    <div class="box" id="boxHome">
      <b-form inline>
        <b-input
          id="InputSearchA"
          class="w-25 p-3 mb-1 h-100 d-inline-block "
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
          class="w-sm p-3 mb-1 h-100 d-inline-block "
          placeholder="👥 Guests"
        ></b-input>

        <b-button id="SearchBtn" variant="success" style="float: right;"
          ><b-icon icon="search"></b-icon> Search</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
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
  }
};
</script>

<style lang="scss">
#InputSearchA {
  width: 320px !important;
  margin-top: 13px;
  margin-left: 15px;
}
#InputGuests {
  margin-top: 13px;
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
  width: 130px;
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
  left: 183px;
  width: 1000px;
  height: 90px;
  border-radius: 5px;
  border: 2px solid #f5f4f3;
  background-color: #f5f4f3;
}
</style>
