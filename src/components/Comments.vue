<template>
    <b-container fluid>
        <b-row>   
            <b-col cols="1.5">
            <div class="photo">
                <b-img v-bind="mainProps" rounded="circle" alt="profile" :src="host.pictures"></b-img>
            </div></b-col>
            <b-col cols="10">
            
                <div class="text">
                    <b-container id="singleComment">
                        <small>{{comment}}<br></small>
                    </b-container>
                </div></b-col>
            
        </b-row>
        <span>
            <router-link :to="'/perfilmiembros/' + host.uid">
            <small style="color: green;" ><b-icon icon="person-fill"></b-icon> {{host.name}} </small>
            </router-link>
        <small id="rate" style="color: green;">|<strong> {{rate}}</strong> <b-icon icon="star-fill"></b-icon></small>
        <small><i><p style="text-align:right;"> {{dateComment}} </p></i></small></span><br>

    </b-container>
</template>
<script>
import db from "../db.js";
export default {
    data(){
        return{
            host: {},
            hi: "",
            mainProps: {  width: 40, height: 40, class: 'm1' }
        }
    },
    mounted(){
        
        db.collection("user").doc(this.userId).get().then(snapshot => {
              this.host={
              uid: snapshot.id,
              phone: snapshot.data().phone,
              name:snapshot.data().name,
              email: snapshot.data().email,
              address: snapshot.data().address,
              pictures: snapshot.data().pictures,
              aboutme: snapshot.data().aboutme,
              profession: snapshot.data().profession,
              ubication: snapshot.data().ubication,
              gender: snapshot.data().gender,
              status: snapshot.data().status,    
              }
      });
    },
    props:[
        "userId","comment","dateComment","rate"
    ]
}

</script>
<style lang="scss">
div.text{
    text-align: left;
    
}

#singleComment{
    background-color: #cacaca;
    border-radius: 15px;
}
</style>