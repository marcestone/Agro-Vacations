<template>
    <b-container fluid>
            <b-row align-h="center" style="background:transparent">
              <div class="box"  id="boxCreateChat">              
              <div class="form-group text-center">
                <button
                  v-on:click="createChat"
                  class="btn btn-success"
                  style="width:200px;height:50px; border-radius:15px"
                >Create Chat</button>
              </div>
              <div id="usertoid" class="form-group text-center">
                <input
                  class="form-control"
                  type="text"
                  id="userto"
                  placeholder="Escribe el ID del otro usuario..."
                />
              </div>
              </div>
              <div class="box"  id="boxSendMessage">
              <div class="form-group text-center">
                <button
                  v-on:click="sendMessage"
                  class="btn btn-success"
                  style="width:200px;height:50px; border-radius:15px"
                >Send Message</button>
              </div>
              <div id="msg" class="form-group text-center">
                <input
                  class="form-control"
                  type="text"
                  id="message"
                  placeholder="Escribe tu mensaje..."
                />
              </div>
              <div id="chatid" class="form-group text-center">
                <input
                  class="form-control"
                  type="text"
                  id="chatIdd"
                  placeholder="Escribe el chatID..."
                />
              </div>
              </div>
            </b-row>
    </b-container>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";

export default {

  data: function() {
    return {
      chatId: null,
      fromId: null,
      receivedId: null,
      dateMessage: null,
      messages: [],
    };
  },

  methods: {
    createChat: function() {
      const info = {
      chatId: null,
      fromId: null,
      receivedId: null,
      dateMessage: null,
      messages: []
      };
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
      const minDate = new Date(today);

      var user = Firebase.auth().currentUser;
      let documentChat = db.collection("chats").doc();
      var otheruserID = document.getElementById('userto').value;

      if (user != null) {
        db.collection("user")
          .doc(user.uid)
          .get()
          .then(snapshot => {
            let documentUser;
            let messages = snapshot.data().messages;
            let chatuser = snapshot.data().chatuser;

            if (messages == null) {
              messages = [];
            }

            if (chatuser == null) {
              chatuser = [];
            }


            documentUser = db.collection("user").doc(user.uid);

            documentChat.set({
              fromId: user.uid,
              receivedId: otheruserID,
              messages: [],
              chatId: documentChat.id
            });

            chatuser.push({
              chatId: documentChat.id,
              fromId: otheruserID
            });

            documentUser.update({
                chatuser: chatuser
              });  

            info.dateMessage = minDate;
            
            messages.push({
              ownerMessage: otheruserID,
              message: "Buenas, ¿en qué te puedo ayudar?",
              dateMessage : info.dateMessage
            });

            db.collection("chats")
              .doc(documentChat.id)
              .update({
                messages: messages
              });  
            
            this.createFileFolder(documentChat.id);
      
          });


        var chatID = documentChat.id;

        db.collection("user")
          .doc(otheruserID)
          .get()
          .then(snapshot => {
            let documentUserto;
            let chatuser = snapshot.data().chatuser;
            console.log(chatID,"3");

            if (chatuser == null) {
              chatuser = [];
            }

            documentUserto = db.collection("user").doc(otheruserID);


            chatuser.push({
              chatId: chatID,
              fromId: user.uid
            });

            documentUserto.update({
                chatuser: chatuser
              });  
          });
      }
    },

    sendMessage: function() {
    
      const info = {
      chatId: null,
      fromId: null,
      receivedId: null,
      dateMessage: null,
      messages: []
      };
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
      const minDate = new Date(today);

      var user = Firebase.auth().currentUser;
      var chatID = document.getElementById('chatIdd').value;
      console.log(chatID);

      if (user != null) {
        db.collection("chats")
          .doc(chatID)
          .get()
          .then(snapshot => {
            let documentChat;
            let messages = snapshot.data().messages;

            if (messages == null) {
              messages = [];
            }

            documentChat = db.collection("chats").doc(chatID);

            info.dateMessage = minDate;

            var text = document.getElementById('message').value;

            messages.push({
              ownerMessage: user.uid,
              message: text,
              dateMessage : info.dateMessage
            });

            documentChat.update({
                messages: messages
              });  

            document.getElementById('msg').innerHTML+=`
            `;
            document.getElementById('chatid').innerHTML+=`
            `;
          });
      }
    },  

  }  
}
</script>

<style>

#boxSendMessage {
  position: absolute;
  top: 290px;
  left: 30%;
}

#boxCreateChat {
  position: absolute;
  top: 140px;
  left: 30%;
}
</style>