<template>
  <v-container class="white">
      <v-row>
          <h1>
              {{Question}}
          </h1>
      </v-row>
      <v-row>
          <v-container v-if="MultipleChoice">
              <v-row v-for="y in Math.ceil(AnswerCount/2)" :key="y">
              <v-col><v-btn width="25vh" height="25vh"></v-btn></v-col>
              <v-col><v-btn width="25vh" height="25vh"></v-btn></v-col>
              </v-row>
          </v-container>
          <v-container v-else>
              <v-text-field></v-text-field>
          </v-container>
      </v-row>
  </v-container>
</template>

<script>
export default {
    data:() =>({
        Question:"What is 9 + 10?",
        AnswerCount:4,
        MultipleChoice: false,
    })
}
</script>

<style>

</style>