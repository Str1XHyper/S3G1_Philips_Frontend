<template>
  <v-container >
    <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="Username"
        rules="required"
      >
        <v-text-field
          v-model="username"
          :counter="10"
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
          label="Password"
          required
        ></v-text-field>
      </validation-provider>

      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
    </validation-observer>
    <div>
      <p>Don't have an account? <a @click="toRegister">Register here</a></p>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src


  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      password: '',
      username: '',
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
        //Login Account
        /*
        If (possible) 
        {
          Redirect
        }
        else
        {
          Show error
        }
        */
      },
      clear () {
        this.username = ''
        this.password = ''
        this.$refs.observer.reset()
      },
      toRegister () {
        this.$router.push("/Register")
      }
    },
  }

</script>
