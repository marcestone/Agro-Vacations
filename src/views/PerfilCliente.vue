<template>
  <div class="w3-container">
      <b-img
        src="../assets/backgroundProfile.jpg"
        width="1348"
        height="1180"
        aling="top"
      ></b-img>
      <div class="box" id="boxTitle">
        <div class="h5" id="title">
          <b-icon icon="person-fill" aria-hidden="true"></b-icon>
          <br>{{client.displayName}}
        </div>
        <div class="h1" id="subtitle">
          Profesion
        </div>   
      </div>

      <div class="box" id="boxImage">
        <b-img
        src="../assets/defaultprofile.png"
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
        <p align="center" id="sinrellenar">
          About me...
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
          Telefono: <br>
          Estado civil: <br>
          Género: <br>
          Ubicación: <br>
          e-mail: 
        </p>
      </div> 

      <div class="box" id="personalInfo2">
        <p style='text-align:left' id="sinrellenar">
          Telefono usuario <br>
          Estado civil usuario <br>
          Sexo usuario <br>
          Ubicación usuario <br>
          {{client.email}} 
        </p>
      </div>

      <div class="box" id="boxImage4">
        <b-img
        src="../assets/Rect.png"
        width="40"
        height="150"
        ></b-img>
      </div>

      <div class="box" id="boxButton">
        <a href="#modal" class="buttonSa button1S">
          Editar
          <b-icon-pencil-square id="icon"></b-icon-pencil-square> 
        </a>
      </div>

  </div>
</template>


<style lang="scss">

#sinrellenar{
  color: #48574a8f;
  font-size: 16px;
  font-family: 'Lucida Sans';
}

#icon{
  width: 15px;
  height: 15px;
}

#title {
  color: #0d8517;
  font-size: 50px;
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
  left: 235px;
  width: 880px;
  height: 160px;
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
  background-color: #dfdfdf00;
}

#boxAboutMe {
  position: absolute;
  top: 700px;
  left: 245px;
  width: 880px;
  height: 150px;
  border-radius: 50px;
  border: #ffffff00;
  background-color: #c7c7c700;
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
  top: 988px;
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
  height: 50px;
  border-radius: 0px;

}

.buttonSa {
  background-color: #0d8517; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  text-decoration: none;
  border-radius: 50px;
  cursor: pointer;
}

.button1S {
  background-color: white; 
  color: black; 
  border: 2px solid #0d8517;
  text-decoration: none;
}

.button1S:hover {
  background-color:#0d8517;
  color: white;
  text-decoration: none;
}
</style>

<script>
export default {
  name: "profile",
  props: ["client"]
};
</script>