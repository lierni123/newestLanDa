import React, { Component } from 'react';
import Header from '../../Components/Header/header.js';
import Warp from '../../Components/Warp';
import ArrearsRanking from './ArrearsRanking';
import styles from './index.module.less';
import Payment from './Payment';
import PaymentBatch from './PaymentBatch';
import DevicesInfo from './DevicesInfo';
import PaymentScroll from './PaymentScroll';
import ArrearsPercent from './ArrearsPercent';
import { observer } from 'mobx-react';
import store from './store';
import rem from '@utils/rem';
rem(1440, 1920);
import { toFullScreen } from '@utils/tool';
@observer
class Finance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '财务播报',
    };
  }
  render() {
    const { payList, arrearsList, payMentList, stuArrearstList } = store;
    return (
      <div className="bodyindex">
        <div className="main">
          <Header title={this.state.title} />

          <div className={styles.normal}>
            <div className={styles.main}>
              <div className={styles.top}>
                <div className={styles.left}>
                  <Warp width="3.25rem" height="2.22rem" background="#07213a">
                    <Payment data={payMentList} />
                  </Warp>
                  <Warp width="3.25rem" height="4.34rem" background="#07213a">
                    <ArrearsRanking n={9} data={arrearsList} />
                  </Warp>
                </div>
                <div className={styles.center}>
                  <Warp width="6.7rem" height="2.23rem" background="#07213a">
                    <PaymentBatch />
                  </Warp>
                  <Warp width="6.7rem" height="4.34rem" background="#07213a">
                    <div className={styles.slideWrap}>
                      <PaymentScroll data={payList} />
                    </div>
                  </Warp>
                </div>
                <div className={styles.right}>
                  <Warp width="3.25rem" height="3.45rem" background="#07213a">
                    <DevicesInfo data={stuArrearstList} />
                  </Warp>
                  <Warp width="3.25rem" height="3.11rem" background="#07213a">
                    <ArrearsPercent />
                  </Warp>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  getData = () => {
    if (this.t) clearTimeout(this.t);
    store.payment();
    store.arrearsRanking();
    store.paymentGloble();
    store.stuArrears();
    this.t = setTimeout(() => {
      this.getData();
    }, 3600 * 1000);
  };
  componentDidMount() {
    toFullScreen(true);
    this.getData();
  }
}

export default Finance;
