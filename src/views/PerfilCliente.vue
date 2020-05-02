<template>
  <div class="w3-container">
      <b-img
        src="../assets/margen_p.jpg"
        width="1348"
        height="1280"
        aling="top"
      ></b-img>
      <div class="box" id="boxProfile">

        <h5 align="center" class="bold" color="Teal">
          <br>{{client.displayName}}
        </h5>

        <h1 align="center" class="bold" color="Teal">
          Profesión
        </h1>   

      </div>

      <div class="box" id="boxImage">
        <b-img
        src="../assets/foto_perfil.jpg"
        width="250"
        height="250"
        ></b-img>  
      </div>

      <div class="box" id="boxImage2">
        <b-img
        src="../assets/RECTANGULO-VERDE.png"
        width="60"
        height="30"
        ></b-img>
      </div>

      <div class="box" id="box3">
        <h3>
          About me
        </h3>
      </div>      

      <div class="box" id="boxProfile2" >
        <p align="center">
          Estoy interesad@ en actividades de campo como: ordeñar vacas, montar a caballo, sembrado, caminatas, senderismo, etc.
          Soy padre de familia, tengo 2 hijos y realizamos estas actividades juntos cada vez que se presenta la oportunidad.
        </p> 
      </div>

      <div class="box" id="boxImage3">
        <b-img
        src="../assets/RECTANGULO-VERDE.png"
        width="60"
        height="30"
        ></b-img>
      </div>

      <div class="box" id="box4">
        <h3>
          Personal INFO
        </h3>
      </div>

      <div class="box" id="Info">
        <p style='text-align:right'>
          Telefono: <br>
          Estado civil: <br>
          Ubicación: <br>
          e-mail: 
        </p>
      </div> 

      <div class="box" id="Info2">
        <p style='text-align:left'>
          +57 3333333333 <br>
          Casado <br>
          Bogotá <br>
          {{client.email}} 
        </p>
      </div>

      <div class="box" id="boxImage4">
        <b-img
        src="../assets/Rect.png"
        width="40"
        height="100"
        ></b-img>
      </div>

      <div class="box" id="button">
        <button class="button button1">Edit</button>
      </div>

  </div>
</template>


<style lang="scss">

h5 {
  color: #68b313;
  font-size: 50px;
  font-family: 'Lucida Sans';
  font-weight: bold;
}

h3 {
  color: #68b313;
  font-size: 15px;
  line-height:0px;
  font-family: 'Lucida Sans';
}

h2 {
  color: #000000cc;
  font-size: 15px;
  line-height:0px;
  font-family: 'Courier New';
}

h1 {
  color: #405541c9;
  font-size: 15px;
  line-height:0px;
  font-family: 'Courier New';
}

#boxProfile {
  position: absolute;
  top: 100px;
  left: 250px;
  width: 880px;
  height: 580px;
  border-radius: 50px;
  border: 5px solid #eff5f100;
  background-color: #ffffffda;
}

#boxProfile2 {
  position: absolute;
  top: 700px;
  left: 270px;
  width: 880px;
  height: 380px;
  border-radius: 50px;
  border: 5px solid #11131200;
  background-color: #ffffffda;
}

#boxImage {
  position: absolute;
  top: 280px;
  left: 563px;
  width: 254px;
  height: 254px;
  border-radius: 0px;
  border: 2px solid #363636a8;
  background-color: #ffffffda;
}

#boxImage2 {
  position: absolute;
  top: 580px;
  left: 663px;
  width: 54px;
  height: 54px;
  border-radius: 0px;
}

#boxImage3 {
  position: absolute;
  top: 850px;
  left: 663px;
  width: 54px;
  height: 54px;
  border-radius: 0px;
}

#boxImage4 {
  position: absolute;
  top: 1000px;
  left: 675px;
  width: 50px;
  height: 200px;
  border-radius: 0px;
}

#box3 {
  position: absolute;
  top: 630px;
  left: 657px;
  width: 100px;
  height: 54px;
  border-radius: 0px;
}

#box4 {
  position: absolute;
  top: 900px;
  left: 640px;
  width: 190px;
  height: 54px;
  border-radius: 0px;
}

#Info {
  position: absolute;
  top: 1000px;
  left: 500px;
  width: 150px;
  height: 150px;
  border-radius: 0px;

}

#Info2 {
  position: absolute;
  top: 1000px;
  left: 740px;
  width: 200px;
  height: 150px;
  border-radius: 0px;

}

#button {
  position: absolute;
  top: 1200px;
  left: 660px;
  width: 200px;
  height: 150px;
  border-radius: 0px;

}

.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white; 
  color: black; 
  border: 2px solid #68b313;
}

.button1:hover {
  background-color:#68b313;
  color: white;
}

</style>

<script>

export default {
  name: "profile",
  props: ["client"]
};

</script>