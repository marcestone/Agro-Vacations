<template>
  <div class="container">
    <form class="mt-5" @submit.prevent="register">
      <h4 class="text-center font-weight-light mb-3">
        Registrate como entidad
      </h4>
      <div class="row justify-content-center">
        <div v-if="error" class="col-12 alert alert-danger px-3">
          {{ error }}
        </div>
        <section class="mt-5 col-sm-9 form-group">
          <label class="form-control-label sr-only" for="displayName"
            >Display Name</label
          >
          <input
            class="form-control"
            type="text"
            id="displayName"
            placeholder="Nombres y apellidos"
            name="displayName"
            required
            v-model="displayName"
          />
        </section>
        <section class="col-sm-9 form-group">
          <label class="form-control-label sr-only" for="email">Email</label>
          <input
            class="form-control"
            type="email"
            id="email"
            placeholder="Correo electrónico"
            required
            name="email"
            v-model="email"
          />
        </section>
        <section class="col-sm-9 form-group">
          <label class="form-control-label sr-only"></label>
          <input
            class="form-control"
            type="password"
            placeholder="Contraseña"
            v-model="passOne"
          />
        </section>
        <section class="col-sm-9 form-group">
          <label class="form-control-label sr-only"></label>
          <input
            class="form-control"
            type="password"
            required
            placeholder="Repetir contraseña"
            v-model="passTwo"
          />
        </section>
      </div>
      <div class="form-group text-center mt-5">
        <button class="btn btn-primary" type="submit">Registrarse</button>
      </div>
    </form>
    <p class="text-center mt-2">
      o
      <router-link to="/logincliente">Ingresar</router-link>
    </p>
  </div>
</template>

<script>
// eslint-disable-next-line
import Firebase from "firebase";
import db from "../db.js";

export default {
  data: function() {
    return {
      displayName: null,
      email: null,
      passTwo: null,
      error: null
    };
  },
  methods: {
    register: function() {
      const info = {
        email: this.email,
        password: this.passOne,
        displayName: this.displayName
      };
      if (!this.error) {
        Firebase.auth()
          .createUserWithEmailAndPassword(info.email, info.password)
          .then(
            // eslint-disable-next-line
            userCredentials => {
              return userCredentials.user
                .updateProfile({
                  displayName: info.displayName
                })
                .then(() => {
                  this.$router.replace("home");
                });
            },
            error => {
              this.error = error.message;
            }
          );

        Firebase.auth().onAuthStateChanged(user => {
          if (user) {
            var UID = user.uid;

            db.collection("user")
              .doc(UID)
              .set({
                name: info.displayName,
                email: info.email,
                uid: UID
              });
          }
        });
      }
    }
  },
  watch: {
    passTwo: function() {
      if (
        this.passOne !== "" &&
        this.passTwo !== "" &&
        this.passTwo !== this.passOne
      ) {
        this.error = "Las contraseñas deben coincidir";
      } else {
        this.error = null;
      }
    }
  }
};
</script>
