import React, { Component } from 'react';
import geoCoordMap from './geo';
import styles from './index.module.less';
import echarts from 'echarts';
import 'echarts/map/js/china';
const convertData = function(data) {
  const res = [];
  for (let i = 0; i < data.length; i++) {
    const geoCoord = geoCoordMap[data[i].name].geo;
    if (geoCoord) {
      res.push({
        name: geoCoordMap[data[i].name].name,
        v: data[i].value,
        value: geoCoord,
      });
    }
  }
  return res;
};

export default class Map extends Component {
  constructor() {
    super();
    this.dom = React.createRef();
  }
  render() {
    return (
      <div className={styles.normal}>
        <div ref={this.dom} className={styles.chart} />
        <div className={styles.month}>统计周期:月</div>
      </div>
    );
  }
  componentDidMount() {
    this.myChart = echarts.init(this.dom.current);
    const data = [
      { name: '港', value: 9 },
      { name: '澳', value: 12 },
      { name: '宁', value: 12 },
      { name: '甘', value: 12 },
      { name: '琼', value: 14 },
      { name: '云', value: 15 },
      { name: '豫', value: 16 },
      { name: '闽', value: 18 },
      { name: '皖', value: 18 },
      { name: '黑', value: 19 },
    ];
    const option = {
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false,
          },
        },
        zoom: 1.2,
        itemStyle: {
          normal: {
            areaColor: '#0666A7',
            borderColor: '#111',
          },
          emphasis: {
            areaColor: '#0666A7',
          },
        },
      },
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(data),
          symbolSize: 8,
          rippleEffect: {
            scale: 4,
            brushType: 'stroke',
          },
          label: {
            show: true,
            position: [20, -5],
            color: '#fff',
            fontSize: 16,
            formatter: obj => {
              const { name, v } = obj.data;
              return `{a|${name}} {b|${v}}`;
            },
            rich: {
              a: {
                color: '#fff',
                fontSize: 14,
                fontWeight: 400,
                fontFamily: 'PingFangSC-Regular',
              },
              b: {
                color: '#fff',
                fontSize: 22,
                fontWeight: 500,
                fontFamily: 'DIN-Medium',
              },
            },
          },
          itemStyle: {
            normal: {
              color: '#fff',
              shadowBlur: 10,
              shadowColor: '#fff',
              opacity: 0.7,
            },
          },
        },
      ],
    };
    this.myChart.setOption(option);
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.timer);
    this.myChart.dispose();
  }
  onResize = () => {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.myChart.resize();
    }, 300);
  };
}
