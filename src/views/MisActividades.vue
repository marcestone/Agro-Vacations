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

                  <b-icon-person-check-fill></b-icon-person-check-fill> Reservas

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
                  v-if="item.isShowed == true"
                  variant="danger"
                  type="submit"
                  @click="cancelActivity(item.id, item.userCreator)"
                >
                  Eliminar
                </b-button>
              </form>
              <form>
                <b-button
                  v-if="item.isShowed == false"
                  variant="success"
                  type="submit"
                  @click="reactivateActivity(item.id)"
                >
                  reactivar
                </b-button>
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
                  <small>
                    Reservation date: {{ item.currentReservationDate }} /
                    2020
                  </small>
                </i>
              </p>
            </div>
          </div>
        </b-card>
      </b-col>
    </div>
    <div id="finishedActivities" class="mt-4;" style="margin-left:15%; margin-bottom:50%;">
      <h2 style=" margin-left:3%; margin-top: 2%; margin-right: 8%;">
        <strong style="color:  green; ">Actividades culminadas</strong>
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

              <b-container id="commentInputBox">
                <center style="color: green;">Did you take it? ¡Vote now!</center>
                <span>
                  <b-form-rating v-model="ratingClient" variant="warning" class="mb-2"></b-form-rating>
                </span>
                <textarea
                  id="commentInput"
                  rows="10"
                  cols="5"
                  placeholder="How was the experience ?,            let us know"
                  v-model="newComment"
                ></textarea>
                <b-button
                  v-if="item.flagButton == true"
                  id="commentButton"
                  variant="primary"
                  type="submit"
                  @click.once="comment(item.id,item.activityRate,item.comments.length)"
                ><b-icon icon="cursor-fill" type></b-icon>Send</b-button>
                <b-container v-else-if="item.flagButton == false" id="AlertComment">
                  <div class="AlertText"
                    style="color: white; text-align:center;"
                  ><span>Ya calificaste esta actividad</span></div>
                </b-container>
                <b-container v-if="item.flagButton == true" id="AlertComment2">
                  <div class="AlertText"
                    style="color: white; text-align:center;"
                  ><span>Solo puedes calificar una vez</span></div>
                </b-container>
              </b-container>
            </div>
            <div class="col-8">
              <h2>{{ item.nameActivity}}</h2>
              <p style="text-align:justify">{{ item.description }}</p>
              <strong style="color: green;">$ {{ item.price }}</strong>
              <div class="commentsboxMyAct" >
                <Comments 
                  v-for="commentary in item.comments"
                  :key="commentary.userId"
                  :userId="commentary.userId" 
                  :comment="commentary.comment"
                  :dateComment="commentary.dateComment"
                  :rate="commentary.rate"
                ></Comments>
              </div>
              <p class="mt-4" style="text-align:justify">
                <i>
                  <small>Host: {{ item.userCreatorName }} ||
                    Publish date: {{ item.datePublish }} ||
                    Reservation date: {{ item.currentReservationDate }} /
                    2020 

                  </small>
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
import * as firebase from "firebase/app";
import Comments from "@/components/Comments.vue";
export default {
  components: {
    Comments
  },
  name: "MisActividades",
  data() {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = now.getFullYear();
      const cD = mm + '/' + dd + '/' + yyyy;
      
    return {
      reservedActivities: [],
      createdActivities: [],
      finishedActivities: [],
      numberOfReservations: 0,

      currentNumberOfReservations: 0,
      nClients: 0,
      flagButton:true,
      newComment:"",
      ratingClient: 0,
      currentDate: cD,
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

                  var show = true;
                  for(k = 0; k < snapshot.data().comments.length ; ++k){
                    if(snapshot.data().comments[k].userId == currentUser.uid ){
                      this.flagButton = false;   
                      show = this.flagButton;   
                    }
                    
                  }

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

                    activityRate: snapshot.data().activityRate,

                    userCreatorName: snapshot.data().userCreatorName,
                    datePublish: formattedTime,
                    nameActivity: snapshot.data().activityName,
                    price: snapshot.data().price,

                    comments: snapshot.data().comments,
                    picture1: snapshot.data().pictures[0],
                    picture2: snapshot.data().pictures[1],
                    picture3: snapshot.data().pictures[2],
                    flagButton: show,
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
                  modalId: formattedTime,
                  isShowed: snapshot.data().isShowed

                });
              });
          }
        });
    }

  },
  methods: {
  
      comment(id,activityRate,nComments){
      const h = this.$createElement
      var user = Firebase.auth().currentUser;
      if(user){
        var commentA = db.collection("activities").doc(id)
        
        commentA.update({
          comments: firebase.firestore.FieldValue.arrayUnion(
          {
            comment: this.newComment,
            dateComment: this.currentDate,
            rate: this.ratingClient,
            userId: user.uid
          })
        }).then(()=>{
          
          this.$router.replace("home");
                  
        });

        activityRate = ((activityRate*(nComments)) + this.ratingClient) / (nComments + 1);
        commentA.update({
          activityRate: activityRate,
        })
        const vNodesMsg = h(
          'p',
          { class: ['text-center', 'mb-0'] },
          [
            h('b-spinner', { props: { type: 'grow', small: true } }),
            ' The comment has been aproved,',
            h('b-spinner', { props: { type: 'grow', small: true } })
          ]
        )
        const vNodesTitle = h(
          'div',
          { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
          [
            h('strong', { class: 'mr-2' }, 'Approved'),
            h('small', { class: 'ml-auto text-italics' }, '1 second ago')
          ]
        )
        this.$bvToast.toast([vNodesMsg], {
          title: [vNodesTitle],
          solid: true,
          variant: 'success'
        })
        
        
      }
    }, 
  
    cancelActivity(id, userId) {
      var user = Firebase.auth().currentUser;
      if (user) {
        console.log("Cancelar actividad con id: " + id);
        console.log("userId: " + userId);
        console.log("userCreatorName: " + this.userCreatorName);
        db.collection("activities")
          .doc(id)
          .update({
            isShowed: false
          })
          .then(function() {
            this.$router.replace("home"); 
          })
          .catch(function(error) {
            console.error("Error actualizando el documento: ", error);
          });
        db.collection("user")
          .doc(userId)
          .update({
            notifications: Firebase.firestore.FieldValue.arrayUnion({
              activityId: id,
              otherUserId: user.uid,
              otherUsername: this.userCreatorName,
              activityName: this.nameActivity,
              type: "cancelacionActividad"
            })
          })
          .then(function() {
            console.log("El documento ha sido actualizado");
          });
        db.collection("user")
          .doc(user.uid)
          .update({
            notifications: Firebase.firestore.FieldValue.arrayUnion({
              activityId: id,
              otherUserId: userId,
              otherUsername: this.userCreatorName,
              activityName: this.nameActivity,
              type: "cancelacionActividad"
            })
          })
          .then(function() {
            console.log("El documento ha sido actualizado");
          });
      }
    },
    reactivateActivity(id) {
      var user = Firebase.auth().currentUser;
      if (user) {
        db.collection("activities")
          .doc(id)
          .update({
            isShowed: true
          })
          .then(function() {
            this.$router.replace("home");   
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


#commentInput {
  height: 150px;
  width: 260px;
  
}
#commentButton {
  height: 40px;
  width: 100px;
  margin-top: -80px;
  margin-left: 155px;
  border-radius: 30px;
}
#AlertComment {
  margin-top: 10px;
  background: #47803e;
  border-radius: 20px;
  height: 40px;
  
}
#AlertComment2 {
  margin-top: 5px;
  background: #47803e;
  border-radius: 20px;
  height: 40px;
  
}

div.commentsboxMyAct{
  margin-top: 20px;
  background-color: white;
  width: 620px;
  height: 210px;
  overflow: auto;
  
}
.AlertText span{
  margin: auto;
}

</style>