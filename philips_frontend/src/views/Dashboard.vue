<template>
  <v-container> 
      <v-row>
          <h1>Dashboard</h1>
      </v-row>
      <v-row>
          <Scheduler v-if="scheduler || admin"/>
          <Student v-if="student || admin"/>
      </v-row>
      <v-row>
      <v-btn to="/Lessons"></v-btn>
      </v-row>
  </v-container>
</template>

<script>
import Student from '../components/Dashboard/StudentView/View'
import Scheduler from '../components/Dashboard/SchedulerView/View'
export default {
    components:{
        Student,
        Scheduler,
    },
    computed:{
        student() {
            return this.$store.state.user.role == 'Student'
        },
        admin() {
            return this.$store.state.user.role == 'Admin'
        },
        scheduler() {
            return this.$store.state.user.role == 'Scheduler'
        },
        teacher() {
            return this.$store.state.user.role == 'Teacher'
        },
    }
};
</script>

<style>
</style>