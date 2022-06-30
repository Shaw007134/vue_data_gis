//本来想用mock模拟数据的，但是地图数据不好模拟，特别是这里要一级级下钻
//不可能把所有的市县都写上去，那样功能量太大了，所以这里用promise  假装模拟调接口

import { getMapInfo } from '@/utils'


export function selectFlowData({ id, year } = params) {
  return new Promise((resolve, reject) => {
    // 排名	排口名称	日流量(m³)
    // 1	pk01	2,890
    // 2	pk02	2,147
    // 3	pk03	1,326
    // 4	pk04	1,043
    // 5	pk05	725
    // 6	pk06	671
    // 7	pk07	509
    // 8	pk08	443
    // 9	pk09	422
    // 10	pk10	398
    const data = [
      { id: 1, name: 'pk01', value: 2890 },
      { id: 2, name: 'pk02', value: 2147 },
      { id: 3, name: 'pk03', value: 1326 },
      { id: 4, name: 'pk04', value: 1043 },
      { id: 5, name: 'pk05', value: 725 },
      { id: 6, name: 'pk06', value: 671 },
      { id: 7, name: 'pk07', value: 509 },
      { id: 8, name: 'pk08', value: 443 },
      { id: 9, name: 'pk09', value: 422 },
      { id: 10, name: 'pk10', value: 398 },
    ]
    const mapData = data.map((item) => {
      return {
        name: item.name,
        value: item.value,
        adcode: item.id,
      }
    })
    resolve({
      code: 200,
      data: mapData,
    })
  })
}
/**
 *  获取最近5年的城市销售额度    模拟数据，这里year属性就不用了
 *  @param {string}  abcode  城市code
 *  @param {number}  year       年份
 *  @returns {Array}
 */
export function selectCityData({ abcode, year } = params) {
  return new Promise((resolve, reject) => {
    getMapInfo(abcode)
      .then((data) => {
        const mapData = data.map((item) => {
          return {
            name: item.name,
            value: (Math.random() * 3000).toFixed(2),
            adcode: item.adcode,
          }
        })
        resolve({
          code: 200,
          data: mapData,
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
