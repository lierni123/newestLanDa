import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
import { observer } from 'mobx-react';
@observer
class Enrollmentnumber extends Component {
  constructor(props) {
    super(props);
    this.dom = React.createRef();
  }

  componentWillReact() {
    this.setOption();
  }
  render() {
    const weekData = this.props.data;
    return (
      <div className={styles.normal}>
        <div className={styles.title}>近期报名人数变化</div>
        <div ref={this.dom} className={styles.chart} />
      </div>
    );
  }

  setOption = () => {
    const weekData = this.props.data.reverse();
    if (weekData) {
      this.myChart.clear();
      const option = {
        grid: {
          top: 10,
          bottom: 25,
          right: 10,
          x: 40,
        },
        xAxis: {
          type: 'category',
          data: weekData.map((value, key) => {
            const arr = value.signdate.match(/(.*)-(.*)-(.*)/);
            return arr[2] + '.' + arr[3];
          }),
          nameTextStyle: {
            color: '#fff',
            opacity: 0.5,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'PingFangSC-Regular',
            interval: 0,
          },
          splitLine: {
            lineStyle: {
              color: '#fff',
              opacity: 0.5,
            },
          },
        },
        yAxis: {
          type: 'value',
          // max:'dataMax',
          // min:'dataMin',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#16B5E8',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'PingFangSC-Regular',
          },

          splitLine: {
            lineStyle: {
              color: '#fff',
              opacity: 0.5,
            },
          },
          //splitNumber: 5,
        },
        series: [
          {
            data: weekData.map((value, key) => {
              return value.signcount;
            }),

            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#16B5E8',
            },
            itemStyle: {
              opacity: 0,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    // 0% 处的颜色
                    color: 'rgba(22, 181, 232, 0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 193, 255, 0)', // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
          },
        ],
      };
      this.myChart.setOption(option);
    }
  };

  componentDidMount() {
    this.myChart = echarts.init(this.dom.current);
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
export default Enrollmentnumber;
