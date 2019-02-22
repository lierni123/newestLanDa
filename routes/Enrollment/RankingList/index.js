import React, { Component } from 'react';
import styles from './index.module.less';
import personBg from '../../../images/person.png';
import { observer } from 'mobx-react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
function Circle({ n }) {
  return <span className={styles.circle + ' ' + styles['circle' + n]}>{n}</span>;
}
class PeopleIcon extends Component {
  render() {
    const n = this.props.n;
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(1);
    }

    //console.log(arr);
    return (
      <div className={styles.personContainer}>
        {arr.map((value, key) => {
          return (
            <span
              key={key}
              className={styles.personBg}
              style={{ backgroundImage: 'url(' + personBg + ')' }}
            />
          );
        })}
      </div>
    );
  }
}
@observer
class RankingList extends Component {
  wrap = React.createRef();
  ul = React.createRef();
  first = React.createRef();
  end = React.createRef();
  liHeight = 0;
  n = 0;
  timer = -1;
  t = -1;

  constructor(props) {
    super(props);
    this.state = {
      countData: [],
    };
    this.mySwiper = null;
  }

  render() {
    const countData = this.props.data;
    return (
      <div className={styles.wrap} ref={this.wrap}>
        <div className="swiper-containerList">
          <div className="swiper-wrapper">
            <div className="swiper-slide swiper-no-swiping">
              <ul className={styles.ranking} ref={this.ul}>
                {countData.slice(0, 5).map((value, key) => {
                  return (
                    <li key={key}>
                      <div className={styles.left}>
                        <Circle n={key + 1} />
                      </div>
                      <div className={styles.right}>
                        <h2 className={styles.schoolName}>{value.stationname}</h2>
                        <div className={styles.detail}>
                          <PeopleIcon n={10 - key} />
                          <span className={styles.personNum}>{value.signcount}人</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="swiper-slide swiper-no-swiping">
              <ul className={styles.ranking} ref={this.ul}>
                {countData.slice(5).map((value, key) => {
                  return (
                    <li key={key}>
                      <div className={styles.left}>
                        <Circle n={key + 6} />
                      </div>
                      <div className={styles.right}>
                        <h2 className={styles.schoolName}>{value.stationname}</h2>
                        <div className={styles.detail}>
                          <PeopleIcon n={5 - key} />
                          <span className={styles.personNum}>{value.signcount}人</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.pagination}>
          <span ref={this.first} className={styles.active} />
          <span ref={this.end} />
        </div>
      </div>
    );
  }
  autoPlay = () => {
    const first = this.first.current;
    const end = this.end.current;
    if (this.t) clearTimeout(this.t);
    this.t = setTimeout(() => {
      this.n++;
      if (this.n == 1) {
        end.style.background = 'rgba(255, 255, 255, 0.7)';
        first.style.background = 'rgba(255, 255, 255, 0.25)';
      }
      if (this.n >= 2) {
        this.n = 0;
        first.style.background = 'rgba(255, 255, 255, 0.7)';
        end.style.background = 'rgba(255, 255, 255, 0.25)';
      }
      this.mySwiper.slideTo(this.n, 100, false);
      //this.autoPlay();
    }, 10 * 1000);
  };
  componentDidMount() {
    this.mySwiper = new Swiper('.swiper-containerList', {
      grabCursor: false,
      followFinger: false,
    });
    setTimeout(() => {
      this.mySwiper.slideTo(this.n, 100, false);
      this.autoPlay();
    }, 100);
  }
  componentWillUnmount() {
    clearTimeout(this.t);
  }
}
export default RankingList;
