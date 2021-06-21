<template>
  <div style="width: 100%">
    <v-data-table
      :headers="headers"
      :items="Lessons"
      v-bind:loading="loading"
      loading-text="Loading lessons... Please wait"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Lessons</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn tile outlined to="/Lessons"
            >Edit Lessons</v-btn
          >
        </v-toolbar>
      </template>
      <template v-slot:item.questions="{ item }">
        <v-btn @click="openQuestions(item)" tile outlined> Questions </v-btn>
      </template>
    </v-data-table>

    <v-alert v-if="error" class="mt-3" type="error" color="error">
      An unknown error occured fetching the lessons!
    </v-alert>
  </div>
</template>

<script>
export default {
  created() {
    const config = {
      method: "get",
      url: "/Lesson/GetByOwner/"+ this.$store.state.user.id ,
    };
    this.$axios(config)
      .then((result) => {
        this.Lessons = result.data;
        this.loading = false;
      })
      .catch((error) => {
        this.error = true;
        this.loading = false;
        console.log(error);
      });
  },
  data: () => ({
    error: false, 
    loading: true,
    Lessons: [],
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      {
        text: "Questions",
        value: "questions",
        sortable: false,
        filterable: false,
        align: "right",
      },
    ],
  }),
  methods:{
    openQuestions(lesson){
      this.$store.commit("setLessonId", lesson.id)
      this.$router.push("/Questions")
    },
  }
};
</script>

<style>
</style>