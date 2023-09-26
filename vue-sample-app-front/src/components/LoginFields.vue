<template>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-container>
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
          Log In
        </v-btn>
      </v-card-actions>
      
    </v-form>
</template>
  
<script lang="ts">
  import userService from '@/services/userService';
  
  export default {
    data:()=>({
      form: false,
      email: null,
      password: null,
      loading: false,
    }),
    methods: {
    onSubmit () {
      if (!this.form) return

      this.loading = true

      const req = { email: this.email };

      userService.signin(req).then(response =>{
        console.log(response.data);
        const userName = response.data.username;
        // 画面遷移
        this.$router.push({path: `/myPage/${userName}`})
      }).catch(e => {
        console.log(e);
        this.loading = false
      });

      // setTimeout(() => (this.loading = false), 2000)
    },

    required (v: boolean) {
      return !!v || 'Field is required'
    },
  },
  }
</script>
  