<template>
  <v-card class="ma-4">
    <v-card-title>Details</v-card-title>
    <v-card-subtitle>Params</v-card-subtitle>
    <v-card-text>{{ getParams() }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  methods: {
    getParams() {
      return this.$route.params;
    },
  },
};
</script>

<style></style>
