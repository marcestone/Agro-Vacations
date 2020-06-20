<template>
      <div class="container">
        <h3 class=" text-center"></h3>
        <div class="messaging">

          <div class="inbox_msg">
            <div class="inbox_people">
              <div class="headind_srch">
                <div class="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div class="srch_bar">
                  <div class="stylish-input-group">
                    <input type="text" class="search-bar"  placeholder="Search" >
                    <span class="input-group-addon">
                    <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                    </span> </div>
                </div>
              </div>
              <div class="inbox_chat">
                <ChatUser
                  v-for="chat in chats"
                  :key="chat.ChatId"
                  :chatId="chat.chatId"
                  :fromId="chat.fromId"
                  :userName="userName"
                  :userId="userId"
                ></ChatUser>
              </div>
            </div>
          </div>
        </div>  
      </div>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";
import ChatUser from "@/components/ChatUser.vue";
export default {
  name: "messages",
  props: ["client"],
  components:{
    ChatUser
  },
  mounted(){
    Firebase.auth().onAuthStateChanged(client => {
      if (client) {
        db.collection("user").doc(client.uid).get().then(snapshot =>{
        this.chats = snapshot.data().chats;
        this.userName = snapshot.data().name;
        this.userId = snapshot.data().uid;
        })
      }
    })
  },
  data: function() {
    return {
      useruid:"",
      chats:[],
      userName:"",
      userId:"",
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

.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #23b33b;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 100%;
  margin-right: -100%;
}

 .sent_msg p {
  background:#23b33b none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}
.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #23b33b none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;

}
</style>