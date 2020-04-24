<template>
  <b-col md="3">
    <b-card
    
      :title="nameActivity"
      img-src="https://picsum.photos/600/500/?image=61"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        {{prize}}$
      </b-card-text>
      <b-button variant="primary"><b-icon icon="briefcase"></b-icon> Reserve</b-button>
    </b-card>
  </b-col>  
</template>

<script>
export default {
    name: "activity",
    props: ["client",'nameActivity','prize']

};
</script>
<style>

</style>
