<template>
<p>Messages</p>
</template>

<script>
//import Firebase from "firebase";
//import db from "../db.js";

export default {
  name: "messages",
  props: ["client"],
  data: function() {
    return {
      messages: []
    };
  },
}
</script>

<style>
</style>