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
        <validation-provider
          v-slot="{ errors }"
          name="Confirm Password"
          rules="required"
        >
          <v-text-field
            v-model="passwordConfirm"
            :error-messages="errors"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            :rules="[passwordMatch]"
            label="Confirm Password"
            required
          ></v-text-field>
        </validation-provider>

        <v-btn class="mr-4" type="submit" :disabled="invalid" color="accent"> Register </v-btn>
      </form>
    </validation-observer>
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
  computed: {
    passwordMatch() {
      return () =>
        this.password === this.passwordConfirm || "Password must match";
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    show1: false,
    show2: false,
    username: "",
    password: "",
    passwordConfirm: "",
  }),

  methods: {
    submit() {
      this.$refs.observer.validate().then(() => {
        this.register()
        this.$router.push("/Dashboard")
      });
    },
    clear() {
      this.username = "";
      this.password = "";
      this.passwordConfirm = "";
      this.$refs.observer.reset();
    },
    toLogin() {
      this.$router.push("/Login");
    },
    register() {
      var config = {
        method: "post",
        url: "/Auth/Register",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: this.email,
          password: this.password,
          username: this.username,
        },
      };

      this.$axios(config)
        .then((response) => {
          this.$store.commit("setLoggedIn");
          this.$store.commit("setUser", response.data);
        })
        .catch(function (error) {
          this.alert = true;
        });
    },
  },

};
</script>
