<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer
                v-model="drawer"
                :rail="rail"
                permanent
                @click="rail = false"
                
            >
                <v-list-item title = "TEST USER" nav>
                    <template v-slot:append>
                        <v-btn variant="text" icon="mdi-chevron-right" @click.stop="rail = !rail" ></v-btn>
                    </template>

                    <v-divider></v-divider>
                
                    <v-list density="compact" nav>
                        <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
                        <v-list-item prepend-icon="mdi-note-text-outline" title="Plan" value="plan"></v-list-item>
                        <v-list-item prepend-icon="mdi-cog" title="Setting" value="setting"></v-list-item>
                        <v-list-item prepend-icon="mdi-help-circle" title="QnA" value="qna"></v-list-item>
                        <v-list-item title="Log Out" value="logout" @click="backToMain"></v-list-item>
                    </v-list>
                </v-list-item>
            </v-navigation-drawer>
            <v-main style="height: 250px;"></v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
    export default {
        data () {
            return {
                drawer: true,
                rail: true,
            }
        },

        setup() {
            const router = useRouter()

            const backToMain = () => {
                router.push({path: `/`})
            }

            return {
                backToMain
            }
        }
    }
</script>