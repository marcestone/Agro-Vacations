<template>
  <div class="conten">
      <div class="box" id="boxTitle">
        <div class="h5" id="title">
          <b-icon icon="person-fill" aria-hidden="true"></b-icon>
          <br>{{host.name}}
        </div>
        <div class="h1" id="subtitle"  style='color: black; font-size: 16px;'>
          {{host.profession}}
        </div>   
      </div>

      <div class="box" id="boxImage">
        <b-img
        :src="host.pictures"
        width="252"
        height="252"
        ></b-img>  
      </div>

      <div class="box" id="rectangule1">
        <b-img
        src="../assets/RECTANGULO-VERDE.png"
        width="60"
        height="30"
        ></b-img>
      </div>

      <div class="box" id="pre-aboutme">
        <div class="h3" id="title_short">
          About me
        </div>
      </div>      

      <div class="box" id="boxAboutMe">
        <p align="justify" id="sinrellenar" style=' color: black;'>
          {{host.aboutme}}
        </p> 
      </div>

      <div class="box" id="rectangule2">
        <b-img
        src="../assets/RECTANGULO-VERDE.png"
        width="60"
        height="30"
        ></b-img>
      </div>

      <div class="box" id="pre-personalInfo">
        <div class="h3" id="title_short">
          Personal INFO
        </div>
      </div>

      <div class="box" id="personalInfo">
        <p style='text-align:right'>
          
          
          Phone: <br>
          Status: <br>
          Gender: <br>
          Ubication: <br>
          Address <br>
          e-mail: 
        </p>
      </div> 

      <div class="box" id="personalInfo2">
        <p style='text-align:left'>
          
          
          {{host.phone}} <br>
          {{host.status}} <br>
          {{host.gender}} <br>
          {{host.ubication}} <br>
          {{host.address}} <br>
          {{host.email}} 
        </p>
      </div>

      <div class="box" id="boxImage4">
        <b-img
        src="../assets/Rect.png"
        width="40"
        height="190"
        ></b-img>
      </div>

  </div>
</template>

<script>
import db from "../db.js";
export default {
  name: "profile",
  props: ["client","userID"],
  data(){
    return{
      host: {}
    }
  },
  mounted(){
    db.collection("user").doc(this.userID).get().then(snapshot => {
        //const snapData = this.client;
        
         // console.log(this.userID,doc.data().uid, this.userID == doc.data().uid);
          
              this.host={
              uid: snapshot.id,
              phone: snapshot.data().phone,
              name:snapshot.data().name,
              email: snapshot.data().email,
              address: snapshot.data().address,
              pictures: snapshot.data().pictures,
              aboutme: snapshot.data().aboutme,
              profession: snapshot.data().profession,
              ubication: snapshot.data().ubication,
              gender: snapshot.data().gender,
              status: snapshot.data().status,    
              }
            
          
        
        //this.host = snapData;
        
      });
  },
  methods: {
  },
};
</script>

<style lang="scss">
.conten{
  background-image: url("../assets/margen1.png");
  width: 100%;
  height: 1200px;
  background-size: cover;
}

.conten::before{
  width: 100%;
  height: 1200px;
  position: absolute;
  size: cover;
  opacity: 0.3;
}
#icon{
  width: 15px;
  height: 15px;
}

#title {
  color: #0d8517;
  font-size: 40px;
  font-family: 'Lucida Sans';
  font-weight: bold;
  text-align: center;
}

#subtitle {
  color: #405541c9;
  font-size: 15px;
  font-family: 'Courier New';
  text-align: center;
}

#title_short {
  color: #0d8517;
  font-size: 15px;
  font-family: 'Lucida Sans';
}

#boxTitle {
  position: absolute;
  top: 100px;
  left: 245px;
  width: 850px;
  height: 130px;
  border: #ffffff00;
  background-color: #ffffff00;
}

#boxImage {
  position: absolute;
  top: 280px;
  left: 548px;
  width: 254px;
  height: 254px;
  border-radius: 0px;
  border: 1px solid #363636a8;
  background-color: #ffffffda;
}

#boxAboutMe {
  position: absolute;
  top: 700px;
  left: 245px;
  width: 880px;
  height: 380px;
  border-radius: 50px;
  border: #11131200;
  background-color: #ffffffda;
}

#rectangule1 {
  position: absolute;
  top: 580px;
  left: 648px;
  width: 54px;
  height: 54px;
}

#rectangule2 {
  position: absolute;
  top: 850px;
  left: 648px;
  width: 54px;
  height: 54px;
  border-radius: 0px;
}

#boxImage4 {
  position: absolute;
  top: 980px;
  left: 660px;
  width: 50px;
  height: 200px;
  border-radius: 0px;
}

#pre-aboutme {
  position: absolute;
  top: 630px;
  left: 642px;
  width: 100px;
  height: 54px;
  border-radius: 0px;
}

#pre-personalInfo {
  position: absolute;
  top: 900px;
  left: 625px;
  width: 190px;
  height: 54px;
  border-radius: 0px;
}

#personalInfo {
  position: absolute;
  top: 1000px;
  left: 485px;
  width: 150px;
  height: 150px;
  border-radius: 0px;

}

#personalInfo2 {
  position: absolute;
  top: 1000px;
  left: 725px;
  width: 200px;
  height: 150px;
  border-radius: 0px;

}

#boxButton {
  position: absolute;
  top: 1200px;
  left: 640px;
  width: 200px;
  height: 150px;
  border-radius: 0px;

}

.buttonSa {
  background-color: #0d8517; /* Green */
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1S {
  background-color: white; 
  color: black; 
  border: 2px solid #0d8517;
}

.button1S:hover {
  background-color:#0d8517;
  color: white;
}
</style>