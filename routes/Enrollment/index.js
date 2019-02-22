import React, { Component } from 'react';
import Header from '../../Components/Header/header.js';
import Warp from '../../Components/Warp';
import Map from './Map';
import NumberRoll from './NumberRoll';
import styles from './index.module.less';
import DevicesInfo from './DevicesInfo';
import Enrollmentnumber from './Enrollmentnumber';
import Conversion from './Conversion';
import RankingList from './RankingList';
//import RankingListOne from './RankingListOne';
//import RankingListTwo from './RankingListTwo';
import MajorRanking from './MajorRanking';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import { observer } from 'mobx-react';
import store from './store';
@observer
class Students extends Component {
  t = -1;
  constructor(props) {
    super(props);
    this.state = {
      title: '招生播报',
      countData: [],
    };
  }
  getData = () => {
    if (this.t) clearTimeout(this.t);
    store.getData();
    store.weekData();
    store.studentsLayer();
    store.studyCenter();
    store.majorCenter();
    this.t = setTimeout(() => {
      this.getData();
    }, 3600 * 1000);
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const { paybatchList, weekDataList, studentsList, studyCenterList, majorList } = store;
    return (
      <div className="bodyindex">
        <div className="main">
          <Header title={this.state.title} />
          <div className={styles.normal}>
            <div className={styles.main}>
              <div className={styles.top}>
                <div className={styles.left}>
                  <Warp width="3.25rem" height="2.04rem" background="#07213a">
                    <Enrollmentnumber data={weekDataList} />
                  </Warp>
                  <Warp width="3.25rem" height="1.92rem" background="#07213a">
                    <Conversion data={paybatchList} />
                  </Warp>

                  <Warp width="3.25rem" height="2.4rem" background="#07213a">
                    <DevicesInfo data={studentsList} />
                  </Warp>
                </div>
                <div className={styles.center}>
                  <Warp width="6.7rem" height="6.76rem" background="#07213a">
                    <div style={{ width: '610px' }} className={styles.changeData}>
                      <NumberRoll data={paybatchList} />
                      <div className={styles.unit}>人</div>
                    </div>
                    <div className={styles.mapCon}>
                      <Map count={this.state.countData} />
                    </div>
                  </Warp>
                </div>
                <div className={styles.right}>
                  <Warp width="3.25rem" height="3.56rem" background="#07213a">
                    <div className={styles.normalTop}>
                      <div className={styles.title}>学习中心报名排行TOP10</div>
                      <RankingList data={studyCenterList} />
                    </div>
                  </Warp>
                  <Warp width="3.25rem" height="3rem" background="#07213a">
                    <MajorRanking data={paybatchList} colum={majorList} />
                  </Warp>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Students;
