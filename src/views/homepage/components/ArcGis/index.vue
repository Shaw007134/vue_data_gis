<template>
  <!-- <div class="arcgis-wrapper relative" :style="{ height: 'calc(100vh)' }"> -->
    <div>
      <base-map :current="currentKey" />
    </div>
  <!-- </div> -->
</template>

<script>
/* eslint-disable */
import baseMap from './baseMap'
export default {
  name: 'arcgis',
  components: { baseMap },
  data() {
    return {
      handleList: [
        {
          title: '切换底图',
          icon: 'toggle',
        },
      ],
      currentKey: '',
      tb: '',
      map: '',
    }
  },
  methods: {
    changeHandle(val) {
      this.currentKey = val
    },
  },
}
</script>
<style lang="scss" scoped>
.arcgis-wrapper {
  width: 100%;
}
</style>
