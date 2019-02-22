import React, { Component } from 'react';
//import geoCoordMap from './geo';
import styles from './index.module.less';
import echarts from 'echarts';
import 'echarts/map/js/china';
import metaCodeAPI from '../apis/metaCode';
let filters = [(item, index) => index < 11, (item, index) => index >= 11];
export default class Map extends Component {
  timer = -1;
  t = -1;
  filterIndex = 0;
  constructor() {
    super();
    this.dom = React.createRef();
  }
  async getData() {
    const param =
      '2c90909a683c7f0501683c7f0abe0006;2c90909a683c7f0501683c7f0ac80014;2c90909a683c7f0501683c7f0ac80015;2c90909a683c7f0501683c7f0aca0018';
    const data = await metaCodeAPI.getListMeta(param);
    if (data) {
      let payBatch = data.data;
      let signcount = JSON.parse(payBatch).pageMaplist;
      this.setState({
        countData: signcount,
      });
      this.setOption();
    }
  }
  render() {
    return (
      <div className={styles.normal}>
        <div ref={this.dom} className={styles.chart} />
      </div>
    );
  }
  componentDidMount() {
    this.getData();
    this.myChart = echarts.init(this.dom.current);
    window.addEventListener('resize', this.onResize);
  }
  convertData = () => {
    const data = this.state.countData;
    const res = [];
    for (let i = 0; i < data.length; i++) {
      let geoCoord = data[i].coordinate;
      if (geoCoord.length > 1 && geoCoord) {
        geoCoord = JSON.parse(geoCoord); //string==>object
        res.push({
          name: data[i].name, //城市名
          v: data[i].signcount, //数量
          value: geoCoord, //地理坐标
        });
      }
    }
    return res;
  };

  setOption = () => {
    if (this.t) clearTimeout(this.t);
    const _convertData = this.convertData();

    if (_convertData.length > 0) {
      let min = Math.min.apply(
        Math,
        _convertData.filter(filters[this.filterIndex]).map(item => {
          return item.v;
        })
      );
      const max = Math.max.apply(
        Math,
        _convertData.filter(filters[this.filterIndex]).map(item => {
          return item.v;
        })
      );
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
              color: '#0666A7',
              borderColor: '#111',
            },
            emphasis: {
              areaColor: '#0666A7',
              color: '#0666A7',
            },
          },
        },
        series: [
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            silent: true,
            showLegendSymbol: false,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            data: _convertData.filter(filters[this.filterIndex]).map(item => {
              const obj = {
                name: item.name,
                value: item.v,
                itemStyle: {
                  areaColor: '#0857A6',
                  color: '#0857A6',
                  borderColor: '#111',
                },
                emphasis: {
                  itemStyle: {
                    areaColor: '#0857A6',
                    color: '#0857A6',
                    borderColor: '#111',
                  },
                },
              };
              if (item.v == max) {
                obj.itemStyle.areaColor = '#074A8C';
                obj.itemStyle.color = '#074A8C';
                obj.emphasis.itemStyle.areaColor = '#074A8C';
                obj.emphasis.itemStyle.color = '#074A8C';
              }
              if (item.v == min) {
                obj.itemStyle.areaColor = '#1470CC';
                obj.itemStyle.color = '#1470CC';
                obj.emphasis.itemStyle.areaColor = '#1470CC';
                obj.emphasis.itemStyle.color = '#1470CC';
              }
              return obj;
            }),
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: _convertData.filter(filters[this.filterIndex]),
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
      this.myChart.setOption(option, true);
    }
    this.t = setTimeout(() => {
      this.filterIndex++;
      if (this.filterIndex > 1) {
        this.filterIndex = 0;
      }
      this.setOption();
    }, 10 * 1000);
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.timer);
    clearTimeout(this.t);
    this.myChart.dispose();
  }
  onResize = () => {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.myChart.resize();
    }, 300);
  };
}
