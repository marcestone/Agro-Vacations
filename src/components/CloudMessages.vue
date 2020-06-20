<template>
<div>
    <div class="msg_history">

        <div v-for="item in messages" :key="item.dateMessage">
            
            <div class="incoming_msg" v-if="item.ownerMessage != userId">
                <div class="incoming_msg_img"> <img :src="fromPicture" alt="Pic"> </div>
                <div class="received_msg">
                    <div class="received_withd_msg">
                    <p>{{item.message}}</p>
                    <span class="time_date"> {{item.dateMessage}}</span></div>
                </div>
            </div>
        

            <div class="outgoing_msg" v-else-if="item.ownerMessage == userId">
                <div class="sent_msg">
                    <p>{{item.message}}</p>
                    <span class="time_date"> {{item.dateMessage}}</span> </div>
                </div>
            </div>

        </div>


        <div class="type_msg">
            <div class="input_msg_write">
                <input type="text" class="write_msg" placeholder="Type a message" v-model="newMessage" />
                <button class="msg_send_btn" type="button" @click="sendMessage">
                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                </button>
            </div>
        </div>
</div>
</template>
<script>
import * as firebase from "firebase/app";
import db from "../db.js";
export default {
    data: function() {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = now.getFullYear();
        const time = now.getHours() + ":" + now.getMinutes();
        const cD = mm + '/' + dd + '/' + yyyy +' | ' + time;
        return {
            currentDate: cD,
            newMessage:""
        };
    },
    props:[
        "messages","fromPicture","userId","chatId"
    ],
    mounted(){
    },
    methods:{
        sendMessage() {
            var send = db.collection("chats").doc(this.chatId)
            send.update({
                messages: firebase.firestore.FieldValue.arrayUnion(
                {
                    dateMessage: this.currentDate,
                    message: this.newMessage,
                    ownerMessage: this.userId,
                })
            }).then(()=>{
                this.$router.replace("messages"); 
            });
        }
    }
}
</script>