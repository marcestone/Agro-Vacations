<template>
  <div>
    <div class="shadow bg-white rounded">
      
      <b-navbar toggleable="md" type="dark" variant="primary">
        
        <b-navbar-brand  to="/">
          <img src="https://placekitten.com/g/40/40" class="d-inline-block align-top" alt="Kitten" >
          AgroVacations
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">  
            
            <b-navbar-nav>
              <b-nav-item href="#" to="/logincliente" ><b-icon icon="person-fill"></b-icon> 
              Log In</b-nav-item>
              <b-nav-item href="#" to="/registrocliente"><b-icon icon="person-plus-fill"></b-icon> 
              Sign In</b-nav-item>
              <b-nav-item href="#" to="/"><b-icon icon="exclamation-circle"></b-icon>
              Help</b-nav-item>
            </b-navbar-nav>

            <b-nav-item-dropdown text="Me" right > 
              <template v-slot:button-content>
                <b-icon icon="person-fill" aria-hidden="true"></b-icon> Me
                </template>
              <b-dropdown-item href="#" to="/perfilcliente">
                <b-icon icon="person-lines-fill"></b-icon> Profile</b-dropdown-item>
              <b-dropdown-item href="#">
                <b-icon icon="calendar"></b-icon> My Activities</b-dropdown-item>
              <b-dropdown-item href="#">
                <b-icon icon="gear-fill"></b-icon> Settigs</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#" variant="danger">
                <b-icon icon="power"></b-icon> Log Out</b-dropdown-item>

            </b-nav-item-dropdown>
            
            <router-link type="button" class="btn btn-dark" to="/registrocliente"
                >Start Now</router-link> 
            <router-link type="button" class="btn btn-dark" to="/registrocliente"
                >Publish Now</router-link>
                
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</div>
</template>
<script>

export default {
  name: "Home"
};
</script>
<style>
 
</style>
