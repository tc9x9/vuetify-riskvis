<template>
  <v-container fluid>
    <v-card :elevation="elevation" class="pa-2">
      <v-row
        no-gutters
        class="flex-nowrap"
        v-for="(row, row_index) in risk_colors"
        :key="row_index"
      >
        <v-col>
          <v-card
            class="pa-2 mb-1 elevation-0 colfix"
            height="60"
            min-width="120"
          >
            <v-card-subtitle> {{ severityTitle(row_index) }}</v-card-subtitle>
          </v-card>
        </v-col>

        <v-col v-for="(col, col_index) in row" :key="col_index">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                class="pa-2 mr-1 mb-1 elevation-0"
                height="60"
                min-width="40"
                :style="{ backgroundColor: theColor(row_index, col_index) }"
              >
                <div class="text-caption" v-if="show_values">
                  {{ theValue(row_index, col_index) }}
                </div>
                <v-spacer></v-spacer>
                <v-chip
                  class="float-bottom float-right"
                  small
                  v-if="hasRisks(row_index, col_index)"
                >
                  {{ risk_colors[row_index][col_index].count | riskno }}
                </v-chip>
                <v-fade-transition>
                  <v-overlay
                    v-if="hover && risk_colors[row_index][col_index].count"
                    absolute
                  >
                    <v-btn
                      @click="redirect(theValue(row_index, col_index))"
                      small
                      >{{ more_info_text }}</v-btn
                    >
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card height="60" min-width="120" class="pa-2 elevation-0"></v-card>
        </v-col>
        <v-col v-if="show_risk_novalues">
          <v-card height="60" min-width="120" class="pa-2 elevation-0"
            ><v-card-subtitle> Undefined </v-card-subtitle></v-card
          >
        </v-col>
        <v-col v-for="(col, col_index) in likelyhood_levels" :key="col_index">
          <v-card height="60" min-width="120" class="pa-2 elevation-0"
            ><v-card-subtitle>
              {{ likelyhoodTitle(col_index) }}
            </v-card-subtitle></v-card
          >
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "RiskMatrix",
  props: {
    risks: {
      type: Array,
      default: () => [],
    },
    elevation: {
      type: String,
      default: "1",
    },
    severity_levels: {
      type: Array,
      default: () => [],
    },
    likelyhood_levels: {
      type: Array,
      default: () => [],
    },
    risk_thresholds: {
      type: Array,
      default: () => [],
    },
    more_info_text: {
      type: String,
      default: "More info",
    },
    show_values: {
      type: Boolean,
      default: false,
    },
    show_risk_novalues: {
      type: Boolean,
      default: false,
    },
    risk_novalues_color: {
      type: String,
      default: "#ff0000",
    },
    redirect_route: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      overlay: false,
      risk_thresholds_var: this.risk_thresholds.map((x) => ({ ...x })),
      risk_colors: [],
    };
  },

  beforeMount() {
    this.sort_thresholds();
    this.fill_matrix();
    this.set_risks();
  },

  filters: {
    riskno: function (value) {
      if (value === 0) {
        return "";
      }
      return value;
    },
  },

  methods: {
    theColor(y, x) {
      return this.risk_colors[y][x].color;
    },

    theValue(y, x) {
      return this.risk_colors[y][x].value || "";
    },

    severityTitle(rowindex) {
      // no title for empty cols at the end
      return this.severity_levels[rowindex]
        ? this.severity_levels[rowindex].name
        : "";
    },

    likelyhoodTitle(colindex) {
      return this.likelyhood_levels[colindex]
        ? this.likelyhood_levels[colindex].name
        : "";
    },

    hasRisks(y, x) {
      return this.risk_colors[y][x].count;
    },

    sort_thresholds() {
      // sort ascending
      this.risk_thresholds_var.sort((a, b) => a.value - b.value);
    },

    find_threshold(value) {
      return this.risk_thresholds_var.find((t) => value <= t.value);
    },

    fill_matrix() {
      let ysize = this.severity_levels.length;
      let xsize = this.likelyhood_levels.length;

      var risk_row = [];
      var threshold_value = "";

      for (let y = 0; y < ysize; y++) {
        risk_row = [];

        // add empty gray col at the begining
        if (this.show_risk_novalues) {
          risk_row.push({
            count: 0,
            color: this.risk_novalues_color,
            value: 0,
          });
        }

        for (let x = 0; x < xsize; x++) {
          let severity = this.severity_levels[y].value;
          let likelyhood = this.likelyhood_levels[x].value;
          let risk_value = severity * likelyhood;

          if (risk_value > 0) {
            threshold_value = this.find_threshold(risk_value);
            if (threshold_value) {
              risk_row.push({
                color: threshold_value.color,
                value: risk_value,
                count: 0,
              });
            } else {
              risk_row.push("#cccccc");
            }
          } else {
            console.log("risk values beyond thresholds");
          }
        }
        this.risk_colors.push(risk_row);
      }

      if (this.show_risk_novalues) {
        // add empty gray row at the end
        risk_row = [];

        for (let y = 0; y < ysize; y++) {
          risk_row.push({
            count: 0,
            color: this.risk_novalues_color,
            value: 0,
          });
        }
        this.risk_colors.push(risk_row);
      }
    },

    set_risks() {
      this.risks.forEach((risk) => {
        let row = this.severity_levels.findIndex(
          (t) => t.value === risk.severity
        );
        let col = this.likelyhood_levels.findIndex(
          (t) => t.value === risk.likelyhood
        );
        if (row >= 0 && col >= 0) {
          this.risk_colors[row][col].count++;
        } else {
          // risk with no severity or likelyhood
          this.risk_colors[this.risk_colors[0].length][0].count++;
        }
      });
    },
    redirect(risk_value) {
      this.$router.push({
        name: this.redirect_route,
        params: { riskvalue: risk_value },
      });
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .v-card .colfix {
    max-width: 80px;
  }
}

@media screen and (max-width: 960px) {
  .v-card .colfix {
    max-width: 80px;
  }
}
</style>
