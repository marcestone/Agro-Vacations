<template>
  <div class="conten">
      <div class="box" id="boxTitle">
        <div class="h5" id="title">
          <b-icon icon="person-fill" aria-hidden="true"></b-icon>
          <br>{{client.displayName}}
        </div>
        <div class="h1" id="subtitle" style='color: black; font-size: 20px;'>
        </div>   
      </div>

      <div class="box" id="boxImage">
        <b-img
          :src= "im"
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
        <p align="center" id="sinrellenar" style=' color: black;'>

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
        <p style='text-align:right;'>
          Phone: <br>
          Status: <br>
          Gender: <br>
          Ubication: <br>
          Address <br>
          e-mail: 
        </p>
      </div> 

      <div class="box" id="personalInfo2">
          <p id="tabla" style='text-align:left;font-weight: bold;'>

          </p>
      </div>

      <div class="box" id="boxImage4">
        <b-img
        src="../assets/Rect.png"
        width="40"
        height="190"
        ></b-img>
      </div>

      <div class="box" id="boxButton">
        <a href="#editprofile" class="buttonSa button1S">
          Edit
          <b-icon-pencil-square id="icon"></b-icon-pencil-square> 
        </a>
      </div>

      <div class="container-all" id="editprofile">
      <form class="mt-4" @submit.prevent="editprofile_">
        <div class="popup">
          <div class="img">
            <div class="box" id="boxpopupimg">
              <b-img
              id="img_profile"
              :src= "im"
              width="150"
              height="150"
              ></b-img>
                <b-form-file
                  align-h="center"
                  size="sm"
                  placeholder="Upload photo"
                  drop-placeholder="Drop the image file"
                  style="margin-top: 30px;margin-left: -20px;width:450;height:100;"
                  @change="addFile"
                ></b-form-file>
            </div>
          </div>
          <div class="container-text">
            <div class="h3" id="title_short" style="margin-left: 50px; font-weight: bold; font-size: 30px;">
            Edit your profile
            </div>
            <section class="mt-5 col-sm-9 form-group" id="profession_">

            </section>
            <section class="mt-5 col-sm-11 form-group" id="aboutme_">
              
            </section>
            <section class="mt-5 col-sm-9 form-group" id="phone_">

            </section>
            <section class="mt-5 col-sm-9 form-group" id="_status_total">

            </section>
            <section class="mt-5 col-sm-9 form-group" id="gender_">

            </section>
            <section class="mt-5 col-sm-9 form-group" id="ubication_">

            </section>
            <section class="mt-5 col-sm-9 form-group" id="address_">

            </section>
            <div class="form-group text-center mt-5">
              <button class="btn btn-outline-success" type="submit" >
                Save changes
              </button>
            </div>
          </div>
          <a href="#perfilcliente" class="buttonclose">X</a>
        </div> 
      </form>    
    </div>

  </div>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";


