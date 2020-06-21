<template>

    <b-container id="ImageFilter"  v-bind:style="{ backgroundImage: 'url(' + image + ')' }">
        <b-container id="titleImage">
            <link href="https://fonts.googleapis.com/css2?family=Oleo+Script:wght@700&display=swap" rel="stylesheet">
            <div class="title">
            {{type}}
            </div>
        </b-container>
    </b-container>
   
</template>
<script>
export default {
    data(){
        return{
            image:""
        }
    },
    props:[
        "picture", "type"
    ],
    mounted(){
      //  var hola = "https://picsum.photos/1024/400/?image=41";
      //  console.log(hola, this.picture)
      //  console.log(hola == this.picture)
        this.image = this.picture
        //document.getElementById('ImageFilter').style.backgroundImage = 'url(' + this.image + ')';
    }
}
</script>
<style lang="scss" >
    #ImageFilter{
     //  background-color: green;
        width: 22%;
        height: 100%;
        margin-top: 10px;
        border-radius: 5px;
    //    background-image: url(../assets/Ecological.png);
        background-size: cover !important;
    }
    #titleImage{
        width: 100%;
        height: 100%;
        background-color:rgba(219, 219, 219, 0.5);
        margin-top: 130%;
        border-radius: 5%;
        

    }
    div.title{
        color: honeydew;
        opacity: 10 !important;
        text-align: center;
        line-height: 150%;
        font-size: 250%;
        font-family: 'Oleo Script', cursive;   
    }
    
</style>