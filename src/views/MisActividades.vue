<template >
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
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=61"></b-carousel-slide>
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=62"></b-carousel-slide>
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=63"></b-carousel-slide>
              </b-carousel>
              <br />
            </div>
            <div class="col-8">
              <h2>{{item.nameActivity}}</h2>
              <p style="text-align:justify">{{ item.description }}</p>
              <strong style="color: green;">$ {{ item.price }}</strong>

              <p class="mt-4" style="text-align:justify">
                <i>
                  <small>Publish date: {{ item.datePublish }}</small>
                </i>
              </p>
              <b-button variant="danger">
                Eliminar
              </b-button>
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
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=61"></b-carousel-slide>
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=62"></b-carousel-slide>
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=63"></b-carousel-slide>
              </b-carousel>
              <br />
            </div>
            <div class="col-8">
              <h2>{{item.nameActivity}}</h2>
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
              <b-button variant="danger">
                Cancelar
              </b-button>
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
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=61"></b-carousel-slide>
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=62"></b-carousel-slide>
                <b-carousel-slide img-src="https://picsum.photos/600/500/?image=63"></b-carousel-slide>
              </b-carousel>
              <br />
            </div>
            <div class="col-8">
              <h2>{{item.nameActivity}}</h2>
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

export default {
  name: "MisActividades",
  data: function() {
    return {
      reservedActivities: [],
      createdActivities: [],
      finishedActivities: []
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
                    id: snapshot.data().id,
                    description: snapshot.data().description,
                    userCreatorName: snapshot.data().userCreatorName,
                    datePublish: formattedTime,
                    nameActivity: snapshot.data().activityName,
                    price: snapshot.data().price,
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
                    id: snapshot.data().id,
                    description: snapshot.data().description,
                    userCreatorName: snapshot.data().userCreatorName,
                    datePublish: formattedTime,
                    nameActivity: snapshot.data().activityName,
                    price: snapshot.data().price,
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
                this.createdActivities.push({
                  id: snapshot.data().id,
                  description: snapshot.data().description,
                  userCreatorName: snapshot.data().userCreatorName,
                  datePublish: formattedTime,
                  nameActivity: snapshot.data().activityName,
                  price: snapshot.data().price
                });
              });
          }
        });
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
