<template>
  <div class="MapView">
    <div id="viewDiv"></div>
  </div>
</template>
<script>
/* eslint-disable */
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import LayerList from '@arcgis/core/widgets/LayerList'

import { computed, onMounted, reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      name: 'arcgis',
    })
    onMounted(handleMounted)
    return { state }
  },
}

function handleMounted() {
  const url_Watershed = '/region/watershed.json'
  const url_Stream = '/region/stream.json'
  const url_Zone = '/region/zone.json'
  const url_outfall = '/region/outfall.json'

  var ZoneAction = {
    title: '点击查看详情',
    id: 'ZoneDetails',
    // image: 'src/style/res/Chart.svg',
  }

  const template_Zone = {
    title: '<b>所选分区相关信息：</b>',
    content: '<b>索引号: </b> {FID} <br><b>面积: </b> {Shape_Area} km2 <br>',
    actions: [ZoneAction],
    overwriteActions: true,
    opacity: 0.6,
  }

  const template_Watershed = {
    title: '<b>所选流域相关信息：</b>',
    content: '<b>索引号: </b> {FID} <br><b>名称: </b> {CNName}  <br>',
    actions: [],
    overwriteActions: true,
    opacity: 0.6,
  }

  const template_Stream = {
    title: '<b>所选河道相关信息：</b>',
    content: '<b>索引号: </b> {FID}  <br><b>名称: </b> {CNName}  <br>',
    actions: [],
    overwriteActions: true,
    opacity: 0.6,
  }

  const template_outfall = {
    title: '<b>所选排口相关信息：</b>',
    content: '<b>索引号: </b> {FID} <br><b>名称: </b> {Name} <br>',
    actions: [],
    overwriteActions: true,
    opacity: 0.6,
  }

  function createFillSymbol(value, color) {
    return {
      value: value,
      symbol: {
        color: color,
        type: 'simple-fill',
        style: 'solid',
        outline: {
          style: 'none',
          width: '2px',
        },
      },
      label: value,
    }
  }

  const renderer_Zone = {
    type: 'simple',
    field: 'Zone',
    symbol: {
      color: '#FFFF00',
      type: 'simple-fill',
      style: 'solid',
      outline: {
        style: 'solid',
        width: '1px',
      },
    },
  }

  const renderer_Watershed = {
    type: 'simple',
    field: 'Zone',
    symbol: {
      color: [0, 225, 225, 0],
      type: 'simple-fill',
      style: 'solid',
      outline: {
        style: 'solid',
        width: '2px',
        color: '#63AFF8'
      },
    },
  }

  const renderer_Stream = {
    type: 'simple',
    symbol: {
      type: 'simple-fill',
      color: [0, 225, 225, 0.9],
      outline: {
        color: [0, 225, 225, 0.9],
        width: '1px',
      },
    },
  }

  const renderer_outfall = {
    type: 'simple', // autocasts as new SimpleRenderer()
    symbol: {
      type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
      style: 'triangle',
      size: 20,
      color: '#FF0000',
      outline: {
        // autocasts as new SimpleLineSymbol()
        width: 0.5,
        color: 'white',
      },
    },
  }

  const geojsonLayer_Zone = new GeoJSONLayer({
    url: url_Zone,
    title: '分区',
    popupTemplate: template_Zone,
    renderer: renderer_Zone,
    opacity: 0.3,
  })

  const geojsonLayer_Watershed = new GeoJSONLayer({
    url: url_Watershed,
    title: '流域',
    popupTemplate: null,
    renderer: renderer_Watershed,
    opacity: 0.9,
  })

  const geojsonLayer_Stream = new GeoJSONLayer({
    url: url_Stream,
    title: '水系',
    popupTemplate: template_Stream,
    renderer: renderer_Stream,
    opacity: 0.9,
  })

  const geojsonLayer_outfall = new GeoJSONLayer({
    url: url_outfall,
    title: '排口',
    popupTemplate: template_outfall,
    renderer: renderer_outfall,
    opacity: 0.9,
  })

  let map = new Map({
    basemap: 'hybrid', // streets，hybrid
    layers: [
      geojsonLayer_outfall,
      geojsonLayer_Zone,
      geojsonLayer_Watershed,
      geojsonLayer_Stream,
    ],
  })

  let view = new MapView({
    container: 'viewDiv',
    map,
    center: [117.36887, 31.87657],
    zoom: 13,
  })
  let layerList = new LayerList({
    view: view,
  })
  // Adds widget below other elements in the top left corner of the view
  view.ui.add(layerList, {
    position: 'top-right',
  })

  view.popup.on('trigger-action', (event) => {
    // Execute the measureThis() function if the measure-this action is clicked
    if (event.action.id === 'ZoneDetails') {
      console.log(event)
      const url = 'http://localhost:8999/#/webGl/ArcGis'
      window.location.href = url
    }
  })
}
</script>

<style lang="scss">
.MapView {
  width: 100%;
  height: 80%;
  #viewDiv {
    padding: 0;
    margin: 0;
    min-height: 580px;
    min-width: 400px;
    height: 100%;
    width: 100%;
  }
}
.esri-component.esri-widget--panel {
    width: 120px !important;
}
</style>
