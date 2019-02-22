import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
import { observer } from 'mobx-react';
const dic = ['#FF7092', '#FF9A50', '#16B5E8'];
@observer
class DevicesInfo extends Component {
  constructor() {
    super();
    this.dom = React.createRef();
  }

  componentWillReact() {
    this.setOption();
  }
  render() {
    const data = this.props;
    return (
      <div className={styles.normal}>
        <div className={styles.title}>报名学生层次分布</div>
        <div ref={this.dom} className={styles.chart} />
      </div>
    );
  }
  setOption = () => {
    let realData = this.props.data;
    if (realData) {
      this.myChart.clear();
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
            radius: ['50%', '75%'],
            startAngle: 120,
            label: {
              formatter: ['{a|{b}}', '{b|{d}%}'].join('\n'),
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 13,
                  fontFamily: 'PingFangSC-Regular',
                },
                b: {
                  fontSize: 17,
                  fontFamily: 'DIN-Medium',
                },
              },
            },
            labelLine: {
              length: 10,
              length2: 8,
              smooth: true,
            },
            data: realData.slice().map((value, key) => {
              let name = value.studentlayername;
              if (name == '高中起点专科') {
                name = '高起专';
              } else if (name == '专科起点本科') {
                name = '专升本';
              } else {
                value.signcount = '';
              }
              return {
                value: value.signcount.replace(/,/g, ''),
                name: name,
                itemStyle: {
                  color: dic[key],
                },
              };
            }),
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
export default DevicesInfo;
