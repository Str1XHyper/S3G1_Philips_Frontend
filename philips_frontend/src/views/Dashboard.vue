<template>
  <v-container>
    <v-row>
      <h1>Dashboard</h1>
    </v-row>
    <v-row>
      <Scheduler v-if="scheduler || admin" />
      <Student v-if="student || admin" />
      <Teacher v-if="teacher || admin" />
    </v-row>
  </v-container>
</template>

<script>
import Student from "../components/Dashboard/StudentView/View";
import Scheduler from "../components/Dashboard/SchedulerView/View";
import Teacher from "../components/Dashboard/TeacherView/View";
export default {
  components: {
    Student,
    Scheduler,
    Teacher,
  },
  computed: {
    student() {
      return this.$store.state.user.role == "STUDENT";
    },
    admin() {
      return this.$store.state.user.role == "ADMIN";
    },
    scheduler() {
      return this.$store.state.user.role == "SCHEDULER";
    },
    teacher() {
      return this.$store.state.user.role == "TEACHER";
    },
  },
};
</script>

<style>
</style>