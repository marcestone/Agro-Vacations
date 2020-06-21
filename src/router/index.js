import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginCliente from "../views/LoginCliente.vue";
import PerfilCliente from "../views/PerfilCliente.vue";
import RegistroCliente from "../views/RegistroCliente.vue";
import CrearActividad from "../views/CrearActividad.vue";
import PerfilMiembros from "../views/PerfilMiembros.vue";
import imageHandler from "../views/imageHandler.vue";
import MisActividades from "../views/MisActividades.vue";

import Messages from "../views/Messages.vue";



import Notificaciones from "../views/Notificaciones.vue";


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
    component: PerfilCliente,
    props: true
  },
  {
    path: "/perfilmiembros/:userID",
    name: "PerfilMiembros",
    component: PerfilMiembros,
    props: true
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
    path: "/imageHandler",
    name: "ImageHandler",
    component: imageHandler
  },
  {
    path: "/misactividades",
    name: "MisActividades",
    component: MisActividades
  },
  {

    path: "/messages",
    name: "Messages",
    component: Messages
    },
  {

    path: "/notificaciones",
    name: "Notificaciones",
    component: Notificaciones

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
