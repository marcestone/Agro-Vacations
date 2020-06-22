<template>
  <div class="conten">
    <div class="row justify-content-center">
      <div class="col-6" align="center">
        <div class="box" id="boxTitle_">
          <div class="h5" id="title">
            <b-icon icon="person-fill" aria-hidden="true"></b-icon>
            <br />
            {{host.name}}
          </div>
          <div class="h1" id="subtitle" style="color: black; font-size: 16px;">{{host.profession}}</div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-4" align="center">
        <div class="box" id="boxImage">
          <b-img :src="host.pictures" width="200" height="200" style="width: 100%; height: 100%;"></b-img>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-6" align="center">
        <div class="box" id="rectangule1">
          <b-img src="../assets/RECTANGULO-VERDE.png" width="60" height="30"></b-img>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-6" align="center">
        <div class="box" id="pre-aboutme">
          <div class="h3" id="title_short">Mi descripción</div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-6" align="center">
        <div class="box" id="boxAboutMe1">
          <p align="justify" id="sinrellenar" style=" color: black;">{{host.aboutme}}</p>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-6" align="center">
        <div class="box" id="rectangule2">
          <b-img src="../assets/RECTANGULO-VERDE.png" width="60" height="30"></b-img>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-6" align="center">
        <div class="box" id="pre-personalInfo">
          <div class="h3" id="title_short">Información personal</div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-5" style="width: 50%;padding-right: 1%;padding-top:20px">
        <div class="box" id="personalInfo">
          <p style="text-align:right;">
            Teléfono:
            <br />Estado:
            <br />Género:
            <br />Ubicación:
            <br />Dirección
            <br />e-mail:
          </p>
        </div>
      </div>
      <div class="col" align="center" style="max-width:5%; min-width:60px">
        <div class="box" id="boxImage04">
          <b-img src="../assets/Rect.png" width="40" height="190"></b-img>
        </div>
      </div>
      <div class="col-5" style="width: 50%;padding-right: 1%;padding-top:20px">
        <div class="box" id="personalInfo2">
          <p id="tabla" style="text-align:left;">
            {{host.phone}}
            <br />
            {{host.status}}
            <br />
            {{host.gender}}
            <br />
            {{host.ubication}}
            <br />
            {{host.address}}
            <br />
            {{host.email}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../db.js";
export default {
  name: "profile",
  props: ["client", "userID"],
  data() {
    return {
      host: {}
    };
  },
  mounted() {
    db.collection("user")
      .doc(this.userID)
      .get()
      .then(snapshot => {
        //const snapData = this.client;

        // console.log(this.userID,doc.data().uid, this.userID == doc.data().uid);

        this.host = {
          uid: snapshot.id,
          phone: snapshot.data().phone,
          name: snapshot.data().name,
          email: snapshot.data().email,
          address: snapshot.data().address,
          pictures: snapshot.data().pictures,
          aboutme: snapshot.data().aboutme,
          profession: snapshot.data().profession,
          ubication: snapshot.data().ubication,
          gender: snapshot.data().gender,
          status: snapshot.data().status
        };

        //this.host = snapData;
      });
  },
  methods: {}
};
</script>

<style lang="scss">
.conten {
  background-image: url("../assets/margen1.png");
  width: 100%;
  height: 100%;
  background-size: cover;
}

.conten::before {
  width: 100%;
  height: 100%;
  position: absolute;
  size: cover;
  opacity: 0.3;
}

.conten:target .container-all {
  height: 587px;
}

.container-all:target {
  background: rgba(0, 0, 0, 0.8);
  visibility: visible;
  opacity: 1;
}

.container-all:target .popup {
  top: 50%;
  left: 50%;
  transform: rotate(0deg) translate(-50%, -50%);
  visibility: visible;
}

.container-all:target #background-popup {
  top: 0;
}

#background-popup {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
}

.popup {
  width: 100%;
  max-width: 800px;
  height: 80%;
  position: fixed;
  display: flex;
  background: white;
  visibility: hidden;
  top: -80%;
  left: -80%;
  transform: rotate(90deg) translate(-150%, 230%);
  transition: all 600ms;
}

.img {
  background-image: url("../assets/verde2.jpg");
  width: 30%;
  background-size: cover;
  background-position: center;
}

.container-text {
  width: 70%;
  padding: 50px;
  overflow-y: auto;
}

.container-text h1 {
  font-size: 30px;
}

.container-text p {
  margin-top: 20px;
  font-size: 16px;
}

.buttonclose {
  width: 50px;
  height: 50px;
  position: absolute;
  right: -20px;
  top: -20px;
  padding: 20px;
  background: rgb(0, 0, 0);
  color: rgba(255, 255, 255, 0.842);
  border-radius: 50%;
  line-height: 10px;
}

.buttonclose:hover {
  background-color: #bb0505;
  color: rgb(255, 255, 255);
  text-decoration: none;
}

#sinrellenar {
  color: #48574a8f;
  font-size: 16px;
  font-family: "Lucida Sans";
}

#icon {
  width: 15px;
  height: 15px;
}
#title {
  color: #0d8517;
  font-size: 40px;
  font-family: "Lucida Sans";
  font-weight: bold;
  text-align: center;
}
#subtitle {
  color: #405541c9;
  font-size: 15px;
  font-family: "Courier New";
  text-align: center;
}
#title_short {
  color: #0d8517;
  font-size: 15px;
  font-family: "Lucida Sans";
}
#box00 {
  position: absolute;
  top: 82px;
  left: 0px;
  width: 880px;
  height: 160px;
  border: #ffffff00;
  background-color: #ffffff00;
}

#boxTitle_ {
  position: relative;
  border: #ffffff00;
  background-color: #ffffff00;
  margin-top: 40px;
}
#boxImage {
  position: relative;
  border-radius: 0px;
  border: 1px solid #363636a8;
  background-color: #dfdfdf00;
  min-width: 33%;
  min-height: 33%;
  max-width: 210px;
  max-height: 210px;
}
#boxAboutMe1 {
  position: relative;
  border-radius: 50px;
  border: #ffffff00;
  background-color: #c7c7c700;
}
#rectangule1 {
  position: relative;
}
#rectangule2 {
  position: relative;
  border-radius: 0px;
}
#boxImage04 {
  position: relative;
  border-radius: 0px;
}
#pre-aboutme {
  position: relative;
  border-radius: 0px;
}
#pre-personalInfo {
  position: relative;
  border-radius: 0px;
}
#personalInfo {
  position: relative;
  border-radius: 0px;
}
#personalInfo2 {
  position: relative;
  border-radius: 0px;
}
#boxButton1 {
  position: relative;

  border-radius: 0px;
}
.buttonSsa {
  background-color: #0d8517; /* Green */
  border: none;
  color: white;
  padding: 0px 0px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  margin: 0px 0px;
  transition-duration: 0.4s;
  text-decoration: none;
  border-radius: 50px;
  cursor: pointer;
}
.button1Ss {
  background-color: white;
  color: black;
  border: 2px solid #0d8517;
  text-decoration: none;
  width: 75px;
  height: 25px;
}
.button1Ss:hover {
  background-color: #0d8517;
  color: white;
  text-decoration: none;
  width: 75px;
  height: 25px;
}

.image-profile {
  margin: 5% 15% 5% 15%;
}
</style>