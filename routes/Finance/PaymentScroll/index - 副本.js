import React, { Component } from 'react';
import styles from './index.module.less';
import metaCodeAPI from '../apis/metaCode';
class PaymentScroll extends Component {
  warp = React.createRef();
  ul = React.createRef();
  liHeight = 0;
  n = 0;
  timer = -1;
  t = -1;
  constructor(props) {
    super(props);
    this.state = {
      paymentList: [],
    };
  }

  scrollBar = () => {
    if (this.t) clearTimeout(this.t);
    const warp = this.warp.current;
    const ul = this.ul.current;
    const lis = ul.children;
    let liHeight = 0;
    if (lis.length > 0) {
      liHeight = lis[0].clientHeight;
      if (this.n >= 0) {
        this.n = -(ul.clientHeight - warp.clientHeight);
      } else {
        this.n += liHeight;
      }
      ul.style.transform = `translateY(${this.n}px)`;
    }
    this.t = setTimeout(() => {
      this.scrollBar();
    }, 3000);
  };
  async getData() {
    const param =
      '2c9090ec68130998016813099c8f000a;2c9090ec68130998016813099c9a0020;2c9090ec68130998016813099cb40022;2c9090ec68130998016813099cb50026';
    const data = await metaCodeAPI.getListMeta(param);
    let jsonParam = data.data;
    let scrollData = JSON.parse(jsonParam).pageMaplist.slice(0, 8);
    this.setState({
      paymentList: scrollData,
    });
  }

  componentDidMount() {
    this.scrollBar(); //开启数据播报
    this.getData();
  }
  componentWillUnmount() {
    clearTimeout(this.t);
  }
  render() {
    return (
      <div>
        <h2 className={styles.title}>各招生批次缴费情况</h2>
        <div className={styles.content}>
          <ul className={styles.itemName}>
            <li>入学批次</li>
            <li>应收(万元)</li>
            <li>实收(万元)</li>
            <li>欠费率</li>
          </ul>
          <div className={styles.ulCon} ref={this.warp}>
            <ul className={styles.list} ref={this.ul}>
              {this.state.paymentList.map((value, key) => {
                let time = value.gradename;
                let receivable = value.receivable.replace(/,/g, '');
                let received = value.received.replace(/,/g, '');
                received = received.slice(0, -4) + '.' + received.slice(-4, -2);
                receivable = receivable.slice(0, -4) + '.' + receivable.slice(-4, -2);
                let arrearsrate = value.arrearsrate;
                if (time.length === 1) {
                  time = 0;
                } else {
                  time = time.substring(0, 4) + '-' + time.substring(4);
                }
                if (receivable.length === 1) {
                  receivable = 0;
                }
                if (received.length === 1) {
                  received = 0;
                }
                if (arrearsrate.length === 1) {
                  arrearsrate = '100%';
                }
                return (
                  <li key={key}>
                    <span>{time}</span>
                    <span>{receivable}</span>
                    <span>{received}</span>
                    <span>{arrearsrate}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentScroll;
