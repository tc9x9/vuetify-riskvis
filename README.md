# vuetify-riskvis

Have you ever needed a risk matrix ? This Vuetify componentd should help you with that. It implements a general approach to create a risk matrix based on the determination of impact and severity.

See [working demo](https://codesandbox.io/s/vuetify-riskvis-kxhrp7).

## Installation

```javascript
// src/main.js

import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import RiskMatrix from "vuetify-riskvis";
Vue.use(RiskMatrix);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

```
## Usage

```javascript
<template>
  <v-container>
    <risk-matrix
      :risks="risks"
      elevation="3"
      :severity_levels="severity_levels"
      :likelyhood_levels="likelyhood_levels"
      :risk_thresholds="risk_thresholds"
      show_values
      show_risk_novalues
      risk_novalues_color="#bbbbbb"
      more_info_text="More info"
      redirect_route="Details"
    />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    severity_levels: [
      {
        name: "Critical",
        value: 100,
      },
      {
        name: "Significant",
        value: 75,
      },
      {
        name: "Moderate",
        value: 50,
      },
      {
        name: "Low",
        value: 10,
      },
      {
        name: "None",
        value: 1,
      },
    ],

    likelyhood_levels: [
      {
        name: "Unlikely",
        value: 0.05,
      },
      {
        name: "Possible",
        value: 0.1,
      },
      {
        name: "Likely",
        value: 0.5,
      },
      {
        name: "Certain",
        value: 1,
      },
    ],

    risk_thresholds: [
      {
        name: "Low",
        value: 5,
        color: "#43A047",
      },
      {
        name: "Medium",
        value: 25,
        color: "#FBC02D",
      },
      {
        name: "Significant",
        value: 50,
        color: "#FB8C00",
      },
      {
        name: "High",
        value: 100,
        color: "#E53935",
      },
    ],
    risks: [
      {
        title: "Risk 1",
        severity: 75,
        likelyhood: 0.5,
      },
      {
        title: "Risk 2",
        severity: 100,
        likelyhood: 1,
      },
      {
        title: "Risk 3",
      },
    ],
  }),
};
</script>

```

