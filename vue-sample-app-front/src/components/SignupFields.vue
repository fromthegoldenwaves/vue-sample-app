<template>
    <v-form v-model="form" @submit.prevent="onSubmit">
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
    </v-form>
</template>
  
<script lang="ts">
  import userService from '@/services/userService'
  
  export default {
    data:()=>({
      form: false,
      name: null,
      email: null,
      password: null,
      loading: false,
    }),
    methods: {
      onSubmit () {
        if (!this.form) return

        this.loading = true

        const req = {
          email: this.email,
          password: this.password,
          user_name: this.name
        };
        userService.signup(req).then(response =>{
          console.log(response.data)
          this.$router.push({path: '/'})
        }).catch(e => {
          console.log(e);
          this.loading = false
        });


      },
      required (v: boolean) {
        return !!v || 'Field is required'
      },
    },
  }
</script>
  