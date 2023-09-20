<template>
  <v-app>
    <DefaultBar/>
    <v-main>
    <router-view />
  </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  // import Default from './layouts/default/Default.vue';
  import DefaultBar from './layouts/default/AppBar.vue'
</script>
