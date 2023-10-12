<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';

  const drawer = ref(true);
  const rail = ref(true);

  const router = useRouter();

  function logout() {
    router.push({ path: '/' });
  }

  function railToggle(){
    rail.value = !rail.value;
  }

  function openRail() {
    rail.value = false
  }
</script>
<template>
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="openRail"
    >
        <v-list-item title = "TEST USER" nav>
            <v-divider/>
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home" title="Main" value="main"></v-list-item>
                <v-list-item prepend-icon="mdi-note-text-outline" title="Plan" value="plan"></v-list-item>
                <v-list-item prepend-icon="mdi-cog" title="Setting" value="setting"></v-list-item>
                <v-list-item prepend-icon="mdi-help-circle" title="QnA" value="qna"></v-list-item>
                <v-list-item title="Log Out" value="logout" @click="logout"></v-list-item>
            </v-list>
            <template v-slot:append>
                <v-btn variant="text" icon="mdi-chevron-right" @click.stop="railToggle" ></v-btn>
            </template>
        </v-list-item>
    </v-navigation-drawer>
</template>

