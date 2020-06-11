<template>
  <div>
    <div class="sidenav text-center">
      <h5 style=" margin-left:3%; margin-right:3%; margin-top:15%;">
        <a href="#createdActivities">Actividades creadas</a>
      </h5>
      <h5 style="margin-left:3%; margin-right:3%; margin-top:10%;">
        <a href="#reservedActivities">Actividades reservadas</a>
      </h5>
      <h5 style="margin-left:3%; margin-right:3%;margin-top:10%;">
        <a href="#finishedActivities">Actividades culminadas</a>
      </h5>
    </div>
    <div id="createdActivities" class="mt-4;" style="margin-left:15%;">
      <h2 style=" margin-left:3%; margin-top: 2%; margin-right: 8%;">
        <strong style="color:  green;">Actividades creadas</strong>
      </h2>
      <h5 style=" margin-left:3%; margin-top: 2%; margin-right: 8%;">
        <p>
          Tienes
          <strong>{{ numberOfReservations }}</strong> reservas en total de tus
          actividades
        </p>
      </h5>
      <b-col v-for="item in createdActivities" :key="item.id">
        <b-card
          style=" margin-left:3%; margin-top: 2%; margin-right: 8%;border-block-color:  rgba(46, 124, 1, 0.5);"
          class="mb-3"
        >
          <div class="row">
            <div class="col-5" style="max-width: 20rem;">
              <b-carousel
                id="carousel-fade"
                style="text-shadow: 0px 0px 2px #000"
                fade
                indicators
                img-width="600"
                img-height="500 "
              >
                <b-carousel-slide :img-src="item.picture1"></b-carousel-slide>
                <b-carousel-slide :img-src="item.picture2"></b-carousel-slide>
                <b-carousel-slide :img-src="item.picture3"></b-carousel-slide>
              </b-carousel>
              <br />
              <div class="text-center">
                <b-button v-b-modal="item.modalId" variant="success">
                  <b-icon-person-check-fill></b-icon-person-check-fill>Reservas
                </b-button>
              </div>
              <b-modal v-bind:id="item.modalId" centered size="md">
                <template v-slot:modal-header>
                  <h3>
                    <small style="color:green">Contacta a quienes han reservado tu actividad</small>
                  </h3>
                </template>
                <div class="modal-body">
                  <div v-for="item2 in item.activityReservationList" :key="item2.id">
                    <router-link
                      class="list-group-item list-group-item-action"
                      :to="'/perfilmiembros/' + item2.reservationUserId"
                    >
                      <b-icon-person-check-fill></b-icon-person-check-fill>
                      {{ item2.name }},
                      {{ item2.createdActivityReservationDate }}
                    </router-link>
                  </div>
                </div>
                <form action=""></form>
                <template v-slot:modal-footer="{ cancel }">
                  <b-button variant="secondary" @click="cancel()">Ok</b-button>
                </template>
              </b-modal>
            </div>
            <div class="col-8">
              <h2>{{ item.nameActivity }}</h2>
              <p style="text-align:justify">{{ item.description }}</p>
              <strong style="color: green;">$ {{ item.price }}</strong>
              <p class="mt-4" style="text-align:justify">
                <i>
                  <small>Publish date: {{ item.datePublish }}</small>
                </i>
              </p>
              <form>
                <b-button
                  variant="danger"
                  type="submit"
                  @click="cancelActivity(item.id)"
                  >Eliminar</b-button
                >
              </form>
            </div>
          </div>
        </b-card>
      </b-col>
    </div>
    <div id="reservedActivities" class="mt-4;" style="margin-left:15%;">
      <h2 style=" margin-left:3%; margin-top: 2%; margin-right: 8%;">
        <strong style="color:  green;">Actividades reservadas</strong>
      </h2>
      <b-col v-for="item in reservedActivities" :key="item.id">
        <b-card
          style=" margin-left:3%; margin-top: 2%; margin-right: 8%;border-color:  rgba(46, 124, 1, 0.5);"
          class="mb-3"
        >
          <div class="row">
            <div class="col-5" style="max-width: 20rem;">
              <b-carousel
                id="carousel-fade"
                style="text-shadow: 0px 0px 2px #000"
                fade
                indicators
                img-width="600"
                img-height="500 "
              >
                <b-carousel-slide :img-src="item.picture1"></b-carousel-slide>
                <b-carousel-slide :img-src="item.picture2"></b-carousel-slide>
                <b-carousel-slide :img-src="item.picture3"></b-carousel-slide>
              </b-carousel>
              <br />
              <div class="text-center">
                <form>
                  <b-button
                    variant="danger"
                    type="submit"
                    @click="cancelReservation(item.id)"
                  >
                    <b-icon-dash-circle></b-icon-dash-circle>Cancelar
                  </b-button>
                </form>
              </div>
            </div>
            <div class="col-8">
              <h2>{{ item.nameActivity }}</h2>
              <p style="text-align:justify">{{ item.description }}</p>
              <strong style="color: green;">$ {{ item.price }}</strong>
              <p class="mt-4" style="text-align:justify">
                <i>
                  <small>Host: {{ item.userCreatorName }}</small>
                </i>
              </p>
              <p style="text-align:justify">
                <i>
                  <small>Publish date: {{ item.datePublish }}</small>
                </i>
              </p>
              <p style="text-align:justify">
                <i>
                  <small>Reservation date: {{ item.currentReservationDate }} / 2020</small>
                </i>
              </p>
            </div>
          </div>
        </b-card>
      </b-col>
    </div>
    <div id="finishedActivities" class="mt-4;" style="margin-left:15%; margin-bottom:50%;">
      <h2 style=" margin-left:3%; margin-top: 2%; margin-right: 8%;">
        <strong style="color:  green;">Actividades culminadas</strong>
      </h2>
      <b-col v-for="item in finishedActivities" :key="item.id">
        <b-card
          style=" margin-left:3%; margin-top: 2%; margin-right: 8%;border-block-color:  rgba(46, 124, 1, 0.5);"
          class="mb-3"
        >
          <div class="row">
            <div class="col-5" style="max-width: 20rem;">
              <b-carousel
                id="carousel-fade"
                style="text-shadow: 0px 0px 2px #000"
                fade
                indicators
                img-width="600"
                img-height="500 "
              >
                <b-carousel-slide :img-src="item.picture1"></b-carousel-slide>
                <b-carousel-slide :img-src="item.picture2"></b-carousel-slide>
                <b-carousel-slide :img-src="item.picture3"></b-carousel-slide>
              </b-carousel>
              <br />
              <div class="text-center">
                <b-button variant="info">
                  <b-icon-star></b-icon-star>Calificar
                </b-button>
              </div>
            </div>
            <div class="col-8">
              <h2>{{ item.nameActivity }}</h2>
              <p style="text-align:justify">{{ item.description }}</p>
              <strong style="color: green;">$ {{ item.price }}</strong>
              <p class="mt-4" style="text-align:justify">
                <i>
                  <small>Host: {{ item.userCreatorName }}</small>
                </i>
              </p>
              <p style="text-align:justify">
                <i>
                  <small>Publish date: {{ item.datePublish }}</small>
                </i>
              </p>
              <p style="text-align:justify">
                <i>
                  <small>Reservation date: {{ item.currentReservationDate }} / 2020</small>
                </i>
              </p>
            </div>
          </div>
        </b-card>
      </b-col>
    </div>
  </div>
