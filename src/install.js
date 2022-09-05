import RiskMatrix from "./components/RiskMatrix";

const RiskMatrixInstall = {
  install(Vue) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("risk-matrix", RiskMatrix);
  },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(RiskMatrixInstall);
}

export default RiskMatrixInstall;