export default {
  name: "profile",
  props: ["client"],
  data: function() {
    return {
      profession: "",
      phone: "",
      status: "",
      aboutme: "",
      gender: "",
      ubication: "",
      im:""
    };
  },

  created(){ 
    Firebase.auth().onAuthStateChanged(user => {
          if (user) {
            var uid_ = ''
            var prof_ = ''
            db.collection("user").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              uid_ = `${doc.id}`
              if(user.uid== uid_ && prof_=='' ) {
                  prof_=`${doc.data().profession}`
                  this.im =`${doc.data().pictures}`
                  console.log(this.im)

                  document.getElementById('tabla').innerHTML+=`
                    ${doc.data().phone}
                    <br>${doc.data().status}
                    <br>${doc.data().gender}
                    <br>${doc.data().ubication}
                    <br>${doc.data().address}
                    <br>${doc.data().email}
                    `;
                  document.getElementById('subtitle').innerHTML+=`
                    ${doc.data().profession}
                    `;
                  document.getElementById('sinrellenar').innerHTML+=`
                    ${doc.data().aboutme}
                    `;
                  document.getElementById('profession_').innerHTML+=`
                        <label for="profession" style="font-weight: bold;"
                          >Profession
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          id="profession"
                          placeholder="Ocupation"
                          value="${doc.data().profession}"
                        />
                    `;
                  document.getElementById('aboutme_').innerHTML+=`
                      <label for="aboutme" style="font-weight: bold;"
                        >About me
                      </label>
                      <textarea
                        id="aboutme"
                        rows="6"
                        cols="40"
                        placeholder="Enter a description about you"
                        v-model="aboutme"
                        maxlength="300"
                        
                        
                      >${doc.data().aboutme}</textarea>
                      <p style="font-size: 11px;">max. 300 characters</p>
                    `;
                  document.getElementById('phone_').innerHTML+=`
                      <label for="phone" style="font-weight: bold;"
                          >Phone
                      </label>
                      <input
                        class="form-control"
                        type="number"
                        id="phone"
                        placeholder="Phone"
                        value="${doc.data().phone}"
                        v-model="phone"
                      />
                    `;
                  document.getElementById('ubication_').innerHTML+=`
                    <label for="ubication" style="font-weight: bold;"
                      >Ubication
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      id="ubication"
                      placeholder="Ubication"
                      value="${doc.data().ubication}"
                    />
                    `;
                  document.getElementById('address_').innerHTML+=`
                   <label for="address" style="font-weight: bold;"
                        >Address
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Address"
                      value="${doc.data().address}"
                      id="address"
                    />
                    `;

                    var _status_ = `${doc.data().status}`;

                    if(_status_== 'Single'){
                      document.getElementById('_status_total').innerHTML+=`
              <label for="status" style="font-weight: bold;"
                  >Status
              </label>
              <form >
              <div class="radio">
              <label ><input id="status1" name="status" type="radio"  value="Single" style=" width: 50px;" checked>Single</label>
              </div>
              <div class="radio">
              <label><input id="status2" name="status" type="radio" value="Married" style=" width: 50px;">Married</label>
              </div>
              <div class="radio">
              <label><input id="status3" name="status" type="radio" value="Divorced" style=" width: 50px;" >Divorced</label>
              </div>
              </form>
                      `;
                    }else if(_status_== 'Married')
                      document.getElementById('_status_total').innerHTML+=`
              <label for="status" style="font-weight: bold;"
                  >Status
              </label>
              <form >
              <div class="radio">
              <label ><input id="status1" name="status" type="radio"  value="Single" style=" width: 50px;">Single</label>
              </div>
              <div class="radio">
              <label><input id="status2" name="status" type="radio" value="Married" style=" width: 50px;" checked>Married</label>
              </div>
              <div class="radio">
              <label><input id="status3" name="status" type="radio" value="Divorced" style=" width: 50px;" >Divorced</label>
              </div>
              </form>
                      `;

                    else if(_status_== 'Divorced')
                        document.getElementById('_status_total').innerHTML+=`
              <label for="status" style="font-weight: bold;"
                  >Status
              </label>
              <form >
              <div class="radio">
              <label ><input id="status1" name="status" type="radio"  value="Single" style=" width: 50px;">Single</label>
              </div>
              <div class="radio">
              <label><input id="status2" name="status" type="radio" value="Married" style=" width: 50px;">Married</label>
              </div>
              <div class="radio">
              <label><input id="status3" name="status" type="radio" value="Divorced" style=" width: 50px;" checked>Divorced</label>
              </div>
              </form>
                      `;
                       else
                                      document.getElementById('gender_').innerHTML+=`
              <label for="status" style="font-weight: bold;"
                  >Status
              </label>
              <form >
              <div class="radio">
              <label ><input id="status1" name="status" type="radio"  value="Single" style=" width: 50px;">Single</label>
              </div>
              <div class="radio">
              <label><input id="status2" name="status" type="radio" value="Married" style=" width: 50px;">Married</label>
              </div>
              <div class="radio">
              <label><input id="status3" name="status" type="radio" value="Divorced" style=" width: 50px;">Divorced</label>
              </div>
              </form>`;

                    var _gender_ = `${doc.data().gender}`;

                    if(_gender_== 'Male'){
                      document.getElementById('gender_').innerHTML+=`
              <label for="gender" style="font-weight: bold;"
                  >Gender
              </label>
              <br>
              <label class="radio-inline" ><input id="gender1" name="gender" type="radio"  value="Male" style=" width: 50px" checked>Male</label>
              <label class="radio-inline" ><input id="gender2" name="gender" type="radio"  value="Female"  style=" width: 50px">Female</label>
                      `;
                    }else if(_gender_== 'Female'){
                                            document.getElementById('gender_').innerHTML+=`
              <label for="gender" style="font-weight: bold;"
                  >Gender
              </label>
              <br>
              <label class="radio-inline" ><input id="gender1" name="gender" type="radio"  value="Male" style=" width: 50px">Male</label>
              <label class="radio-inline" ><input id="gender2" name="gender" type="radio"  value="Female"  style=" width: 50px" checked>Female</label>
                      `;
                    }else document.getElementById('gender_').innerHTML+=`
              <br>      
              <label for="gender" style="font-weight: bold;"
                  >Gender
              </label>
              <br>
              <label class="radio-inline" ><input id="gender1" name="gender" type="radio"  value="Male" style=" width: 50px">Male</label>
              <label class="radio-inline" ><input id="gender2" name="gender" type="radio"  value="Female"  style=" width: 50px">Female</label>
                      `;
              }      
              });
            });
          }
        });
  },

  methods: {
  
    editprofile_: function() {
      
      var profession = document.getElementById('profession').value;
      var phone = document.getElementById('phone').value;

      var status1 = document.getElementById('status1');
      var status2 = document.getElementById('status2');
      var status3 = document.getElementById('status3');
      var status ='';

      if(status1.checked==true)
        status = document.getElementById('status1').value;
      else if(status2.checked==true)
        status = document.getElementById('status2').value; 
      else if(status3.checked==true)
        status = document.getElementById('status3').value;     

      var aboutme = document.getElementById('aboutme').value;

      var gender1 = document.getElementById('gender1');
      var gender2 = document.getElementById('gender2');
      var gender ='';

      if(gender1.checked==true)
        gender = document.getElementById('gender1').value;
      else if(gender2.checked==true)
        gender = document.getElementById('gender2').value; 

      var ubication = document.getElementById('ubication').value;
      var address = document.getElementById('address').value;

      Firebase.auth().onAuthStateChanged(user => {
        if (user) {
          var washingtonRef = db.collection("user").doc(user.uid);

          return washingtonRef.update({
          profession: profession,
          phone: phone,
          status: status,
          aboutme: aboutme,
          gender: gender,
          ubication: ubication,
          address: address
      })
      .then(function() {
          console.log("Document successfully updated!");
          location.reload();
      })
     .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error); 
      });
        }
      });
    },


    addFile: function() {
      this.selectedFile = event.target.files[0];

      var preview = null;
        preview = document.getElementById("img_profile");

        var file = this.selectedFile;
        var reader = new FileReader();
        var ext = file.name.split('.').pop();

        reader.addEventListener(
          "load",
          function() {
            preview.src = reader.result;
            preview.style.width = "150px";
            preview.style.height = "150px";
          },
          false
        );

        if (file) {
          reader.readAsDataURL(file);
        }
        Firebase.auth().onAuthStateChanged(user => {
          if(user){        
        
        var storageRef = Firebase.storage().ref();

        var path = "user/" + user.uid + "/profile pics/" + "profilepic." + ext ;

        var task = storageRef.child(path).put(file);

          task.on("state_changed", () => {
          task.snapshot.ref.getDownloadURL().then(url => {
              db.collection("user")
                .doc(user.uid)
                .update({
                  pictures: url
                });
          });
        });
         console.log(task);
        }
        });
      console.log(file);
    },
  },
};
</script>

