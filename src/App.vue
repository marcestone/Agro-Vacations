<template>
  <div id="app">
    <Navigation :client="client" @logout="logout" />
    <router-view :client="client" :activities="activities" />
  </div>
</template>

<script>
// eslint-disable-next-line
import db from "./db.js";
import Navigation from "@/components/Navigation.vue";
// eslint-disable-next-line
import Firebase from "firebase";

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
      // no se está usando Principio
      db.collection("activities").onSnapshot(snapshot => {
        const snapData = [];
        snapshot.forEach(doc => {
          let unix_timestamp = doc.data().datePublish;
          var date = new Date(unix_timestamp * 1000);
          var hours = date.getHours();
          var day = date.getDate() + 1;
          var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
          var month = months[date.getMonth()];
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          var formattedTime =
            month +
            " " +
            day +
            " at " +
            hours +
            ":" +
            minutes.substr(-2) +
            ":" +
            seconds.substr(-2);

          snapData.push({
            id: doc.id,
            description: doc.data().description,
            userCreatorName: doc.data().userCreatorName,
            datePublish: formattedTime,
            nameActivity: doc.data().activityName,
            prize: doc.data().price
          });
        });
        this.activities = snapData;
      });
      // No se esta usando FIN
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
