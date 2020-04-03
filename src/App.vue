<template>
  <div id="app">
    <Navigation/>
    <router-view class="container" />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
// eslint-disable-next-line
import Firebase from "firebase";
import db from "./db.js";

export default {
  name: "App",
  data: function() {
    return {
      client: null
    };
  },
  mounted() {
    db.collection("client")
      .doc("PZXYLuSsZyL87X5fYh9c")
      .get()
      .then(snapshot => {
        this.client = snapshot.data().lastName;
      });
  },

  components: {
    Navigation
  }  
};
</script>

<style lang="scss">
$primary:#61b254;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
