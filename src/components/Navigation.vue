<template>
  <div>
    <header class="header">
      <div class="shadow-lg  bg-white rounded">
        <b-navbar toggleable="lg" type="light" variant="white">
          <b-navbar-brand to="/">
            <img
              src="../assets/BannerB.png"
              class="d-inline-block align-top"
              height="50px"
            />
          </b-navbar-brand>
          
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
          <b-nav-item id="welcome" href="#" to="/perfilcliente" v-if="client" > 
            Welcome back <span class="font-weight-bold text-success">{{client}}</span> 
            </b-nav-item>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-navbar-nav>

                <b-nav-item href="#" to="/logincliente" v-if="!client"
                  ><b-icon icon="person-fill"></b-icon> Log In</b-nav-item
                >
                <b-nav-item href="#" to="/registrocliente" v-if="!client"
                  ><b-icon icon="person-plus-fill"></b-icon> Sign In</b-nav-item
                >
                <b-nav-item href="#" to="/"
                  ><b-icon icon="exclamation-circle"></b-icon> Help</b-nav-item
                >
              </b-navbar-nav>

              <b-nav-item-dropdown text="Me" right v-if="client">
                <template v-slot:button-content>
                  <b-icon icon="person-fill" aria-hidden="true"></b-icon> Me
                </template>
                <b-dropdown-item href="#" to="/perfilcliente">
                  <b-icon icon="person-lines-fill"></b-icon>
                  Profile</b-dropdown-item
                >
                <b-dropdown-item href="#">
                  <b-icon icon="calendar"></b-icon> My
                  Activities</b-dropdown-item
                >
                <b-dropdown-item href="#">
                  <b-icon icon="gear-fill"></b-icon> Settigs</b-dropdown-item
                >
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="#" variant="danger" @click="$emit('logout')">
                  <b-icon icon="power"></b-icon> Log Out</b-dropdown-item
                >
              </b-nav-item-dropdown>

              <router-link
                type="button"
                class="btn btn-success"
                style="margin-right: 60px; margin-left: 50px; "
                to="/registrocliente"
                v-if="!client"
                >Discover adventures</router-link
              >
              <router-link
                type="button"
                class="btn btn-success"
                style="margin-right: 60px; margin-left: 50px; "
                to="/registrocliente"
                v-if="client"
                >Publish Now</router-link
              >
              
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "Home"
};
</script>
<style lang="scss">
.header .navbar {
  background-color: transparent !important;
}

.navbar-light .navbar-nav .nav-link {
  color: #000000 !important;
}

.navbar {
  -webkit-box-shadow: 0 8px 6px -6px #999;
  -moz-box-shadow: 0 8px 6px -6px #999;
  box-shadow: 0 8px 6px -6px #999;
}

.navbar-expand-md .navbar-nav .nav-link {
  padding-right: 0.9rem !important;
  padding-left: 0.9rem !important;
}
.text-info {
    color: #47803e !important;
}
</style>

<script>
export default {
  name: "navigation",
  props: ["client"]
};
</script>