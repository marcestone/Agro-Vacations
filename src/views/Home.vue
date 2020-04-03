<template>
  <div class="mt-3">
    <div class="text-secondary text-center">
      Wellcome back
      <span>{{ client }}</span>
    </div>
    <div>
      <h1>This is our home</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data: function() {
    return {
      client: null
    };
  },
  mounted() {
    db.collection("client")
      .doc("PZXYLuSsZyL87X5fYh9c")
      .get()
      .then(snapshot => {
        this.client = snapshot.data().lastName;
      });
  }
};
</script>
