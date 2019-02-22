import React, { Component } from 'react';
import styles from './index.module.less';
import echarts from 'echarts';
import metaCodeAPI from '../apis/metaCode';
export default class DevicesInfo extends Component {
  constructor() {
    super();
    this.dom = React.createRef();
    this.state = {
      pageMaplist: [
        {
          arrearsstudentscount: '',
          studentscount: '',
          arrears: '',
          arrearsstudentsrate: '',
        },
      ],
    };
  }
  render() {
    let arrears = this.state.pageMaplist[0].arrears.replace(/,/g, '');
    let arrearsstudentscount = this.state.pageMaplist[0].arrearsstudentscount.replace(/,/g, '');
    arrears = arrears.slice(0, -4) + '.' + arrears.slice(-4, -2);
    return (
      <div className={styles.normal}>
        <div className={styles.title}>学生欠费情况</div>
        <div ref={this.dom} className={styles.chart} />
        <div className={styles.arrearage}>
          <span className={styles.arrearagePerson}>欠费人数:&nbsp;</span>
          <i className={styles.arrearageNum}>{arrearsstudentscount}人</i>
        </div>
        <div className={styles.arrearage}>
          <span className={styles.arrearagePerson}>欠费金额:&nbsp;</span>
          <i className={styles.arrearageNum}>{arrears}万元</i>
        </div>
      </div>
    );
  }
  async getData() {
    const param =
      '2c9090ec68130998016813099c8e0006;2c9090ec68130998016813099cb40022;2c9090ec68188497016818849c310028;2c9090ec68130998016813099c9a0020;2c9090ec68130998016813099cb50024;2c9090ec68188497016818849c32002c;2c9090ec68188497016818849c32002a;2c9090ec68188497016818849c32002e';
    const data = await metaCodeAPI.getListMeta(param);
    let jsonParam = data.data;
    let financeData = JSON.parse(jsonParam).pageMaplist;
    this.setState({
      pageMaplist: financeData,
    });
    this.setOption();
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
  }
  setOption = () => {
    let studentscount = this.state.pageMaplist[0].studentscount.replace(/,/g, ''),
      arrearsstudentsrate = this.state.pageMaplist[0].arrearsstudentsrate.replace('%', '');
    const option = {
      title: {
        text: '应缴费人数',
        subtext: studentscount + '人',
        x: 'center',
        y: 'center',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.6)',
          fontFamily: 'PingFangSC-Regular',
          fontSize: 14,
          fontWeight: 300,
        },
        subtextStyle: {
          color: '#fff',
          fontFamily: 'DIN-Medium',
          fontSize: 20,
        },
      },

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
          radius: ['55%', '90%'],
          startAngle: 220,

          label: {
            formatter: ['{a|{b}}', '{b|{d}%}'].join('\n'),
            rich: {
              a: {
                color: '#fff',
                fontSize: 12,
                fontFamily: 'PingFangSC-Regular',
              },
              b: {
                color: '#fff',
                fontSize: 20,
                fontFamily: 'DIN-Medium',
              },
            },
          },
          labelLine: {
            length: 10,
            length2: 5,
            smooth: true,
          },

          data: [
            {
              value: 100 - arrearsstudentsrate,
              name: '缴费学生占比',
              itemStyle: {
                color: '#062A52',
              },
              label: {
                show: false,
              },
            },
            {
              value: arrearsstudentsrate,
              name: '欠费学生占比',
              itemStyle: {
                color: '#16B5E8',
              },
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
