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

        const data = {
          email: this.email,
          password: this.password,
          user_name: this.name
        };

        console.log(data);

        userService.create(data).then(response =>{
          console.log(response.data)
          this.email = null
          this.password=null
          this.name=null
        }).catch(e => {
          console.log(e);
        });

        // setTimeout(() => (this.loading = false), 2000)

      },
      required (v: boolean) {
        return !!v || 'Field is required'
      },
    },
  }
</script>
  