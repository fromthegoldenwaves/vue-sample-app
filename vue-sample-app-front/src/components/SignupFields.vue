<template>
    <v-form v-model="form" @submit.prevent="handleSignin">
      <v-container>
        <v-text-field
          v-model="name"
          :readonly="loading"
          :rules="[required]"
          clearable
          variant="underlined"
          label="User Name"
          prepend-inner-icon="mdi-account"
        />
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          clearable
          variant="underlined"
          label="E-mail"
          prepend-inner-icon="mdi-email"
        />
        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          variant="underlined"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock"
        />
      </v-container>
      <v-card-actions>
        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          size="large"
          type="submit"
          color="success"
          variant="elevated"
        >
          Sign Up
        </v-btn>
      </v-card-actions>
      <v-card
        v-if="message"
        class="alert"
        :color="successful? 'success' : 'danger'"
      >
      {{ message }}
      </v-card>
    </v-form>
</template>
  
<script lang="ts">
  import authService from '@/services/authService'
  
  export default {
    name: 'signin',
    data:()=>({
      form: false,
      name: null,
      email: null,
      password: null,
      loading: false,
      successful: false,
      message:''
    }),
    methods: {
      handleSignin () {
        if (!this.form) return

        this.loading = true

        const req = {
          email: this.email,
          password: this.password,
          username: this.name
        };
        authService.signup(req).then(response =>{
          console.log(response)
          this.message = response.message;
          this.loading = false;
          this.successful = true;
        }).catch(error => {
          this.message = error.response?.data?.message;
          this.loading = false;
          this.successful = false;
        });

      },
      required (v: boolean) {
        return !!v || 'Field is required'
      },
    },
  }
</script>
  