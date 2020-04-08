<template>

  
  <div class="wrapper">
    <b-img src="../assets/landscape.jpg" width="1366" height="559" aling="top" ></b-img>
    <div class="box">

      <b-form inline>

        <b-input
        id="InputSearchA"
        class="w-25 p-3 mb-1 h-100 d-inline-block "
        placeholder="Search activity or destination"
        ></b-input>

        <b-form-datepicker
          id="ArriveDatePicker" 
          v-model="valueA" :min="min"
          size="lg"
          placeholder="Arrive"
          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
          locale="en"
        ></b-form-datepicker>

        <b-form-datepicker
          id="DepartDatePicker"
          v-model="valueD" :min="min"
          size="lg"
          placeholder="Depart"
          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
          locale="en"
        ></b-form-datepicker>

        <b-input
        id="InputGuests"
        class="w-sm p-3 mb-1 h-100 d-inline-block "
        placeholder="Guests"
        ></b-input>

        <b-button id="SearchBtn" variant="success"><b-icon icon="search"></b-icon> Search</b-button>

      </b-form>

    </div>
  </div>
    
 

</template>

<script>

export default {
  
  name: "Home",
  data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th two months prior
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth())
      minDate.setDate(minDate.getDay()+5)
      

      return {
        valueA: '',
        valueD: '',
        min: minDate
      }
    }
};
</script>




<style lang="scss">
#SearchBtn {
  height: 60px;
  width: 150px;
  border-radius: 35px;
  margin-top: 13px;

  }
/*input, button, select, optgroup, textarea {
    margin: 15px;
}*/
.wrapper {
    position:relative;
}

.box {
    position:absolute;
    top:340px;
    left:183px;
    width:1000px;
    height:90px;
    border-radius: 5px;
    border:2px solid #f5f4f3;
    background-color: #f5f4f3;
}

</style>