</template>
<script>
import Firebase from "firebase";
import db from "../db.js";
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
export default {
  name: "MisActividades",
  data: function() {
    return {
      reservedActivities: [],
      createdActivities: [],
      finishedActivities: [],
      numberOfReservations: 0,
      currentNumberOfReservations: 0
    };
  },
  mounted() {
    var currentUser = Firebase.auth().currentUser;
    if (currentUser != null) {
      db.collection("user")
        .doc(currentUser.uid)
        .get()
        .then(snapshot => {
          var i;
          var j;
          for (i = 0; i < snapshot.data().activitiesReserved.length; i++) {
            var reservedActivityId = snapshot.data().activitiesReserved[i].id;
            var reservationDate = snapshot.data().activitiesReserved[i]
              .reservationDate;
            var realMonth;
            var realDate;
            if (reservationDate.slice(0, 3) == "Jan") realMonth = "01";
            if (reservationDate.slice(0, 3) == "Feb") realMonth = "02";
            if (reservationDate.slice(0, 3) == "Mar") realMonth = "03";
            if (reservationDate.slice(0, 3) == "Apr") realMonth = "04";
            if (reservationDate.slice(0, 3) == "May") realMonth = "05";
            if (reservationDate.slice(0, 3) == "Jun") realMonth = "06";
            if (reservationDate.slice(0, 3) == "Jul") realMonth = "07";
            if (reservationDate.slice(0, 3) == "Aug") realMonth = "08";
            if (reservationDate.slice(0, 3) == "Sep") realMonth = "09";
            if (reservationDate.slice(0, 3) == "Oct") realMonth = "10";
            if (reservationDate.slice(0, 3) == "Nov") realMonth = "11";
            if (reservationDate.slice(0, 3) == "Dec") realMonth = "12";
            if (
              Number(reservationDate.slice(4, 5)) <= 9 &&
              reservationDate.slice(5, 6) == " "
            )
              realDate =
                "2020/" +
                realMonth +
                "/0" +
                reservationDate.slice(4, 5) +
                " 19:00:00";
            else
              realDate =
                "2020/" +
                realMonth +
                "/" +
                reservationDate.slice(4, 6) +
                " 19:00:00";
            if (Date.now() > new Date(realDate).getTime())
              db.collection("activities")
                .doc(reservedActivityId)
                .get()
                .then(snapshot => {
                  var k = 0;
                  for (k = 0; k < snapshot.data().userClient.length; k++) {
                    if (
                      snapshot.data().userClient[k].name ==
                      currentUser.displayName
                    )
                      var currentReservationDate = snapshot.data().userClient[k]
                        .reservationDate;
                  }
                  let unix_timestamp = snapshot.data().datePublish;
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
                  this.finishedActivities.push({
                    id: snapshot.id,
                    description: snapshot.data().description,
                    userCreatorName: snapshot.data().userCreatorName,
                    datePublish: formattedTime,
                    nameActivity: snapshot.data().activityName,
                    price: snapshot.data().price,
                    picture1: snapshot.data().pictures[0],
                    picture2: snapshot.data().pictures[1],
                    picture3: snapshot.data().pictures[2],
                    currentReservationDate: currentReservationDate.slice(0, 7)
                  });
                });
            if (Date.now() < new Date(realDate).getTime())
              db.collection("activities")
                .doc(reservedActivityId)
                .get()
                .then(snapshot => {
                  var k = 0;
                  for (k = 0; k < snapshot.data().userClient.length; k++) {
                    if (
                      snapshot.data().userClient[k].name ==
                      currentUser.displayName
                    )
                      var currentReservationDate = snapshot.data().userClient[k]
                        .reservationDate;
                  }
                  let unix_timestamp = snapshot.data().datePublish;
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
                  this.reservedActivities.push({
                    id: snapshot.id,
                    description: snapshot.data().description,
                    userCreatorName: snapshot.data().userCreatorName,
                    datePublish: formattedTime,
                    nameActivity: snapshot.data().activityName,
                    price: snapshot.data().price,
                    picture1: snapshot.data().pictures[0],
                    picture2: snapshot.data().pictures[1],
                    picture3: snapshot.data().pictures[2],
                    currentReservationDate: currentReservationDate.slice(0, 7)
                  });
                });
          }
          for (j = 0; j < snapshot.data().activitiesName.length; j++) {
            var createdActivityId = snapshot.data().activitiesName[j].id;
            db.collection("activities")
              .doc(createdActivityId)
              .get()
              .then(snapshot => {
                let unix_timestamp = snapshot.data().datePublish;
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
                var activityReservations = [];
                var l;
                for (l = 0; l < snapshot.data().userClient.length; l++) {
                  activityReservations.push({
                    id: l.toString() + name,
                    name: snapshot.data().userClient[l].name,
                    reservationUserId: snapshot.data().userClient[l].userId,
                    createdActivityReservationDate: snapshot
                      .data()
                      .userClient[l].reservationDate.slice(0, 6)
                  });
                  this.numberOfReservations = this.numberOfReservations + 1;
                }
                //console.log(activityReservations);
                this.createdActivities.push({
                  id: snapshot.id,
                  description: snapshot.data().description,
                  userCreatorName: snapshot.data().userCreatorName,
                  datePublish: formattedTime,
                  nameActivity: snapshot.data().activityName,
                  price: snapshot.data().price,
                  picture1: snapshot.data().pictures[0],
                  picture2: snapshot.data().pictures[1],
                  picture3: snapshot.data().pictures[2],
                  activityReservationList: activityReservations,
                  modalId: formattedTime
                });
              });
          }
        });
    }
  },
  methods: {
    cancelActivity(id) {
      var user = Firebase.auth().currentUser;
      if (user) {
        console.log("Cancelar actividad con id: " + id);
        db.collection("activities")
          .doc(id)
          .update({
            isShowed: false
          })
          .then(function() {
            console.log("El documento ha sido actualizado");
          })
          .catch(function(error) {
            console.error("Error actualizando el documento: ", error);
          });
      }
    },
    cancelReservation(id) {
      var user = Firebase.auth().currentUser;
      if (user) {
        console.log("Desde user.uid: " + user.uid);
        console.log(id);
        let document;
        let checkActivities;
        let userName;
        let reservationDate;
        let activityName;
        db.collection("activities")
          .doc(id)
          .get()
          .then(snapshot => {
            for (
              let index = 0;
              index < snapshot.data().userClient.length;
              index++
            ) {
              if (user.uid == snapshot.data().userClient[index].userId) {
                reservationDate = snapshot.data().userClient[index]
                  .reservationDate;
                activityName = snapshot.data().activityName;
                console.log(reservationDate);
              }
            }
          });
        db.collection("user")
          .doc(user.uid)
          .get()
          .then(snapshot => {
            console.log("dentro del snap: " + id);
            userName = snapshot.data().name;
            console.log("nombre user " + userName);
            console.log(reservationDate);
            checkActivities = snapshot.data().activitiesReserved;
            document = db.collection("activities").doc(id);
            if (checkActivities != null) {
              document.update({
                userClient: Firebase.firestore.FieldValue.arrayRemove({
                  userId: user.uid,
                  name: userName,
                  reservationDate: reservationDate
                })
              });
              db.collection("user")
                .doc(user.uid)
                .update({
                  activitiesReserved: Firebase.firestore.FieldValue.arrayRemove(
                    {
                      id: id,
                      name: activityName,
                      reservationDate: reservationDate
                    }
                  )
                });
            }
          });
      }
    }
  }
};
</script>
<style lang="scss">
html {
  scroll-behavior: smooth;
}
#ContainerActivities {
  margin-top: 2rem;
}

.activityCard:hover {
  box-shadow: 0px 0px 5px 1px rgba(46, 124, 1, 0.5);
}
.sidenav {
  width: 16%;
  height: 45%;
  margin-bottom: 80%;
  position: fixed;
  overflow-x: hidden;
  padding: 8px 0;
  border-right: 5px solid green;
}
</style>