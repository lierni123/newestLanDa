import React, { Component } from 'react';
import styles from './index.module.less';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import { observer } from 'mobx-react';
const filters = [
  (item, index) => index < 5,
  (item, index) => index >= 5 && index < 10,
  (item, index) => index >= 10 && index < 15,
  (item, index) => index >= 15 && index < 20,
];
@observer
class PaymentScroll extends Component {
  warp = React.createRef();
  ul = React.createRef();
  liHeight = 0;
  n = 0;
  timer = -1;
  t = -1;
  filterIndex = 0;
  dataLength = 0;
  constructor(props) {
    super(props);
    this.mySwiper = null;
  }
  autoPlay = () => {
    if (this.t) clearTimeout(this.t);
    this.t = setTimeout(() => {
      this.n++;
      if (this.n >= this.dataLength) {
        this.n = 0;
      }
      this.mySwiper.slideTo(this.n, 100, false);
      this.autoPlay();
    }, 10 * 1000);
  };
  componentDidMount() {
    this.mySwiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-paginations',
      },
      grabCursor: false,
      followFinger: false,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
    });
    setTimeout(() => {
      this.mySwiper.slideTo(this.n, 100, false);
      this.autoPlay();
    }, 100);
  }
  componentWillUnmount() {
    clearTimeout(this.t);
  }
  render() {
    const paymentList = this.props.data;
    let array = [];
    this.dataLength = parseInt(paymentList.length / 5, 0) + 1;
    if (this.dataLength > 4) {
      this.dataLength = 4; //展示四屏
    }
    for (let i = 0; i < this.dataLength; i++) {
      array.push(1);
    }

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
          <div className="swiper-container" style={{ height: 3 + 'rem' }}>
            <div className="swiper-wrapper swiper-no-swiping">
              {array.map((item, index) => {
                return (
                  <ul className="swiper-slide ulCon " ref={this.ul} key={index}>
                    {paymentList.filter(filters[index]).map((value, key) => {
                      let time = value.gradename;
                      let receivable = value.receivable.replace(/,/g, '');
                      let received = value.received.replace(/,/g, '');
                      let arrearsrate = value.arrearsrate;
                      let receive_real;
                      let received_real;

                      if (arrearsrate && arrearsrate.length > 1) {
                        arrearsrate = parseFloat(arrearsrate).toFixed(1) + '%';
                      }
                      if (received.length > 4) {
                        received_real = received.slice(0, -4) + '.' + received.slice(-4, -2);
                      } else if (received.length <= 4 && received.length > 1) {
                        received_real = 0 + '.' + received.slice(-4, -2);
                      } else {
                        received_real = 0;
                      }

                      if (receivable.length > 4) {
                        receive_real = receivable.slice(0, -4) + '.' + receivable.slice(-4, -2);
                      } else if (receivable.length <= 4 && receivable.length > 1) {
                        receive_real = 0 + '.' + receivable.slice(-4, -2);
                      } else {
                        receive_real = 0;
                      }

                      if (receive_real == received_real) {
                        arrearsrate = 0;
                      }

                      if (time.length >= 6) {
                        time = time.substring(0, 4) + '-' + time.substring(4);
                      }

                      return (
                        <li key={key}>
                          <span>{time}</span>
                          <span>{receive_real}</span>
                          <span>{received_real}</span>
                          <span>{arrearsrate}</span>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
          </div>
          <div className="swiper-paginations" />
        </div>
      </div>
    );
  }
}

export default PaymentScroll;
