<template>
  <div class="w3-container">
    <div class="wrapper">
      <b-img src="../assets/background.jpg" width="1366" height="578" aling="top" ></b-img>
      <div class="box" id="boxLogin">
        <form class="mt-4" @submit.prevent="login">
          <div class="row justify-content-center">
            <h4 class="text-center font-weight-light mb-3">Ingresa como cliente</h4>
            <div class="card bg-light">
              <div class="card-body">
                <section class="form-group">
                  <div class="col-12 alert alert-danger px-3" v-if="error">{{error}}</div>
                  <label class="form-control-label sr-only" for="Email">Email</label>
                  <input
                    required
                    class="form-control"
                    type="email"
                    id="email"
                    placeholder="Correo electrónico"
                    v-model="email"
                  />
                </section>
                <section class="form-group">
                  <input
                    required
                    class="form-control"
                    type="password"
                    placeholder="Contraseña"
                    v-model="password"
                  />
                </section>
                <div class="form-group text-center mt-4">
                  <button class="btn btn-primary" type="submit">Ingresar</button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <p class="text-center mt-2">
          o
          <router-link to="/registrocliente">regístrate</router-link> ahora
        </p>
      </div>
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
    position:relative;
}
#boxLogin{
    position:absolute;
    top:170px;
    left:483px;
    width:400px;
    height:350px;
    border-radius: 5px;
    border:2px solid #61b254;
    background-color: #f5f4f3;
}



</style>