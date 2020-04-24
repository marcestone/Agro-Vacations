<template>
  <div id="app">
    <Navigation 
      :client="client"
      @logout="logout"/>
    
    <router-view 
      :client="client"
      :activities="activities"/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
// eslint-disable-next-line
import Firebase from "firebase";
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons ,BFormRating} from "bootstrap-vue";

// eslint-disable-next-line
import db from "./db.js";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component('b-form-rating', BFormRating)

export default {
  name: "app",
  data: function() {
    return {
      client: null,
      activities: []
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
        this.client = client;
      }
      db.collection("activities")
      .onSnapshot(snapshot => {
        const snapData = [];
        snapshot.forEach(doc => {
          snapData.push({
            id: doc.id,
            nameActivity: doc.data().nameActivity,
            prize: doc.data().prize
          });
        });
        this.activities = snapData;
      });
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
