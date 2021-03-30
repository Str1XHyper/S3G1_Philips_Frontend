<template>
  <div>
    <v-container fluid style="height: 100%">
      <v-row justify="space-around">
        <v-col lg="3">
          <Sidebar v-bind:teams="Teams" v-bind:direction="Direction"/>
        </v-col>
        <v-col cols="12" lg="9">
          <Question/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Sidebar from "../components/GameSidebar";
import Question from '../components/Question';
export default {
  data: () => ({
    Teams: [
      {
        Name: "Luc",
        Points: 2,
        Stars: 1,
      },
      {
        Name: "Tijn",
        Points: 5,
        Stars: 1,
      },
      {
        Name: "Danillo",
        Points: 0,
        Stars: 0,
      },
      {
        Name: "Justin",
        Points: 3,
        Stars: 0,
      },
    ],
    Direction:{
      up: false,
      left: false,
      right: true,
      down: true,
      center: false,
    }
  }),
  components: {
    Sidebar,
    Question,
  },
};
</script>

<style>
</style>