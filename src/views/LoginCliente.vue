<template>
  <div class="contenL" >
      <div class="row justify-content-center">
        <div class="col" align="center" style="max-width:30%;min-width:400px">
          <div class="box" id="boxLogin">
            <form class="mt-4" @submit.prevent="login">
              
              
                <div class="box" id="boxLogin2">
                <div class="h4" id="h4_">
                  Log into your account
                </div>
                </div>
                <div class="box" id="boxLogin3">
                  <div class="card-body" style="padding-bottom:0">
                    <section class="form-group" style="margin:0">
                      <div class="box" id="boxerror">
                        <div class="col-10 alert alert-danger px-3" v-if="error">
                          Usuario y/o contraseña incorrectos
                        </div>
                      </div>
                      <div class="box" id="boxUser">
                        <label class="form-control-label sr-only" for="Email"
                          >Email
                        </label>
                        <input
                          required
                          class="form-control"
                          style="margin-bottom:0"
                          type="email"
                          id="email"
                          placeholder="Correo electrónico"
                          v-model="email"
                        />
                      </div>
                    </section>
                    <section class="form-group" variant="success" style="margin:0">
                      <div class="box" id="boxPssw">
                        <input
                        required
                        class="form-control"
                        type="password"
                        style="margin-bottom:0"
                        placeholder="Contraseña"
                        v-model="password"
                      />
                      </div>
                    </section>
                    <div class="box" id="boxB">
                      <b-button pill variant="success" size="lg" type="submit">
                        <hbotton>Log in</hbotton>
                      </b-button>
                    </div>
                  </div>
                </div>
            </form>
            <div class="box" id="boxLogin4">
            <p class="text-center mt-1">
              or
              <router-link to="/registrocliente" id="rl">
              register
              </router-link>
              now
            </p>
            </div>
          </div>
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

.contenL{
  background-image: url("../assets/backgroundLogin.jpg");
  background-size: cover;
  height: 90%;
  padding: 10% 0 10% 0;
}

#rl{
  text-decoration: none;
}

.wrapper {
  position: relative;
}

#h4_ {
  color: #051a05;
  font-size: 33px;
  font-family: Impact;
  font-weight: normal;
}

#boxerror {
  border: 3px solid #ffffff00;
  background-color: #f7f7f700;
}

#boxLogin {
  border-radius: 70px;
  border: 3px solid #3b3b3bfd;
  background-color: #d1cdcd;
}

#boxLogin2 {
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxLogin3 {
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxLogin4 {
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxB {
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxLogin5 {
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxUser {
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxPssw {
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxButton{
  width: 300px;
  height: 300px;
}
</style>