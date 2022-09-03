<template>
  <v-app>
    <v-app-bar app> </v-app-bar>
    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
    <v-btn @click="switchMode">Switch</v-btn>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    switchMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
