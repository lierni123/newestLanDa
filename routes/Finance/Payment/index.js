import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
import { observer } from 'mobx-react';
const linear_color = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: 'rgba(22, 181, 232, 1)',
    },
    {
      offset: 1,
      color: 'rgba(22, 181, 232, 1)',
    },
  ],
};
@observer
class Payment extends Component {
  constructor(props) {
    super(props);
    this.dom = React.createRef();
  }

  componentWillReact() {
    this.setOption();
  }
  render() {
    const data = this.props;
    return (
      <div className={styles.normal}>
        <div className={styles.title}>总体缴费</div>
        <div ref={this.dom} className={styles.chart} />
      </div>
    );
  }

  setOption = () => {
    const paybatchList = this.props.data;
    let rate = paybatchList[0].receivedrate.replace('%', '') / 100;
    let received = paybatchList[0].received.replace(/,/g, '');
    received = received.slice(0, -4) + '.' + received.slice(-4, -2);
    const option = {
      title: {
        text: '实收\n\n' + received + '万元',
        textStyle: {
          color: 'rgba(255, 255, 255, 1)',
          fontSize: 16,
          fontFamily: 'PingFangSC-Regular',
          fontWeight: '400',
        },
        left: 'center',
        bottom: '3%',
      },
      series: [
        {
          type: 'pie',
          hoverAnimation: false,
          radius: ['90%', '90%'],
          startAngle: 225,
          labelLine: {
            show: false,
          },

          data: [
            {
              value: rate * 270,
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: (rate * 100).toFixed(1) + '%',
                  textStyle: {
                    color: 'rgba(22, 181, 232, 1)',
                    fontSize: 32,
                    fontFamily: 'DIN-Medium',
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: linear_color,
                  borderWidth: 10,
                },
              },
            },
            {
              value: 270 - rate * 270,
              itemStyle: {
                normal: {
                  borderColor: 'rgba(6, 42, 82, 1)',
                  borderWidth: 10,
                },
              },
            },
            {
              value: 90,
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                },
              },
            },
          ],
        },
      ],
    };
    this.myChart.setOption(option);
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
export default Payment;
