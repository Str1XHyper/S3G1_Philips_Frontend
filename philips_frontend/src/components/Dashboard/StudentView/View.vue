<template>
  <v-container>
    <v-row><h2>Planned lessons</h2></v-row>
    <v-row><Planned :HasEditPermission=false> </Planned></v-row>
  </v-container>
</template>

<script>
import Planned from "../PlannedLessons";
export default {
  components: {
    Planned,
  },
};
</script>

<style>
</style>