/** Falta modificar el calendario para que otras personas no puedan reservar los
dias que ya estan ocupados */

<template>
  <b-col md="3">
    <b-card
      id="cardActivity"
      :title="nameActivity"
      body-class="text-center"
      :img-src="picture1"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="activityCard mb-2"
      footer-tag="footer"
    >
      <b-card-text>
        <h5>
          <strong style="color: green;">$ {{ parseInt(prize).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')   }}</strong>
          <br />
        </h5>
      </b-card-text>
      <template v-slot:footer>
        <b-form-rating
          id="rating-inline"
          inline
          v-model="rating"
          variant="warning"
          no-border
          size="sm"

        ></b-form-rating>
        {{nComments}}
         <b-icon icon="chat-dots"></b-icon>
      </template>
      <a href="javascript:void(0)" class="stretched-link" v-b-modal="activityKey"></a>
      <b-modal v-bind:id="activityKey" centered size="lg">
        <template v-slot:modal-header>
          <h3>
            <strong>{{ nameActivity }}</strong>
          </h3>

          <h3  style="color: green;"><strong> {{rating}}</strong> <b-icon icon="star-fill"></b-icon></h3>


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
                img-height="400" 
              >
                <b-carousel-slide :img-src="picture1" ></b-carousel-slide>

                <b-carousel-slide :img-src="picture2"></b-carousel-slide>
                <b-carousel-slide :img-src="picture3"></b-carousel-slide>
              </b-carousel>
              <br />
              <div class="commentsbox" >
                <Comments 
                  v-for="commentary in comments"
                  :key="commentary.userId"
                  :userId="commentary.userId" 
                  :comment="commentary.comment"
                  :dateComment="commentary.dateComment"
                  :rate="commentary.rate"
                ></Comments>
              </div>
            </div>
            <div class="col-7">
              <p style="text-align:justify">{{ description }}</p>

              <strong style="color: green;">$ {{ parseInt(prize).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}</strong><br>

              <router-link :to="'/perfilmiembros/' + userCreator">
                <i>
                  <small>Host: {{ userCreatorName }}</small>
                </i>
              </router-link>
              <p style="text-align:justify">
                <i>
                  <small>Location: {{ activityLocation }}</small>
                </i>
              </p>
              <b-form-datepicker
                id="reservationDate"
                v-model="ReservationValue"
                size="sm"
                :min="dataStart"
                :max="dataEnd"
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
            <b-button variant="primary" type="submit" @click="showMsgBoxTwo" >
              <b-icon icon="briefcase" type></b-icon> Reserve
            </b-button>
          </form>
        </template>
      </b-modal>
    </b-card>
  </b-col>
</template>

<script>
import * as firebase from "firebase/app";
import Comments from "@/components/Comments.vue";
import Firebase from "firebase";
import db from "../db.js";
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
Vue.use(BootstrapVue);

export default {
  components: {
    Comments
  },
  name: "activity",
  props: [
    "client",
    "nameActivity",
    "description",
    "datePublish",
    "dataStart",
    "dataEnd",
    "userCreatorName",
    "userCreator",
    "prize",
    "activityKey",
    "rating",
    "activityLocation",

    "pictures",
    "comments",
    "currentDate",
    "userClient"
  ],
  data() {
    return {
      nComments:0,
      picture1: "", picture2: "", picture3: "",

      hostClient: null,
      ratingClient: 0,
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
      headerTextVariant: "light",
      min: null,
      max: null,
    };
  },

mounted(){
  this.picture1 = this.pictures[0];
  this.picture2 = this.pictures[1];
  this.picture3 = this.pictures[2];
  this.nComments = this.comments.length;
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
          console.log(formattedTime);
          let document;
          let activityIdentify;
          let query = db.collection("activities").doc(this.activityKey);
          query.get().then(function(doc) {
            if (doc.exists) {
              activityIdentify = doc.id;
              console.log("Done, key: " + doc.id);
            } else {
              console.log("No such document");
            }
          });
          console.log(activityIdentify);
          let userName;
          db.collection("user")
            .doc(user.uid)
            .get()
            .then(snapshot => {
              userName = snapshot.data().name;
              console.log(userName);
              checkActivities = snapshot.data().activitiesReserved;
              document = db.collection("activities").doc(activityIdentify);
              if (checkActivities == null) {
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
                db.collection("user")
                  .doc(user.uid)
                  .update({
                    notifications: firebase.firestore.FieldValue.arrayUnion({
                      activityId: activityIdentify,
                      otherUserId: this.userCreator,
                      otherUsername: this.userCreatorName,
                      activityName: this.nameActivity,
                      dateGenerated: formattedTime,
                      type: "nuevaReserva"
                    })
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
                db.collection("user")
                  .doc(user.uid)
                  .update({
                    notifications: firebase.firestore.FieldValue.arrayUnion({
                      activityId: activityIdentify,
                      otherUserId: this.userCreator,
                      otherUsername: this.userCreatorName,
                      activityName: this.nameActivity,
                      dateGenerated: formattedTime,
                      type: "nuevaReserva"
                    })
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
.activityCard:hover {
  box-shadow: 0px 0px 5px 1px rgba(46, 124, 1, 0.5);
}
.card-img-top {
  object-fit: cover;
}
.card-img-top {
  position: absolute;
  top: -30px;
  left: 50%;
  margin-left: -113px;
  width: 90% !important;
  height: 15vw;
  border-radius: 10px;
  box-shadow: 5px 10px 10px #ccc;
}

#cardActivity {
  margin-top: 30px;
  padding-top: 160px;
  border-radius: 15px;
  width: 100% !important;
  height: 340px !important;
}
#rating-inline {
  background-color: rgba(0, 0, 0, 0.003);
  padding-right: 50px;
}

div.commentsbox{
  margin-top: 20px;
  background-color: white;
  width: 310px;
  height: 210px;
  overflow: auto;
  
}
.carousel-inner .item{
height:500px;
background-size:cover;
background-position: center center;
}

</style>

