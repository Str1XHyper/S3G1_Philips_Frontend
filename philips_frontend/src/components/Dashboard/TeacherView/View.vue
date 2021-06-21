<template>
  <v-container>
    <v-row><h2>Planned lessons</h2></v-row>
    <v-row><Planned /></v-row>
    <v-row class="mt-5"><h2>Lessons</h2></v-row>
    <v-row><Lessons /></v-row>
  </v-container>
</template>

<script>
import Planned from "../PlannedLessons";
import Lessons from "../Lessons.vue";
export default {
  components: {
    Planned,
    Lessons,
  },
};
</script>

<style>
</style>