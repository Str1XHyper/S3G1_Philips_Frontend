<template>
  <v-container>
    <unity
      src="static/Build/MercierDeEchte.json"
      height="100%"
      unityLoader="static/Build/UnityLoader.js"
      ref="myInstance"
    ></unity>
    <v-btn @click="test"></v-btn>
  </v-container>
</template>

<script>
import Unity from "vue-unity-webgl";
export default {
  components: {
    Unity,
  },
  data: () => ({
    questions: [],
  }),
  methods: {
    test() {
      this.getQuestions();
      this.$refs.myInstance.gameInstance.SendMessage(
        "Network manager",
        "SetAllQuestions",
        JSON.stringify(this.questions)
      );
    },
    getQuestions() {
      const config = {
        method: "get",
        url: "/Question/Planned/" + 1,
      };
      this.$axios(config)
        .then((result) => {
          this.questions = result.data;
          this.loading = false;
        })
        .catch((error) => {
          this.error = true;
          this.loading = false;
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>