<template>
<div>
    <div class="chat_list">
        <div class="chat_people" @click="toggleComponent">
            <div class="chat_img"> <b-img v-bind="mainProps" :src="fromPicture" rounded="circle" alt="Pic"></b-img> </div>
            <div class="chat_ib">
                <h5>{{fromName}} <span class="chat_date">{{LastMessage.lastdateMessage}}</span></h5>
                <p>{{LastMessage.lastmessage}}</p>
            </div>
        </div>
    </div>

    <!--<div class="chat_list active_chat">
        <div class="chat_people" @click="toggleComponent">
            <div class="chat_img"> <img :src="fromPicture" alt="Pic"> </div>
            <div class="chat_ib">
                <h5>{{fromName}} <span class="chat_date">{{LastMessage.lastdateMessage}}</span></h5>
                <p>{{LastMessage.lastmessage}}</p>
            </div> 
        </div>
    </div>-->

    <b-container id="container-mesgs">
    <div class="mesgs">
        <CloudMessages
            v-if="showComponent"
            :fromPicture="fromPicture"
            :userId="userId"
            :chatId="chatId"
        />
    </div>
    </b-container>
</div> 

</template>
<script>
import db from "../db.js";
import CloudMessages from "@/components/CloudMessages.vue";
export default {
    props:[
        "chatId","fromId","userName","userId"
    ],
    components:{
        CloudMessages
    },
    mounted(){
        db.collection("user").doc(this.fromId).get().then(snapshot =>{
            this.fromName = snapshot.data().name;
            this.fromPicture = snapshot.data().pictures;
            
        })
        db.collection("chats").doc(this.chatId).get().then(snapshot =>{
            this.messages = snapshot.data().messages;
            this.LastMessage={
            lastmessage: this.messages[this.messages.length-1].message,
            lastdateMessage: this.messages[this.messages.length-1].dateMessage,
        }
        })
        
    },
    methods:{
        toggleComponent () {
            this.showComponent = !this.showComponent;
        },
    },
    data(){
        return{
            mainProps: {  width: 40, height: 40, class: 'm1' },
            showComponent: false,
            messages:[],
            fromName:"",
            fromPicture:"",
            LastMessage:{}
           
        }
    },  
}
</script>
<style>
#container-mesgs{
    max-width: 100%;
}
</style>