<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
// eslint-disable-next-line
import Firebase from "firebase";
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import db from "./db.js";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
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
$primary: #47803e;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
