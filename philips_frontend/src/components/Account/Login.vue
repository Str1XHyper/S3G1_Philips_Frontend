<template>
  <v-container>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="Username"
          rules="required"
        >
          <v-text-field
            v-model="username"
            :error-messages="errors"
            label="Username"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Password"
          rules="required"
        >
          <v-text-field
            v-model="password"
            :error-messages="errors"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            label="Password"
            required
          ></v-text-field>
        </validation-provider>

        <v-btn class="mr-4" type="submit" :disabled="invalid" color="accent">
          Login
        </v-btn>
      </form>
    </validation-observer>
    <v-alert type="error" v-model="loginError">
      Username and password combination incorrect
    </v-alert>
  </v-container>
</template>

<script>
// @ is an alias to /src

import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    password: "",
    username: "",
    loginError: false,
    show1: false,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate().then(() => {
        this.login();
      });
    },
    clear() {
      this.username = "";
      this.password = "";
      this.$refs.observer.reset();
    },
    toRegister() {
      this.$router.push("/Register");
    },
    login() {
      var config = {
        method: "post",
        url: "/Auth/Login",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          password: this.password,
          username: this.username,
        },
      };

      this.$axios(config)
        .then((response) => {
          if (response.data.responseCode == 200) {
            this.$cookie.set("TC.ISD", response.data.jwt, {
              expires: 30,
              domain: "localhost",
              SameSite: "Lax",
            });

            this.$store.commit("setLoggedIn");
            this.$store.commit("setUser", response.data.user);
            this.$router.push("/Dashboard");
          }
          else {
            this.loginError =true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
