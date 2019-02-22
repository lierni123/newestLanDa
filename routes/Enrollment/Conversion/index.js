import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
import { observer } from 'mobx-react';
@observer
class Trapezoid extends Component {
  constructor(props) {
    super(props);
    this.dom = React.createRef();
  }

  render() {
    const data = this.props.data;
    return (
      <div className={styles.normal}>
        <div className={styles.title}>报名转化率</div>
        <div ref={this.dom} className={styles.chart} />
      </div>
    );
  }

  setOption = () => {
    const data = this.props.data;
    if (data) {
      this.myChart.clear();
      const option = {
        color: ['#16B5E8', '#FF9A50', '#FF7092'],
        calculable: true,
        series: [
          {
            type: 'funnel',
            silent: true,
            left: '10%',
            top: 10,
            bottom: 10,
            minSize: '60%',
            maxSize: '100%',
            width: '80%',
            sort: 'descending',
            gap: 6,
            label: {
              normal: {
                show: true,
                position: 'inside',
                fontSize: 14,
                fontFamily: 'PingFangSC-Regular',
              },
            },
            itemStyle: {
              normal: {
                borderColor: '#0A213A',
                borderWidth: 0,
              },
            },
            data: [
              { value: 100, name: '报名  ' + data[0].signcount + '人' },
              {
                value: 70,
                name:
                  '录取  ' + data[0].enrollcount + '人  ' + data[0].enrolltransrate.slice(0, -2) + '%',
              },
              {
                value: 40,
                name: '缴费  ' + data[0].paycount + '人  ' + data[0].paytransrate.slice(0, -2) + '%',
              },
            ],
          },
        ],
      };
      this.myChart.setOption(option);
    }
  };
  componentWillReact() {
    this.setOption();
  }
  componentDidMount() {
    this.myChart = echarts.init(this.dom.current);
    //this.getData();
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
