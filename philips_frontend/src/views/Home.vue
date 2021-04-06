<template>
  <div class="home">
    <v-container>
      <v-card>
    <v-tabs v-model="tab" background-color="transparent" grow color="accent">
      <v-tab>
        Login
      </v-tab>
      <v-tab>
        Register
      </v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item>
        <Login/>
        </v-tab-item>
        <v-tab-item>
        <Register/>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Login from "./Login";
import Register from "./Register";

export default {
  data: () => ({
    tab: null,
  }),
  name: "Home",
  components: {
    Login,
    Register,
  },
};
</script>