<style lang="scss">
.conten{
  background-image: url("../assets/backgroundProfile.jpg");
  width: 100%;
  height: 1220px;
  background-size: cover;
}

.conten::before{
  content: "";
  background-color: rgba(255, 255, 255, 0.945);
  width: 100%;
  height: 1220px;
  position: absolute;
  size: cover;
  opacity: 0.3;
}

.conten:target .container-all{
  height: 587px;
}

.container-all{
  width: 100%;
  height: 1220px;
  position: absolute;
  padding: 40px;
  visibility: hidden;
  opacity: 0;
  transition: all 600ms;
}

.container-all:target{
  background: rgba(0, 0, 0, 0.8);
  visibility: visible;
  opacity: 1;
}

.container-all:target .popup{
  top: 50%;
  left: 50%;
  transform: rotate(0deg)translate(-50%,-50%);
  visibility: visible;
}

.popup{
  width: 100%;
  max-width: 800px;
  height: 1000px;
  position: absolute;
  display: flex;
  background: white;
  visibility: hidden;
  top: -80%;
  left: -80%;
  transform: rotate(90deg) translate(-150%,230%);
  transition: all 600ms;
}

.img{
  background-image: url("../assets/verde.jpg");
  width: 30%;
  background-size: cover;
  background-position: center;
}

.container-text{
  width: 60%;
  padding: 50px;
  overflow-y: auto;
}

.container-text h1{
  font-size: 30px;
}

.container-text p{
  margin-top: 20px;
  font-size: 16px;
}

.buttonclose{
  width: 50px;
  height: 50px;
  position: absolute;
  right: -20px;
  top:-20px;
  padding: 20px;
  background: rgb(0, 0, 0);
  color: rgba(255, 255, 255, 0.842);
  border-radius: 50%;
  line-height: 10px;
}

.buttonclose:hover {
  background-color:#bb0505;
  color: rgb(255, 255, 255);
  text-decoration: none;
}

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

#box00 {
  position: absolute;
  top: 82px;
  left: 0px;
  width: 880px;
  height: 160px;
  border: #ffffff00;
  background-color: #ffffff00;
}

#boxpopupimg {
  position: absolute;
  top: 82px;
  left: 50px;
  width: 180px;
  height: 160px;
  border: #ffffff00;
  background-color: #ffffff00;
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
  left: 310px;
  width: 750px;
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
  top: 978px;
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
  width: 400px;
  height: 150px;
  border-radius: 0px;
}

#boxButton {
  position: absolute;
  top: 1200px;
  left: 647px;
  width: 200px;
  height: 100px;
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
