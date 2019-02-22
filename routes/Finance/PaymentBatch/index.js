import React, { Component } from 'react';
import styles from './index.module.less';
import metaCodeAPI from '../apis/metaCode';
class PaymentBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrearsList: [
        {
          receivable: '',
          arrears: '',
          paybatchname: '',
          received: '',
        },
      ],
    };
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const param =
      '2c9090ec68130998016813099c8e0006;2c9090ec68130998016813099cb40022;2c9090ec68188497016818849c310028;2c9090ec68130998016813099c9a0020;2c9090ec68130998016813099cb50024;2c9090ec68188497016818849c32002c;2c9090ec68188497016818849c32002a;2c9090ec68188497016818849c32002e';
    const data = await metaCodeAPI.getListMeta(param);
    let payBatch = data.data;
    let payBatchData = JSON.parse(payBatch).pageMaplist;
    this.setState({
      arrearsList: payBatchData,
    });
  }
  render() {
    const list = this.state.arrearsList[0];
    let name = list.paybatchname.substring(0, 4) + '-' + list.paybatchname.substring(4);
    let receivable = list.receivable.replace(/,/g, '');
    receivable = receivable.slice(0, -4) + '.' + receivable.slice(-4, -2);
    let received = list.received.replace(/,/g, '');
    received = received.slice(0, -4) + '.' + received.slice(-4, -2);
    let arrears = list.arrears.replace(/,/g, '');
    arrears = arrears.slice(0, -4) + '.' + arrears.slice(-4, -2);
    return (
      <div>
        <h2 className={styles.payTime}>
          缴费批次：<span className={styles.time}>{name}</span>
        </h2>
        <ul className={styles.head}>
          <li>应收(万元)</li>
          <li>实收(万元)</li>
          <li>欠费(万元)</li>
        </ul>
        <ul className={styles.data}>
          <li className={styles.number} style={{ color: '#fff' }}>
            {receivable}
          </li>
          <li className={styles.number} style={{ color: '#16B5E8' }}>
            {received}
          </li>
          <li className={styles.number} style={{ color: '#FF9A50' }}>
            {arrears}
          </li>
        </ul>
      </div>
    );
  }
}

export default PaymentBatch;
