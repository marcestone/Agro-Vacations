<template>
  <b-col md="3">
    <b-card
      id="cardActivity"
      :title="nameActivity"
      img-src="https://picsum.photos/600/500/?image=62"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="activityCard mb-2"
    >
      <b-card-text>
        ${{prize}}
        <br />
        <b-form-rating
          id="rating-inline"
          inline
          v-model="rating"
          variant="success"
          no-border
          size="sm"
        ></b-form-rating>
      </b-card-text>

      <a href="javascript:void(0)" class="stretched-link" v-b-modal="activityKey"></a>

      <b-modal v-bind:id="activityKey" centered size="lg">
        <template v-slot:modal-header>
          <h3>
            <strong>{{ nameActivity }}</strong>
          </h3>
        </template>
        <div class="modal-body">
          <div class="row">
            <div class="col-5">
              <b-carousel
                id="carousel-fade"
                style="text-shadow: 0px 0px 2px #000"
                fade
                indicators
                img-width="600"
                img-height="500 "
              >
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=61"></b-carousel-slide>
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=62"></b-carousel-slide>
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=63"></b-carousel-slide>
              </b-carousel>
              <br />
              <center style="color: green;">Did you take it? ¡Vote now!</center>
              <span>
                <b-form-rating v-model="ratingClient" variant="success" class="mb-2"></b-form-rating>
              </span>
            </div>
            <div class="col-7">
              <p style="text-align:justify">{{ description }}</p>
              <strong style="color: green;">$ {{ prize }}</strong>
              <p class="mt-4" style="text-align:justify">
                <i>
                  <small>Host: {{ userCreatorName }}</small>
                </i>
              </p>
              <p style="text-align:justify">
                <i>
                  <small>Publication date: {{ datePublish }}</small>
                </i>
              </p>
              <b-form-datepicker
                id="reservationDate"
                v-model="ReservationValue"
                size="sm"
                placeholder="Choose reservation date"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
                locale="en"
              ></b-form-datepicker>
            </div>
          </div>
        </div>
        <template v-slot:modal-footer="{ cancel }">
          <b-button variant="secondary" @click="cancel()">Cancel</b-button>

          <form @submit.prevent="reserve">
            <b-button variant="primary" type="submit" @click="showMsgBoxTwo">
              <b-icon icon="briefcase" type></b-icon>Reserve
            </b-button>
          </form>
        </template>
      </b-modal>
    </b-card>
  </b-col>
</template>

<script>
import * as firebase from "firebase/app";
import Firebase from "firebase";
import db from "../db.js";
import Vue from 'vue'
import { BootstrapVue} from 'bootstrap-vue'
Vue.use(BootstrapVue)
export default {
  name: "activity",
  props: [
    "client",
    "nameActivity",
    "description",
    "datePublish",
    "userCreatorName",
    "prize",
    "activityKey",
    "rating"
  ],
  data() {
    return {
      ratingClient: 1,
      boxTwo: "",
      ReservationValue: null,
      show: false,
      variants: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark"
      ],
      headerBgVariant: "primary",
      headerTextVariant: "light"
    };
  },
  methods: {
    showMsgBoxTwo() {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxOk("Data was submitted successfully", {
          title: "Confirmation",
          size: "sm",
          buttonSize: "sm",
          okVariant: "success",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true
        })
        .then(value => {
          this.boxTwo = value;
        });
    },
    reserve() {
      Firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let checkActivities;
          let unix_timestamp = this.ReservationValue;
          var date = new Date(unix_timestamp);
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
          let document;
          let activityIdentify;
          let nameReservation = this.nameActivity;
          db.collection("activities")
            .where("activityName", "==", nameReservation)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                activityIdentify = doc.id;
              });
            });
          let userName;
         // userName = db.collection("user").doc(user.uid).data();
         // console.log(userName.name);
          db.collection("user")
            .doc(user.uid)
            .get()
            .then(snapshot => {
              userName = snapshot.data().name;
              console.log(userName);
              checkActivities = snapshot.data().activitiesReserved;
              document = db.collection("activities").doc(activityIdentify);
              if (checkActivities == null) {
                /* db.collection("user")
                  .doc(user.uid)
                  .update({
                    activitiesReserved: firebase.firestore.FieldValue.arrayRemove(
                      {
                        id: "",
                        name: "",
                        reservationDate: ""
                      }
                    )
                  });*/
                document.update({
                  userClient: firebase.firestore.FieldValue.arrayRemove({
                    userId: "",
                    name: "",
                    reservationDate: ""
                  })
                });
                db.collection("user")
                  .doc(user.uid)
                  .update({
                    activitiesReserved: firebase.firestore.FieldValue.arrayUnion(
                      {
                        id: activityIdentify,
                        name: this.nameActivity,
                        reservationDate: formattedTime
                      }
                    )
                  });
                document.update({
                  userClient: firebase.firestore.FieldValue.arrayUnion({
                    userId: user.uid,
                    name: userName,
                    reservationDate: formattedTime
                  })
                });
              } else {
                db.collection("user")
                  .doc(user.uid)
                  .update({
                    activitiesReserved: firebase.firestore.FieldValue.arrayUnion(
                      {
                        id: activityIdentify,
                        name: this.nameActivity,
                        reservationDate: formattedTime
                      }
                    )
                  });
                document.update({
                  userClient: firebase.firestore.FieldValue.arrayUnion({
                    userId: user.uid,
                    name: userName,
                    reservationDate: formattedTime
                  })
                });
              }
            });
        }
      });
    }
  }
};
</script>

<style>
.activityCard {
  transition-duration: 0.2s;
  transition: box-shadow 0, 2s;
  width: 100% !important;
  height: 360px !important;
  object-fit: cover;
}
.activityCard:hover {
  box-shadow: 0px 0px 5px 1px rgba(46, 124, 1, 0.5);
}
</style>