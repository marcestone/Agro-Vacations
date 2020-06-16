<template>
<p>Messages</p>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";

export default {
  data: function() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    return {
      messageText: null,
      messageFrom: null,
      messageTo: null,
      dateMessage: null,
      messages: [],
      min: minDate
    };
  },
  methods: {
    createMessage: function() {
      const info = {
      messageText: this.messageText,
      messageFrom: this.messageFrom,
      messageTo: this.messageTo,
      dateMessage: this.dateMessage,
      messages: [],
      };

      var user = Firebase.auth().currentUser;

      if (user != null) {
        db.collection("user")
          .doc(user.uid)
          .get()
          .then(snapshot => {
            let document;
            let newActivitiesName = snapshot.data().activitiesName;

            if (newActivitiesName == null) {
              newActivitiesName = [];
            }

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
              dataStart: info.dateStart,
              dataEnd: info.dateEnd,
              activityTransport: info.activityTransport,
              activityRate: null,
              userClient: [],
              userCreator: user.uid,
              userCreatorName: snapshot.data().name
            });

            db.collection("user")
              .doc(user.uid)
              .update({
                activitiesName: newActivitiesName
              });

            this.createFileFolder(document.id);
          })
          .then(
            this.$bvModal
              .msgBoxOk("Activity published successfully", {
                title: "Confirmation",
                size: "sm",
                buttonSize: "sm",
                okVariant: "success",
                headerClass: "p-2 border-bottom-0",
                footerClass: "p-2 border-top-0",
                centered: true
              })
              .then(() => {
                this.$router.push("home");
              })
          );
      }
    }
  }
}
</script>

<style>
</style>