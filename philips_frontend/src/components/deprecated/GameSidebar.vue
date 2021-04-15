<template>
  <v-list>
          <v-list-item>
            <v-btn tile icon color="dark1" class="white--text mx-auto" height="24vh" width="24vh" @click="rollDice">
              <v-icon size="24vh" color="">
                mdi-dice-{{dice}}-outline
              </v-icon>
            </v-btn>
          </v-list-item>
          <v-divider class="my-3"></v-divider>
          <v-progress-linear height="25" color="info" class="white--text" :value="calculateTime">{{Math.ceil(timeRemaining)}}</v-progress-linear>
          <v-list-item >
            <v-container class="mx-auto">
              <v-row align-content="center" no-gutters>
                <v-col></v-col>
                <v-col><v-btn width="8vh" height="8vh" fab tile v-bind:disabled="!direction.up" color="info"><v-icon>mdi-chevron-up</v-icon></v-btn></v-col>
                <v-col></v-col>
              </v-row>
              <v-row align-content="center" no-gutters>
                <v-col><v-btn width="8vh" height="8vh" fab tile v-bind:disabled="!direction.left" color="info"><v-icon>mdi-chevron-left</v-icon></v-btn></v-col>
                <v-col><v-btn width="8vh" height="8vh" fab tile v-bind:disabled="!direction.center" color="info"><v-icon>mdi-circle-outline</v-icon></v-btn></v-col>
                <v-col><v-btn width="8vh" height="8vh" fab tile v-bind:disabled="!direction.right" color="info"><v-icon>mdi-chevron-right</v-icon></v-btn></v-col>
              </v-row>
              <v-row align-content="center" no-gutters>
                <v-col></v-col>
                <v-col><v-btn width="8vh" height="8vh" fab tile v-bind:disabled="!direction.down" color="info"><v-icon>mdi-chevron-down</v-icon></v-btn></v-col>
                <v-col></v-col>
              </v-row>
            </v-container>
          </v-list-item>
          <v-divider class="my-3"></v-divider>
          <v-list-item
            ><v-simple-table style="width: 100%">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Points</th>
                    <th class="text-left">Stars</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="Team in sortedTeams" :key="Team.Name">
                    <td>{{ Team.Name }}</td>
                    <td>{{ Team.Points }}</td>
                    <td>{{ Team.Stars }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-list-item>
        </v-list>
</template>

<script>

export default {
  props:{
    teams: Array,
    direction: Object
  },
  data:() => ({
    rolling: false,
    roll:null,
    timer:null,
    dice: 1,
    timeRemaining: 5
  }),
  computed: {
    sortedTeams: function () {
      return this.teams.sort(function (a, b) {
        return   b.Stars - a.Stars || b.Points - a.Points;
      });
    },
    calculateTime: function() {
      return (this.timeRemaining/5* 100)
    }
  },
  methods: {
    startRoll() {
      this.roll = setInterval(this.generateDice, 50);
    },
    stopRoll() {
      clearInterval( this.roll);
    },
    generateDice() {
      this.dice =  1 + Math.floor(Math.random()*6)
    },
    rollDice(){
      this.rolling = !this.rolling
      if(this.rolling){
        this.startRoll()
      } else {
        this.stopRoll()
      }
    },
    startTimer(){
      this.timer = setInterval(this.lowerTime, 100);
    },
    stopTimer() {
      clearInterval( this.timer);
    },
    lowerTime(){
      this.timeRemaining -= 0.1
      if(this.timeRemaining <= 0){
        this.stopTimer()
      }
    },

  },

}
</script>

<style>

</style>