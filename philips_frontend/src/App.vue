<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon class="mx-2" to="/Dashboard">
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          max-width="40"
        />
      </v-app-bar-nav-icon>
      <v-btn text to="/Dashboard">Mercier</v-btn>
    
      <v-spacer></v-spacer>

        <v-row v-if="$store.state.loggedIn" justify="end">
          <v-btn tile text to="/Dashboard">Dashboard</v-btn>
          <div v-if="$store.state.user.role == 'TEACHER'">
            <v-btn tile text to="/Lessons">Lessons</v-btn>
          </div>
        </v-row>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>
