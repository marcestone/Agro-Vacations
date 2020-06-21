<template>
<div >
    <div class="msg_history">

        <div v-for="item in messages" :key="item.dateMessage">
        
            <div class="incoming_msg" v-if="item.ownerMessage != userId">
                <div class="incoming_msg_img"> <b-img v-bind="mainProps" rounded="circle"  :src="fromPicture" alt="Pic"></b-img> </div>
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
                    <b-icon icon="cursor-fill"></b-icon>
                </button>
            </div>
            <hr class="linechat">
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
        const hours = now.getHours() + ":" 
        const minutes = this.addZero(now.getMinutes());
        const cD = mm + '/' + dd + '/' + yyyy +' | ' + hours + minutes;
        return {
            mainProps: {  width: 30, height: 30, class: 'm1' },
            renderMyComponent: true,
            currentDate: cD,
            newMessage:"",
            messages:[]
        };
    },
    props:[
        "fromPicture","userId","chatId"
    ],
    mounted(){
        db.collection("chats").doc(this.chatId).get().then(snapshot =>{
            this.messages = snapshot.data().messages;
        })
    },
    methods:{
        addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },
        reRender(){
            location.reload();
        },
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
                this.reRender(); 
            });
        }
    }
}
</script>
<style>
hr.lineFooter{
  margin-top: 60px;
  border: 1px solid rgb(153, 153, 153);
}
</style>