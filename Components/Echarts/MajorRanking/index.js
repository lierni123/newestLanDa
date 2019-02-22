import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';

const plantCap = [
  {
    name: '人力资源',
    value: '20',
  },
  {
    name: '工商管理',
    value: '16',
  },
  {
    name: '计算机',
    value: '13',
  },
  {
    name: '计算机',
    value: '7',
  },
  {
    name: '幼教',
    value: '9',
  },
  {
    name: '金融',
    value: '7',
  },
  {
    name: '薪酬管理',
    value: '3',
  },
  {
    name: '土木工程',
    value: '9',
  },
  {
    name: '广告学',
    value: '5',
  },
  {
    name: '广告学',
    value: '11',
  },
];

const datalist = [
  {
    offset: [5, 80],
    opacity: 1,
    symbolSize: 90,
    color: '#16B5E8',
  },
  {
    offset: [40, 55],
    symbolSize: 80,
    color: '#FF9A50',
    opacity: 1,
  },
  {
    offset: [65, 23],
    symbolSize: 70,
    color: '#FF7092',
    opacity: 1,
  },
  {
    offset: [70, 93],
    symbolSize: 65,
    color: '#0666A7',
    opacity: 1,
  },
  {
    offset: [100, 70],
    opacity: 1,
    symbolSize: 65,
    color: '#0666A7',
  },
  {
    offset: [95, 30],
    symbolSize: 60,
    opacity: 1,
    color: '#0666A7',
  },
  {
    offset: [75, 55],
    symbolSize: 60,
    opacity: 1,
    color: '#0666A7',
  },
  {
    offset: [30, 18], //
    symbolSize: 60,
    opacity: 1,
    color: '#0666A7',
  },
  {
    offset: [0, 40], //
    symbolSize: 60,
    opacity: 1,
    color: '#0666A7',
  },
  {
    offset: [40, 92], //
    symbolSize: 60,
    opacity: 1,
    color: '#0666A7',
  },
];
const datas = [];
for (let i = 0; i < plantCap.length; i++) {
  const item = plantCap[i];
  const itemToStyle = datalist[i];
  datas.push({
    name: `${item.value}%\n${item.name.substring(0, 4)}`,
    value: itemToStyle.offset,
    symbolSize: itemToStyle.symbolSize,
    label: {
      normal: {
        textStyle: {
          fontSize: 14,
        },
      },
    },
    itemStyle: {
      normal: {
        color: itemToStyle.color,
        opacity: itemToStyle.opacity,
      },
    },
  });
}
class MajorRanking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  initPieChart = () => {
    const { data } = this.props;
    let myChart = echarts.init(document.getElementById('main'));
    let options = this.setOption(data);
    myChart.setOption(options);
  };

  setOption = data => {
    return {
      grid: {
        show: false,
        top: 20,
        bottom: 10,
      },
      xAxis: [
        {
          gridIndex: 0,
          type: 'value',
          show: false,
          min: 0,
          max: 100,
          nameLocation: 'middle',
          nameGap: 5,
        },
      ],
      yAxis: [
        {
          gridIndex: 0,
          min: 0,
          show: false,
          max: 100,
          nameLocation: 'middle',
          nameGap: 30,
        },
      ],
      series: [
        {
          type: 'scatter',
          silent: true,
          symbol: 'circle',
          label: {
            normal: {
              show: true,
              formatter: '{b}',
              color: '#fff',
              textStyle: {
                fontSize: '20',
              },
              //position:"bottom",
              align: 'center',
              rich: {
                fontFamily: 'PingFangSC-Regular;',
                width: '50%',
              },
            },
          },
          itemStyle: {
            normal: {
              color: '#00acea',
            },
          },
          data: datas,
        },
      ],
    };
  };
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>专业分布TOP10</div>
        <div id="main" className={styles.chart} />
      </div>
    );
  }
  componentDidMount() {
    this.myChart = echarts.init(document.getElementById('main'));
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

export default MajorRanking;
