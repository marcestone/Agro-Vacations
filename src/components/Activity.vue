<template>
  <b-col md="3">
    <b-card
      :title="nameActivity"
      img-src="https://picsum.photos/600/500/?image=61"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="activityCard mb-2"
    >
      <b-card-text>${{prize}}</b-card-text>
      <a href="javascript:void(0)" class="stretched-link" v-b-modal="nameActivity"></a>

      <b-modal v-bind:id="nameActivity" centered size="lg">
        <template v-slot:modal-header>
          <h3>
            <strong>{{nameActivity}}</strong>
          </h3>
        </template>
        <div class="modal-body">
          <div class="row">
            <div class="col-5">
              <img src="https://picsum.photos/600/500/?image=61" class="img-fluid mt-4" alt />
            </div>
            <div class="col-7">
              <p style="text-align:justify">{{description}}</p>
              <strong style="color: green;">$ {{prize}}</strong>
              <p class="mt-4" style="text-align:justify">
                <i>
                  <small>Host: {{userCreatorName}}</small>
                </i>
              </p>
              <p style="text-align:justify">
                <i>
                  <small>Publication date: {{datePublish}}</small>
                </i>
              </p>
            </div>
          </div>
        </div>

        <template v-slot:modal-footer="{cancel}">
          <b-button variant="secondary" @click="cancel()">Cancel</b-button>
          <b-button variant="primary">
            <b-icon icon="briefcase"></b-icon>Reserve
          </b-button>
        </template>
      </b-modal>
    </b-card>
  </b-col>
</template>

<script>
export default {
  name: "activity",
  props: [
    "client",
    "nameActivity",
    "description",
    "datePublish",
    "userCreatorName",
    "prize"
  ],
  data() {
    return {
      show: false,
      variants: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark"
      ],
      headerBgVariant: "primary",
      headerTextVariant: "light"
    };
  }
};
</script>
<style>
.activityCard {
  transition-duration: 0.2s;
  transition: box-shadow 0, 2s;
}
.activityCard:hover {
  box-shadow: 0px 0px 10px 2px rgba(46, 124, 1, 0.5);
}
</style>
