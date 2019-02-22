import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
class Enrollmentnumber extends Component {
  pieChart = React.createRef();
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>一周报名人数变化</div>
        <div ref={this.pieChart} className={styles.chart} />
      </div>
    );
  }
  initPieChart = () => {
    const { data } = this.props;
    let myChart = echarts.init(this.pieChart.current);
    let options = this.setOption(data);
    myChart.setOption(options);
    window.addEventListener('resize', this.onResize);
  };

  setOption = data => {
    return {
      grid: {
        top: 10,
        bottom: 25,
        right: 10,
        x: 40,
      },
      xAxis: {
        type: 'category',
        data: ['周六', '周日', '周一', '周二', '周三', '昨天', '今天'],
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
          fontFamily: 'PingFang-SC-Regular',
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
          fontFamily: 'PingFang-SC-Regular',
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
          data: [0, 932, 901, 934, 1290, 1330, 1320],
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
  };
  componentDidMount() {
    this.myChart = echarts.init(this.pieChart.current);
    this.initPieChart();
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
