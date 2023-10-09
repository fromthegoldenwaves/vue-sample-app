<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import authService from '@/services/authService'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

  const initialState = {
    username: '',
    email: '',
    password: ''
  };

  const state = reactive({ ...initialState });
  const rules = {
    username: { required },
    email: { required, email },
    password: { required }
  }
  const message = ref('') ;
  const form = ref(false) ;
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const v$ = useVuelidate(rules, state);

  async function handleSignin() {
    isLoading.value = true;

    authService.signup(state).then(response =>{
          console.log(response)
          message.value = response.message;
          isLoading.value = false;
          isSuccess.value = true;
          clear();
        }).catch(error => {
          message.value = error.response?.data?.message;
          isLoading.value = false;
          isSuccess.value = false;
        });
  }

  function clear () {
    v$.value.$reset()
    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }
  
</script>
<template>
    <v-form v-model="form" @submit.prevent="handleSignin">
      <v-container>
        <v-text-field
          v-model="state.username"
          :readonly="isLoading"
          clearable
          variant="underlined"
          label="User Name"
          prepend-inner-icon="mdi-account"
          required
          :error-message="v$.username.$errors.map(e => e.$message)"
          @input = "v$.username.$touch"
          @blur = "v$.username.$touch"
        />
        <v-text-field
          v-model="state.email"
          :readonly="isLoading"
          clearable
          variant="underlined"
          label="E-mail"
          prepend-inner-icon="mdi-email"
          required
          :error-message="v$.email.$errors.map(e => e.$message)"
          @input = "v$.email.$touch"
          @blur = "v$.email.$touch"
        />
        <v-text-field
          v-model="state.password"
          :readonly="isLoading"
          clearable
          variant="underlined"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock"
          required
          :error-message="v$.password.$errors.map(e => e.$message)"
          @input = "v$.password.$touch"
          @blur = "v$.password.$touch"
        />
      </v-container>
      <v-card-actions>
        <v-btn
          :disabled="!form"
          :loading="isLoading"
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
        :color="isSuccess? 'success' : 'danger'"
      >
      {{ message }}
      </v-card>
    </v-form>
</template>