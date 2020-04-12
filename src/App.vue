<template>
  <div id="app">
    <Navigation 
      :client="client"
      @logout="logout"/>
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
// eslint-disable-next-line
import Firebase from "firebase";
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
// eslint-disable-next-line
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
  methods: {
    logout: function() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.client = null;
          this.$router.push("home");
        });
    }
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(client => {
      if (client) {
        this.client = client.displayName;
      }
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
