import React, { Component } from 'react';
import styles from './index.module.less';
import personBg from '../../../images/person.png';
import { observer } from 'mobx-react';
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
  liHeight = 0;
  n = 0;
  timer = -1;
  t = -1;
  constructor(props) {
    super(props);
    this.state = {
      countData: [],
    };
  }
  scrollBar = () => {
    if (this.t) clearTimeout(this.t);
    const wrap = this.wrap.current;
    const ul = this.ul.current;
    const lis = ul.children;
    let liHeight = 0;
    if (lis.length > 0) {
      liHeight = lis[0].clientHeight;
      let wrapTop = -wrap.clientHeight;
      if (this.n >= wrapTop) {
        this.n -= liHeight;
      } else {
        this.n = 0;
      }
      ul.style.transform = `translateY(${this.n}px)`;
    }
    this.t = setTimeout(() => {
      this.scrollBar();
    }, 3000);
  };

  render() {
    const countData = this.props.data;
    return (
      <div className={styles.wrap} ref={this.wrap}>
        <ul className={styles.ranking} ref={this.ul}>
          {countData.map((value, key) => {
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
    );
  }

  componentDidMount() {
    this.scrollBar();
  }
  componentWillUnmount() {
    clearTimeout(this.t);
  }
}
export default RankingList;
