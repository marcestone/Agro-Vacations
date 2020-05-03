<template>
  <div class="mainC">
    <div class="container-fluid">
      <div class="row" id="titleA">
        <div class="justify-content-center col-md-6">
          <div class="col-md-7">
            <h4 class="text-success font-weight-bold">Publish your activity</h4>
          </div>
        </div>
      </div>
      <form class="mt-4" @submit.prevent="addActivity">
        <div class="row">
          <div class="justify-content-center areas col-md-6" id="area2">
            <section class="col-md-8">
              <p>Enter event name</p>
              <b-input type="text" placeholder="Activity Name" id="input" v-model="activityName" />
            </section>
            <section class="col-md-8">
              <p>Enter event Type</p>
              <b-input type="text" placeholder="Activity Type" id="input" v-model="activityType" />
            </section>
            <section class="col-md-8">
              <p>Enter event date</p>
              <div>
                <div class="row justify-content-between" id="dateRow">
                  <b-form-datepicker
                    type="time"
                    class="dateP col-md-5"
                    id="time1"
                    placeholder="Start Date"
                    v-model="dateStart"
                  ></b-form-datepicker>
                  <b-form-datepicker
                    type="time"
                    class="dateP col-md-5"
                    id="time2"
                    placeholder="End Date"
                    v-model="dateEnd"
                  ></b-form-datepicker>
                </div>
              </div>
            </section>
            <section class="col-md-8">
              <p>Enter event location</p>
              <b-input type="text" placeholder="Location" id="input" v-model="activityLocation" />
            </section>
            <section class="col-md-8">
              <p>Transport</p>
              <select v-model="activityTransport">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </section>
            <section class="col-md-8">
              <p>Enter event price</p>
              <b-input type="number" placeholder="Price Name" id="input" v-model="activityPrice" />
            </section>
          </div>
          <div class="areas col-md-6" id="area1">
            <div class="container">
              <img id="activityImage" />
              <button type="submit" class="btn btn-outline-success" id="addImage">+</button>
              <!--
                <font-awesome-icon icon="star"></font-awesome-icon>
              -->
            </div>
            <textarea
              id="description"
              rows="10"
              cols="50"
              placeholder="Activity Description"
              v-model="description"
            ></textarea>
            <div class="form-group text-center" id="publish">
              <button type="submit" class="btn btn-outline-success">Publish</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";

//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  data: function() {
    return {
      activityName: null,
      activityType: null,
      datePublish: null,
      dateStart: null,
      dateEnd: null,
      description: null,
      dateActivity: null,
      activityLocation: null,
      activityTransport: null,
      activityPrice: null,
      userCreatorName: null,
      activityRate: null
    };
  },
  methods: {
    addActivity: function() {
      const info = {
        activityName: this.activityName,
        activityType: this.activityType,
        datePublish: this.datePublish,
        description: this.description,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        activityTransport: this.activityTransport,
        activityLocation: this.activityLocation,
        activityPrice: this.activityPrice
      };

      //var date = new Date(document.getElementById("time1").value);
      //var timestamp = date.getTime();
      Firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let checkActivities;

          db.collection("user")
            .doc(user.uid)
            .get()
            .then(snapshot => {
              checkActivities = snapshot.data().activitiesName;

              let document;
              let newActivity = true;
              let newActivitiesName = [];
              let activityID;

              if (checkActivities != null) {
                newActivitiesName = checkActivities;
                checkActivities.forEach(function(element) {
                  if (element.name.localeCompare(info.activityName) == 0) {
                    newActivity = false;
                    activityID = element.id;
                  }
                });
              }

              if (newActivity == true) {
                document = db.collection("activities").doc();

                newActivitiesName.push({
                  name: info.activityName,
                  id: document.id
                });

                document.set({
                  datePublish: new Date(),
                  description: info.description,
                  activityName: info.activityName,
                  price: parseInt(info.activityPrice),
                  userClient: [
                    {
                      dataStart: new Date(this.dateStart),
                      dataEnd: new Date(this.dateEnd),
                      activityTransport: info.activityTransport,
                      activityRate: null,
                      userId: null
                    }
                  ],
                  userCreator: user.uid,
                  userCreatorName: snapshot.data().name
                });
              } else {
                let newUserClient;
                document = db.collection("activities").doc(activityID);
                document.get().then(snapshot => {
                  newUserClient = snapshot.data().userClient;
                  newUserClient.push({
                    dataStart: new Date(info.dateStart),
                    dataEnd: new Date(info.dateEnd),
                    activityTransport: info.activityTransport,
                    activityRate: null,
                    userId: null
                  });
                  document.update({
                    userClient: newUserClient
                  });
                });
              }

              db.collection("user")
                .doc(user.uid)
                .update({
                  activitiesName: newActivitiesName
                });
            });
        }
      });
    }
  },
  components: {
    //FontAwesomeIcon
  }
};
</script>

<style lang="scss">
.mainC {
  height: 700px !important;
  position: relative;
}

.areas {
  height: 100%;
  margin-top: 10px;
}
#area1 {
  width: 65%;
}

#titleA {
  margin: 40px 0 40px 0;
}

.container {
  position: relative;
}

#addImage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

#activityImage {
  width: 80%;
  height: 300px;
  margin: 20px 10% 20px 10%;
}
#description {
  width: 80%;
  height: 130px;
  margin: 20px 10% 20px 10%;
}
#area2 {
  width: 25%;
}
section {
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
}

input {
  width: 80%;
}

#dateRow {
  margin: 0px 10px 0px 0px;
}

.dateP {
  width: 40%;
  height: 10px;
}

#publish {
  margin: 40px 0px 20px 0px;
}
input,
select,
textarea {
  border-color: #28a745 !important;
  border-radius: 0.5rem;
}
</style>
