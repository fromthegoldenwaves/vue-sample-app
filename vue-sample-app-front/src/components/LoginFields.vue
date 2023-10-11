<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import authService from '@/services/authService';
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

  const initialState = {
    email: '',
    password: ''
  };

  const state = reactive({ ...initialState });
  const rules = {
    email: { required, email },
    password: { required }
  }
  const message = ref('') ;
  const isLoading = ref(false);
  const v$ = useVuelidate(rules, state);

  async function validate() {
    if (!await v$.value.$validate()) {
      return
    }
    await handleSignin();
  }

  async function handleSignin() {
    isLoading.value = true;

    authService.signin(state).then(response =>{
          console.log(response)
          isSuccess.value = true;
          clear();
        }).catch(error => {
          message.value = error.response?.data?.message;
        });
    isLoading.value = false;
  }

  function clear () {
    v$.value.$reset()
    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }
</script>

<template>
    <v-form @submit.prevent="validate">
      <v-container>
          <v-text-field
            v-model="state.email"
            :readonly="isLoading"
            clearable
            variant="underlined"
            label="E-mail"
            prepend-inner-icon="mdi-email"
            required
            :error-messages="v$.email.$errors.map(e => e.$message)"
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
            :error-messages="v$.password.$errors.map(e => e.$message)"
            @input = "v$.password.$touch"
            @blur = "v$.password.$touch"
          />
      </v-container>
      <v-card-actions>
        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
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
    <v-card
        v-if="message"
        color="error"
        class="text-center"
      >
      {{ message }}
      </v-card>
</template>