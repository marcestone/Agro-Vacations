<template>
<div>
    <form class="mt-3" @submit.prevent="login">
      <div class="container">
        <h4 class="text-center font-weight-light mb-3">Ingresa como entidad</h4>
        <div class="row justify-content-center">
          
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
                  <button
                    class="btn btn-primary"
                    type="submit"
                  >Ingresar</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </form>
    <p class="text-center mt-2">
      o
      <router-link to="/registroentidad">regístrate</router-link>
      ahora
    </p>
  </div>
</template>
<script>
import Firebase from "firebase";
export default {
  data: function(){
    return{
      email:"",
      password:"",
      error:""
    };
  },
  methods:{
    login: function(){
      const info = {
        email:this.email,
        password: this.password
      };

      Firebase.auth()
        .signInWithEmailAndPassword(info.email, info.password)
        .then(
          ()=>{
            this.$router.push("home");
          },
          error =>{
            this.error = error.message;
          }
        )
    }
  }
}
</script>
