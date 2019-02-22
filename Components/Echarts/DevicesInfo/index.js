import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
export default class DevicesInfo extends Component {
  constructor() {
    super();
    this.dom = React.createRef();
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>报名学生层次分布</div>
        <div ref={this.dom} className={styles.chart} />
      </div>
    );
  }
  componentDidMount() {
    this.myChart = echarts.init(this.dom.current);
    const option = {
      grid: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
      series: [
        {
          type: 'pie',
          silent: true,
          radius: ['55%', '80%'],
          startAngle: 120,
          label: {
            formatter: ['{a|{b}}', '{b|{d}%}'].join('\n'),
            rich: {
              a: {
                color: '#fff',
                fontSize: 13,
                fontFamily: 'PingFang-SC-Regular',
              },
              b: {
                fontSize: 17,
                fontFamily: 'DIN-Medium',
              },
            },
          },
          data: [
            {
              value: 335,
              name: '高起本',
              itemStyle: {
                color: '#FF7092',
              },
            },
            {
              value: 400,
              name: '高起专',
              itemStyle: {
                color: '#FF9A50',
              },
            },
            {
              value: 625,
              name: '专升本',
              itemStyle: {
                color: '#16B5E8',
              },
            },
          ],
          labelLine: {
            normal: {
              length: 6,
              length2: 10,
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
