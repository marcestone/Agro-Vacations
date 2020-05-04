<template>
  <div class="w3-container">
      <b-img



        src="../assets/backgroundLogin.jpg"
        width="1366"
        height="587"

        aling="top"
      ></b-img>
      <div class="box" id="boxLogin">
        <form class="mt-4" @submit.prevent="login">
          <div class="row justify-content-center">
            <div class="box" id="boxLogin2">
            <div class="h4" id="h4_">
              Log into your account
            </div>
            </div>
            <div class="box" id="boxLogin3">
              <div class="card-body">
                <section class="form-group">
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
                      type="email"
                      id="email"
                      placeholder="Correo electrónico"
                      v-model="email"
                    />
                  </div>
                </section>
                <section class="form-group" variant="success">
                  <div class="box" id="boxPssw">
                    <input
                    required
                    class="form-control"
                    type="password"
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
          </div>
        </form>
        <div class="box" id="boxLogin4">
        <p class="text-center mt-1">
          or
          <router-link to="/registrocliente">
          register
          </router-link>
          now
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
  position: relative;
}

#h4_ {
  color: #013f01;
  font-size: 30px;
  font-family: Impact;
  font-weight: normal;
}

#boxerror {
  position: absolute;
  top: 10px;
  left: 0px;
  width: 350px;
  height: 20px;
  border: 3px solid #ffffff00;
  background-color: #f7f7f700;
}

#boxLogin {
  position: absolute;


  top: 170px;
  left: 450px;
  width: 460px;
  height: 360px;
  border-radius: 70px;
  border: 3px solid #ffffff;
  background-color: #f7f7f7fd;
}

#boxLogin2 {
  position: absolute;
  top: 20px;
  left: 100px;
  width: 300px;
  height: 300px;
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxLogin3 {
  position: absolute;
  top: 50px;
  left: 80px;
  width: 350px;
  height: 300px;
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxLogin4 {
  position: absolute;
  top: 310px;
  left: 80px;
  width: 300px;
  height: 100px;
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxB {
  position: absolute;
  top: 190px;
  left: 100px;
  width: 300px;
  height: 100px;
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxLogin5 {
  position: absolute;
  top: 390px;
  left: 400px;
  width: 300px;
  height: 100px;

  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxUser {
  position: absolute;
  top: 80px;
  left: 00px;
  width: 300px;
  height: 300px;
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxPssw {
  position: absolute;
  top: 130px;
  left: 00px;
  width: 300px;
  height: 300px;
  border-radius: 70px;
  border: 3px solid #eaf1ec00;
  background-color: #f7f7f700;
}

#boxButton{
  position: absolute;
  top: 370px;
  left: 400px;
  width: 300px;
  height: 300px;
}
</style>
