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
      otherUser: this.emailOtherUser,
      dateMessage: this.dateMessage,
      };

      var user = Firebase.auth().currentUser;

      if (user != null) {
        db.collection("user")
          .doc(user.uid)
          .get()
          .then(snapshot => {
            let document;
            let chat = snapshot.data().messages;

            /*if (Messages == null) {
              Messages = [];
            }*/

            document = db.collection("chats").doc();

            chat.push({
              chatId: document.id,
              fromId: user.uid
            });

            document.set({
              datePublish: new Date(),
              fromId: null,
              receivedId: null,
              messages: null
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