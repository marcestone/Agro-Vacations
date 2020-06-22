<template>
  <!-- <div class="bg-imgForLogin">
    <form @submit.prevent="login" class="containerForLogin">
      <h1>Log in</h1>

      <label for="email">
        <b>Email</b>
      </label>
      <input
        required
        type="text"
        class="form-control"
        id="email"
        placeholder="Correo electrónico"
        v-model="email"
      />

      <label for="psw">
        <b>Password</b>
      </label>

      <input
        required
        class="form-control"
        type="password"
        placeholder="Contraseña"
        v-model="password"
      />
      <div class="box" id="boxerror">
        <div class="alert alert-danger " v-if="error">Usuario y/o contraseña incorrectos</div>
      </div>

      <button type="submit" class="btnForLogin" >Login</button>
    </form>
  </div>-->

  <div class="bgLogin">
    
    <div class="wrapperForLogin">
      <form class="form-signin" @submit.prevent="login">
        <h2 class="form-signin-heading">Ingresar</h2>
        <input
          type="textLogin"
          class="form-control"
          placeholder="Correo electrónico"
          v-model="email"
        />
        <input type="password" class="form-control" placeholder="Contraseña" v-model="password" />
        <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>
    </div>
  </div>
  <!--<div class="contenL" >
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
          <router-link to="/registrocliente" id="rl">
          register
          </router-link>
          now
        </p>
        </div>
      </div>
  </div>-->
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
.contenL {
  background-image: url("../assets/backgroundLogin.jpg");
  width: 100%;
  height: 587px;
  background-size: cover;
}

#rl {
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
  position: absolute;
  top: 10px;
  left: 5px;
  width: 350px;
  height: 20px;
  border: 3px solid #ffffff00;
  background-color: #f7f7f700;
}

#boxLogin {
  position: absolute;

  top: 170px;
  left: 460px;
  width: 460px;
  height: 360px;
  border-radius: 70px;
  border: 3px solid #3b3b3bfd;
  background-color: #d1cdcd;
}

#boxLogin2 {
  position: absolute;
  top: 20px;
  left: 87px;
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

#boxButton {
  position: absolute;
  top: 370px;
  left: 400px;
  width: 300px;
  height: 300px;
}

.wrapperForLogin {
  margin-top: 0px;
  margin-bottom: 80px;
  padding-top: 10%;
  padding-bottom: 10%;
  
}

.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid green;
  border-radius: 10%;
  
  .form-signin-heading,
  .checkbox {
    margin-bottom: 30px;
  }

  .checkbox {
    font-weight: normal;
  }

  .form-control {
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

.bgLogin {
  /* The image used */
  background-image: url("../assets/backgroundLogin.jpg");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
