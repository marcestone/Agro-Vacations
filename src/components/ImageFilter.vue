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
        height: 330px;
        margin-top: 10px;
        border-radius: 5px;
    //    background-image: url(../assets/Ecological.png);
        background-size: cover !important;
    }
    #titleImage{
        width: 100%;
        height: 60px;
        background-color:rgba(219, 219, 219, 0.5);
        margin-top: 250px;
        border-radius: 10px;
        

    }
    div.title{
        color: honeydew;
        opacity: 10 !important;
        text-align: center;
        line-height: 3.5rem;
        font-size: 2.5rem;
        font-family: 'Oleo Script', cursive;
        
    }
    #imageprop{
        width: 100%;
        height: 330px;
        
    }
</style>