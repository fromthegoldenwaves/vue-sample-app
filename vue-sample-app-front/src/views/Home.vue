<template>
  <v-card class="mx-auto" max-width="350" >
      <v-tabs v-model="tab">
          <v-tab value="logIn" width="50%">Log In</v-tab>
          <v-tab value="signUp" width="50%">Sign up</v-tab>
      </v-tabs>
      <v-window v-model="tab">
          <v-window-item value="logIn">
              <LoginField />
          </v-window-item>
          <v-window-item value="signUp">
              <SignupField />
          </v-window-item>
      </v-window>
  </v-card>
</template>

<script lang="ts" setup>
  import LoginField from '@/components/LoginFields.vue'
  import SignupField from '@/components/SignupFields.vue'
</script>
<script lang="ts">
  export default {
      data: () => ({
      tab: "logIn",
      }),
  }
</script>