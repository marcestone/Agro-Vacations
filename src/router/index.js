import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginCliente from "../views/LoginCliente.vue";
import PerfilCliente from "../views/PerfilCliente.vue";
import EditarPerfil from "../views/EditarPerfil.vue";
import RegistroCliente from "../views/RegistroCliente.vue";
import CrearActividad from "../views/CrearActividad.vue";
import MisActividades from "../views/MisActividades.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/logincliente",
    name: "LoginCliente",
    component: LoginCliente
  },
  {
    path: "/perfilcliente",
    name: "PerfilCliente",
    component: PerfilCliente
  },
  {
    path: "/editarperfil",
    name: "EditarPerfil",
    component: EditarPerfil
  },
  {
    path: "/registrocliente",
    name: "RegistroCliente",
    component: RegistroCliente
  },
  {
    path: "/crearactividad",
    name: "CrearActividad",
    component: CrearActividad
  },
  {
    path: "/misactividades",
    name: "MisActividades",
    component: MisActividades
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  routes
});

export default router;
