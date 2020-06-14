<template>
  <div id="notificaciones">
    <h2 style="margin-left:3%; margin-top:2%; margin-right:8%">
      <strong style="color: green;">Notificaciones</strong>
    </h2>
    <b-card
      style=" margin-left:3%; margin-top: 2%; margin-right: 8%;border-block-color:  rgba(46, 124, 1, 0.5);"
      class="mb-3"
    >
      <b-col v-for="item in notificaciones" :key="item.id">
        <div class="col-8">
          <h2>id de la actividad: {{ item.activityId }}</h2>
          <p style="text-align:justify">id del otro usuario: {{ item.otherUserName }}</p>
          <strong style="color: green;">tipo de notificacion: {{ item.type }}</strong>
          <p style="text-align:justify">Mensaje: {{ item.message }}</p>
        </div>
      </b-col>
    </b-card>
  </div>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";

export default {
  name: "notifications",
  data() {
    return {
      nameUser: "",
      nameActivities: "",
      notificaciones: []
    };
  },
  /*
    ya esta la parte grafica de visualizacion de las notificaciones,
    ahora hace falta rellenar correctamente el arreglo de las notificaciones y asegurarse de que 
    se puedan eliminar o enrutar (opcional)
  */
  created() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let userNotifications = [];
        db.collection("user")
          .doc(user.uid)
          .get()
          .then(snapshot => {
            var notificaciones = snapshot.data().notifications;
            for (let index = 0; index < notificaciones.length; index++) {
              userNotifications[index] = notificaciones[index];
              console.log(userNotifications[index].otherUserName);
              if (userNotifications[index].type == "cancelacionReserva") {
                userNotifications[index].message =
                  "El usuario " +
                  userNotifications[index].otherUserName +
                  " ha cancelado la reserva";
              } else if (
                userNotifications[index].type == "cancelacionActividad"
              ) {
                userNotifications[index].message =
                  "El usuario " +
                  userNotifications[index].otherUserName +
                  " ha cancelado la actividad";
              } else if (userNotifications[index].type == "nuevaReserva") {
                userNotifications[index].message =
                  "El usuario " +
                  userNotifications[index].otherUserName +
                  " ha realizado una nueva reserva";
              }
              this.notificaciones.push({
                activityId: userNotifications[index].activityId,
                otherUserId: userNotifications[index].otherUserId,
                otherUserName: userNotifications[index].otherUserName,
                activityName: userNotifications[index].activityName,
                type: userNotifications[index].type,
                message: userNotifications[index].message
              });
            }
          });
      }
    });
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
