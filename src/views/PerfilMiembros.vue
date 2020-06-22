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
  height: 100%;
  background-size: cover;
}

.conten::before{
  width: 100%;
  height: 100%;
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