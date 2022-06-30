<template>
  <div class="home-container">
    <z-row :gutter="15">
      <z-col :span="7">
        <div class="echartList">
          <div class="chart-item">
            <box-container :boxTitle="year + '实时排口信息'">
              <!-- <city-count /> -->
              <wq-chart></wq-chart>
            </box-container>
          </div>
          <div class="chart-item">
            <box-container :boxTitle="year + '雨水管网现状占比'">
              <type-count />
            </box-container>
          </div>
          <!-- <div class="chart-item">
            <box-container :boxTitle="year + '年销售品牌占比'">
              <word-chart />
            </box-container>
          </div> -->
        </div>
      </z-col>
      <z-col :span="10">
        <!-- <count-to :value="sum" suffix="万" :speed="20" /> -->
        <div style="width:100%;height:100%">
          <!-- <scatter-map /> -->
          <arcgis></arcgis>
        </div>
      </z-col>
      <z-col :span="7">
        <div class="echartList">
          <div class="chart-item">
            <box-container :boxTitle="year + '现状排口日流量'">
              <!-- <funnel-chart /> -->
              <daily-flow-rank></daily-flow-rank>
            </box-container>
          </div>
          <!-- <div class="chart-item">
            <box-container :boxTitle="year + '年公司市值'">
              <liquid-chart />
            </box-container>
          </div> -->
          <div class="chart-item">
            <box-container :boxTitle="year + '降雨数据'">
              <line-chart />
            </box-container>
          </div>
        </div>
      </z-col>
    </z-row>
  </div>
</template>

<script>
import { ZRow, ZCol } from "@UI/components";
import boxContainer from "@/components/boxContainer/index";
import fourAngel from "@/components/fourAngel/index";
import countTo from "@/components/countTo/index";
import {
  cityCount,
  wqChart,
  typeCount,
  scatterMap,
  wordChart,
  dailyFlowRank,
  lineChart,
  liquidChart,
} from "./components";
import arcgis from './components/ArcGis/index.vue'
import useResize from "@/componentApi/useResize.js";
import { ref } from "vue";
import DailyFlowRank from "./components/dailyFlowRank.vue";
import WqChart from "./components/wqChart.vue";

export default {
  name: "homepage",
  components: {
    ZRow,
    ZCol,
    boxContainer,
    cityCount,
    wqChart,
    typeCount,
    scatterMap,
    arcgis,
    wordChart,
    dailyFlowRank,
    lineChart,
    liquidChart,
    fourAngel,
    countTo,
    DailyFlowRank,
    WqChart
},
  setup(props, context) {
    const { year, sum } = useResize();

    return {
      year,
      sum,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  position: relative;

  .echartList {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    .chart-item {
      height: 48%;
      width: 100%;
    }
  }
}
</style>
