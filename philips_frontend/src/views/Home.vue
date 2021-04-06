<template>
  <div class="home">
    <v-container style="height: 90vh">
      <v-card width="700" class="mx-auto mt-16">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          grow
          color="accent"
        >
          <v-tab> Login </v-tab>
          <v-tab> Register </v-tab>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <Login />
            </v-tab-item>
            <v-tab-item>
              <Register />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register";

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
