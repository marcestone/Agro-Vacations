<template>
  <div class="bg" style="height:90%">
    <div class="wrapperForRegistro">
     <form class="form-registro" @submit.prevent="register">
        <div v-if="error" style="margin:0px auto" class="col-10 alert alert-danger px-3">{{ error }}</div>
        <h2 class="form-registro-heading">Ingresar</h2>
        <input
          type="text"
          class="form-control"
          placeholder="Nombre"
          name="displayName"
          required
          v-model="displayName"
        />

        <input
          class="form-control"
          type="text"
          placeholder="E-mail"
          required
          name="email"
          v-model="email"
        />

        <input class="form-control" type="password" placeholder="Password" v-model="passOne" />

        <input
          class="form-control"
          type="password"
          required
          placeholder="Repeat password"
          v-model="passTwo"
        />

        <button class="btn btn-lg btn-primary btn-block" type="submit">Registrarse</button>
      </form>
    </div>

    <!--<div class="container">
      <div
        class="card mt-1"
        style="width: 50%;margin-left: 55%; border: white;"
      >
        <div class="card-body ">
          <form class="mt-4" @submit.prevent="register">
            <h2 class="text-center font-weight-bold mb-3 text-success">
              Join the community
            </h2>
            <div class="row justify-content-center">
              <div v-if="error" class="col-12 alert alert-danger px-3">
                {{ error }}
              </div>
              <section class="mt-5 col-sm-9 form-group">
                <label class="form-control-label sr-only" for="displayName"
                  >Display Name</label
                >
                <input
                  class="form-control border-success"
                  type="text"
                  id="displayName"
                  placeholder="Name"
                  name="displayName"
                  required
                  v-model="displayName"
                />
              </section>
              <section class="mt-3 col-sm-9 form-group">
                <label class="form-control-label sr-only" for="email"
                  >Email</label
                >
                <input
                  class="form-control border-success"
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  required
                  name="email"
                  v-model="email"
                />
              </section>
              <section class="mt-3 col-sm-9 form-group">
                <label class="form-control-label sr-only"></label>
                <input
                  class="form-control border-success"
                  type="password"
                  placeholder="Password"
                  v-model="passOne"
                />
              </section>
              <section class="mt-3 col-sm-9 form-group">
                <label class="form-control-label sr-only"></label>
                <input
                  class="form-control border-success "
                  type="password"
                  required
                  placeholder="Repeat password"
                  v-model="passTwo"
                />
              </section>
            </div>
            <div class="form-group text-center mt-5">
              <button class="btn btn-outline-success " type="submit">
                Register
              </button>
            </div>
          </form>
          <p class="text-center mt-2">
            or
            <router-link to="/logincliente">Log in</router-link>
          </p>
        </div>
      </div>
    </div>-->
  </div>
</template>

<style lang="scss" >
body,
html {
  height: 100%;
}
.bg {
  /* The image used */
  background-image: url("../assets/bc10.jpg");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.wrapperForRegistro {
  margin-top: 0px;
  margin-bottom: 80px;
  padding-top: 10%;
  height: 90%;
}

.form-registro {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid green;
  border-radius: 10%;

  .form-registro-heading,
  .form-control-registro {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;

    &:focus {
      z-index: 2;
    }
  }

  input[type="textLogin"] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  input[type="passwordlogin"] {
    margin-bottom: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>

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
      uid: null,
      error: null
    };
  },
  methods: {
    register: function() {
      const info = {
        email: this.email,
        password: this.passOne,
        displayName: this.displayName,
        uid: this.uid
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

            },
            error => {
              this.error = error.message;
            }
          );

        Firebase.auth().onAuthStateChanged(user => {
          if (user) {
            if (user.email == info.email) {
              var UID = user.uid;
              db.collection("user")
                .doc(UID)
                .set({
                  name: info.displayName,
                  email: info.email,
                  profession: "User profession",
                  aboutme: "User aboutme",
                  ubication: "User ubication",
                  gender: "User gender",
                  status: "User status",
                  uid: UID,
                  phone: "000",
                  address: "User address",
                  pictures:
                    "https://firebasestorage.googleapis.com/v0/b/agrovacations-c213d.appspot.com/o/profile%2FDefaultprofileimage.png?alt=media&token=f5a1ab31-7474-47eb-83ba-5488ca711b35",
                  notifications: []
                })
                  .then(() => {
                  this.$router.replace("home");
                  location.reload();
                });
            }
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
