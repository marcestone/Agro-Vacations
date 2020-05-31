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
      <form class="mt-4" id="regForm">
        <div class="row">
          <div class="areas col-md-6" id="area1">
            <div class="container">
              <progress :value="UploadValue" max="100" id="uploader">
                0%
              </progress>
              <input type="file" @change="onFileSelected" />
              <button @click="onUpload">
                Upload
              </button>
              <img width="320" :src="this.picture" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
//import Firebase from "firebase";
//import db from "../db.js";
import * as firebase from "firebase/storage";

export default {
  data() {
    return {
      selectedFile: null,
      UploadValue: 0,
      picture: null
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    onUpload() {
      const storageRef = firebase.storage.ref();
      const task = storageRef.put(this.selectedFile);
      task.on(
        "state_changed",
        snapshot => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.UploadValue = percentage;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.UploadValue = 100;
          task.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
            console.log(this.picture);
          });
        }
      );
    }
  }
};
</script>

<style>
.activityCard {
  transition-duration: 0.2s;
  transition: box-shadow 0, 2s;
  width: 100% !important;
  height: 360px !important;
  object-fit: cover;
}
.activityCard:hover {
  box-shadow: 0px 0px 5px 1px rgba(46, 124, 1, 0.5);
}
</style>
