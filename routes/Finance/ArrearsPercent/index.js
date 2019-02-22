import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
import metaCodeAPI from '../apis/metaCode';
const hideStyle = {
  normal: {
    color: '#062A52', //未完成的圆环的颜色
    label: {
      show: false,
    },
    labelLine: {
      show: false,
    },
  },
  emphasis: {
    show: false,
  },
};
export default class DevicesInfo extends Component {
  t = -1;
  constructor(props) {
    super(props);
    this.dom = React.createRef();
    this.state = {
      arrearsPercent: [],
    };
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>各层次学生欠费率</div>
        <div ref={this.dom} className={styles.chart} />
        <ul className={styles.tag}>
          {this.state.arrearsPercent.map((item, key) => {
            let name = item.studentlayername;
            let rate = parseFloat(item.arrearsrate);
            rate = rate.toFixed(1) + '%';
            if (key == 0) {
              name = '专升本';
            } else if (key == 1) {
              name = '高起专';
            } else {
              name = '高起本';
            }
            return (
              <li key={key}>
                <span className={styles['color' + key]} />
                <div className={styles.dataShow}>
                  <p className={styles.percents}>{rate}</p>
                  <p className={styles.name}>{name}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  async getData() {
    if (this.t) clearTimeout(this.t);
    const param = '2c9090ec68130998016813099c91000e;2c9090ec68130998016813099cb50026';
    const data = await metaCodeAPI.getListMeta(param);
    let jsonParam = data.data;
    let scrollData = JSON.parse(jsonParam).pageMaplist;
    this.setState({
      arrearsPercent: scrollData,
    });
    this.setOption();
    this.t = setTimeout(() => {
      this.getData();
    }, 3 * 1000);
  }

  componentDidMount() {
    this.getData();
    this.myChart = echarts.init(this.dom.current);
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.timer);
    this.myChart.dispose();
    clearTimeout(this.t);
  }
  setOption = () => {
    const option = {
      series: [
        {
          name: 'Line 1',
          type: 'pie',
          silent: true,
          clockWise: true, //顺时针
          radius: [55, 65],
          label: {
            normal: {
              show: false,
              position: 'inside',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          hoverAnimation: true,
          data: [
            {
              value: this.state.arrearsPercent[0].arrearsrate.replace('%', ''),
              name: 'A',
              itemStyle: {
                color: '#16B5E8',
              },
            },
            {
              value: 100 - this.state.arrearsPercent[0].arrearsrate.replace('%', ''),
              name: 'hide',
              itemStyle: hideStyle,
            },
          ],
        },
        {
          name: 'Line 2',
          type: 'pie',
          clockWise: true, //顺时针
          radius: [70, 80],
          label: {
            normal: {
              show: false,
              position: 'inside',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          hoverAnimation: false,
          data: [
            {
              value: this.state.arrearsPercent[1].arrearsrate.replace('%', ''),
              name: 'B',
              itemStyle: {
                color: '#FF9A50',
              },
            },
            {
              value: 100 - this.state.arrearsPercent[1].arrearsrate.replace('%', ''),
              name: 'hide',
              itemStyle: hideStyle,
            },
          ],
        },
        {
          name: 'Line 3',
          type: 'pie',
          clockWise: true, //顺时针
          radius: [85, 95],
          label: {
            normal: {
              show: false,
              position: 'inside',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          hoverAnimation: false,
          data: [
            {
              value: this.state.arrearsPercent[2].arrearsrate.replace('%', ''),
              name: 'C',
              itemStyle: {
                color: '#FF7092',
              },
            },
            {
              value: 100 - this.state.arrearsPercent[2].arrearsrate.replace('%', ''),
              name: 'hide',
              itemStyle: hideStyle,
            },
          ],
        },
      ],
    };
    this.myChart.setOption(option);
  };
  onResize = () => {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.myChart.resize();
    }, 300);
  };
}
