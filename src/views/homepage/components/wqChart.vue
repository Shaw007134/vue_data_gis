<template>
  <div class="chart-wrapper" ref="waterQuality"></div>
</template>

<script>
import echarts from 'echarts'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { debounce } from '@/utils/index.js'

import useResize from '@/componentApi/useResize.js'
import { selectFlowData } from '@/api/chart'

export default {
  name: 'wqChart',
  setup() {
    let { abcode, year, parentInfo, routerChange } = useResize()

    const waterQuality = ref(null)
    let myChart = ref(null)

    const resizeHandler = debounce(() => {
      if (myChart.value) {
        myChart.value.resize()
      }
    }, 200)

    onMounted(() => {
      getChartData()
      window.addEventListener('resize', resizeHandler)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    //模拟接口，获取echarts数据
    const getChartData = async () => {
      initEcharts()
    }

    //渲染echarts图
    const initEcharts = () => {
      myChart = echarts.init(waterQuality.value)
      const colors = ['#FF8352', '#91CC75', '#CCB666']
      var obj = {
        dataX: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        cod: [121.0, 359, 52, 77, 62, 820, 194, 73, 92, 55],
        flow: [
          0.012,
          0.002,
          0.003,
          0.002,
          0.001,
          0.008,
          0.005,
          0.007,
          0.006,
          0.008,
        ],
        overall: [
          1.452,
          0.718,
          0.156,
          0.154,
          0.062,
          6.56,
          0.97,
          0.511,
          0.552,
          0.44,
        ],
      }
      function arrayChunk(array, size) {
        let data = []
        for (let i = 0; i < array.length; i += size) {
          data.push(array.slice(i, i + size))
        }
        return data
      }

      const Pages = []
      var options = []
      var size = 4
      var xAxisArr = arrayChunk(obj.dataX, size)
      var codList = arrayChunk(obj.cod, size)
      var flowList = arrayChunk(obj.flow, size)
      var overallList = arrayChunk(obj.overall, size)
      for (let j = 0; j < xAxisArr.length; j++) {
        Pages.push(j + 1)
      }
      for (let index = 0; index < Pages.length; index++) {
        let option = {
          color: colors,
          grid: {
            left: '14%',
            right: '24%',
            bottom: '25%',
            top: '20%',
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          legend: {
            data: ['COD', '流量', '通量'],
            textStyle: {
              color: '#fff',
            },
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true,
              },
              //轴线上的字
              axisLabel: {
                textStyle: {
                  fontSize: 12,
                  color: '#cecece',
                },
              },
              // prettier-ignore
              data: xAxisArr[index]
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: 'COD',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0],
                },
              },
              axisLabel: {
                show: true,
                textStyle: {
                  // color: '#cecece',
                  fontSize: 10,
                },
                formatter: '{value} mg/L',
              },
              splitLine: { show: false },
            },
            {
              type: 'value',
              name: '流量',
              position: 'right',
              alignTicks: true,
              offset: 60,
              splitLine: { show: false },
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1],
                },
              },
              axisLabel: {
                show: true,
                textStyle: {
                  // color: '#cecece',
                  fontSize: 10,
                },
                formatter: '{value} L/s',
              },
            },
            {
              type: 'value',
              name: '通量',
              position: 'left',
              alignTicks: true,
              splitLine: { show: false },
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2],
                },
              },
              axisLabel: {
                show: true,
                textStyle: {
                  // color: '#cecece',
                  fontSize: 10,
                },
                formatter: '{value} mg/s',
              },
            },
          ],
          series: [
            {
              name: 'COD',
              type: 'bar',
              data: codList[index],
            },
            {
              name: '流量',
              type: 'bar',
              yAxisIndex: 1,
              data: flowList[index],
            },
            {
              name: '通量',
              type: 'bar',
              yAxisIndex: 2,
              data: overallList[index],
            },
          ],
        }
        options.push(option)
      }
      myChart.setOption(
        {
          timeline: {
            data: Pages,
            axisType: 'category',
            realtime: true,
            label: {
              formatter: function(s) {
                return s
              },
            },
            lineStyle: { color: '#ccc' },
            controlStyle: {color: '#ccc'},
            bottom: '2%',
            symbolSize: 14,
            autoPlay: true,
            loop: true,
            playInterval: 3000,
            tooltip: {
              formatter: function(s) {
                return s.dataIndex + 1
              },
            },
          },
          options: options,
        },
        true
      )

      // myChart.getZr().off('click')
      // myChart.getZr().on('click', (params) => {
      //   const pointInPixel = [params.offsetX, params.offsetY]
      //   if (
      //     myChart.containPixel('grid', pointInPixel) ||
      //     xData.length === 0
      //   ) {
      //     routerChange('/more')
      //   }
      // })
    }

    watch(
      year,
      (nl, ol) => {
        getChartData()
      },
      { lazy: false }
    )
    watch(
      parentInfo,
      (nl, ol) => {
        getChartData()
      },
      { lazy: false, deep: true }
    )

    return {
      waterQuality,
    }
  },
}
</script>
