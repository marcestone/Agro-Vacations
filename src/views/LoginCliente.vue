<template>
  <div class="w3-container">
      <b-img
        src="../assets/91352.jpg"
        width="1366"
        height="587"
        aling="top"
      ></b-img>
      <div class="box" id="boxLogin">
        <form class="mt-4" @submit.prevent="login">
          <div class="row justify-content-center">
            <h4>
              Log into your account
            </h4>
            <div class="card bg-light">
              <div class="card-body">
                <section class="form-group">
                  <div class="col-12 alert alert-danger px-3" v-if="error">
                    {{ error }}
                  </div>
                  <label class="form-control-label sr-only" for="Email"
                    >Email</label
                  >
                  <input
                    required
                    class="form-control"
                    type="email"
                    id="email"
                    placeholder="Correo electrónico"
                    v-model="email"
                  />
                </section>
                <section class="form-group" variant="success">
                  <input
                    required
                    class="form-control"
                    type="password"
                    placeholder="Contraseña"
                    v-model="password"
                  />
                </section>
                <div class="form-group text-center mt-4">
                  <b-button pill variant="success" size="lg" type="submit">
                    <hbotton>Log in</hbotton>
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <p class="text-center mt-1">
          or
          <router-link to="/registrocliente">register</router-link> now
        </p>
      </div>
    </div>
</template>

<script>
import Firebase from "firebase";
export default {
  data: function() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login: function() {
      const info = {
        email: this.email,
        password: this.password
      };

      Firebase.auth()
        .signInWithEmailAndPassword(info.email, info.password)
        .then(
          
          () => {
            this.$router.push("home");
          },
          error => {
            this.error = error.message;
          }
        );
    }
  }
};
</script>
<style lang="scss">
.wrapper {
  position: relative;
}
h4 {
  color: #105710;
  font-size: 23px;
  font-family: Impact;
  font-weight: normal;
}
#boxLogin {
  position: absolute;
  top: 200px;
  left: 483px;
  width: 400px;
  height: 340px;
  border-radius: 70px;
  border: 3px solid #eaf1ec;
  background-color: #ebfff4ec;
}

</style>
