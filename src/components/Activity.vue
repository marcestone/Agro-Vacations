<template>
  <b-col md="3">
    <b-card id=cardActivity
      :title="nameActivity"
      img-src="https://picsum.photos/600/500/?image=61"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      
      class="activityCard mb-2"
    >
      <b-card-text>${{prize}}<br>
            <b-form-rating 
              id="rating-inline" 
              inline  
              v-model="rating" 
              variant="success" 
              no-border size="sm">
            </b-form-rating>
      </b-card-text>
      <a href="javascript:void(0)" class="stretched-link" v-b-modal="nameActivity"></a>

      <b-modal v-bind:id="nameActivity" centered size="lg">
        <template v-slot:modal-header>
          <h3>
            <strong>{{nameActivity}}</strong>
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
                <b-carousel-slide
                  img-src="https://picsum.photos/600/500/?image=61"
                ></b-carousel-slide>
                <b-carousel-slide
                  img-src="https://picsum.photos/600/500/?image=62"
                ></b-carousel-slide>
                <b-carousel-slide
                  img-src="https://picsum.photos/600/500/?image=63"
                ></b-carousel-slide>
              </b-carousel><br>
              <center style="color: green;">Did you take it? ¡Vote now!</center>
              <span><b-form-rating 
              v-model="ratingClient" 
              variant="success" 
              class="mb-2">
              </b-form-rating></span>
            </div>
            <div class="col-7">
              <p style="text-align:justify">{{description}}</p>
              <strong style="color: green;">$ {{prize}}</strong>
              <p class="mt-4" style="text-align:justify">
                <i>
                  <small>Host: {{userCreatorName}}</small>
                </i>
              </p>
              <p style="text-align:justify">
                
                <i>
                  <small>Publication date: {{datePublish}}</small>
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
        <template v-slot:modal-footer="{cancel}">
          <b-button variant="secondary" @click="cancel()">Cancel</b-button>
          <b-button variant="primary" @click="showMsgBoxTwo">
            <b-icon icon="briefcase"></b-icon> Reserve
          </b-button>
        </template>
      </b-modal>
    </b-card>
  </b-col>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";

export default {
  name: "activity",
  props: [
    "client",
    "nameActivity",
    "description",
    "datePublish",
    "userCreatorName",
    "prize",
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
  methods:{
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
      const info = {
        activityName: this.activityName,
        activityType: this.activityType,
        datePublish: this.datePublish,
        description: this.description,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        activityTransport: this.activityTransport,
        activityLocation: this.activityLocation,
        activityPrice: this.activityPrice
      };

      Firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let checkActivities;

          db.collection("user")
            .doc(user.uid)
            .get()
            .then(snapshot => {
              checkActivities = snapshot.data().activitiesReserved;

              let document;
              let newReservation = true;
              let newActivitiesReservation = [];
              let activitiyId;

              if (checkActivities != null) {
                newActivitiesReservation = checkActivities;
                for (let index = 0; index < checkActivities.length; index++) {
                  if (checkActivities.name.localeCompare(info.activityName)) {
                    newReservation = false;
                    activitiyId = checkActivities.id;
                  }
                }
              }

              if (newReservation == true) {
                document = db.collection("activities").doc();
                console.log(newActivitiesReservation);
                newActivitiesReservation.push({
                  name: info.activityName,
                  id: document.id
                });

                document = db.collection("activities").doc(activitiyId);
                document.update({
                  userClient: user.uid
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
  width: 100%!important;
   height: 360px!important;
   object-fit: cover;

}
.activityCard:hover {
  box-shadow: 0px 0px 5px 1px rgba(46, 124, 1, 0.5);
}
</style>