import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
class Trapezoid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '报名',
      people: '5680人',
    };
    this.pieChart = React.createRef();
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>报名转化率</div>
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
      color: ['#16B5E8', '#FF7092', '#FF9A50'],
      calculable: true,
      series: [
        {
          type: 'funnel',
          silent: true,
          left: '12%',
          top: 10,
          //x2: 80,
          bottom: 10,
          // height: {totalHeight} - y - y2,
          // min: 10,
          // max: 120,
          minSize: '60%',
          maxSize: '100%',
          width: '76%',
          sort: 'descending',
          gap: 5,
          label: {
            normal: {
              show: true,
              position: 'inside',
              fontSize: 14,
              fontFamily: 'PingFang-SC-Regular',
            },
          },
          itemStyle: {
            normal: {
              borderColor: '#0A213A',
              borderWidth: 0,
            },
          },
          data: [
            { value: 5680, name: '报名 5680 人' },
            { value: 3000, name: '录取 3000人 60%' },
            { value: 4500, name: '缴费 4500人 80%' },
          ],
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
  }
  onResize = () => {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.myChart.resize();
    }, 300);
  };
}

export default Trapezoid;
