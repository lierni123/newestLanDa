import React, { Component } from 'react';
import styles from './index.module.less';
import personBg from '../../../images/person.png';
import metaCodeAPI from '../apis/metaCode';
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
  // scrollBar = () => {
  //   if (this.t) clearTimeout(this.t);
  //   const wrap = this.wrap.current;
  //   const ul = this.ul.current;
  //   const lis = ul.children;
  //   let liHeight = 0;
  //   if (lis.length > 0) {
  //     liHeight = lis[0].clientHeight;
  //     let wrapTop = -wrap.clientHeight;
  //     if (this.n >= wrapTop) {
  //       this.n -= liHeight;
  //     } else {
  //       this.n = 0;
  //     }
  //     ul.style.transform = `translateY(${this.n}px)`;
  //   }
  //   this.t = setTimeout(() => {
  //     this.scrollBar();
  //   }, 3000);
  // };
  async getData() {
    const param =
      '2c90909a683c7f0501683c7f0abe0006;2c90909a683c7f0501683c7f0ac70012;2c90909a683c7f0501683c7f0aca0018';
    const data = await metaCodeAPI.getListMeta(param);
    if (data) {
      let majorRanking = data.data;
      let majorcount = JSON.parse(majorRanking).pageMaplist;
      majorcount.sort((a, b) => {
        let dvalue = b.signcount.replace(',', '') - a.signcount.replace(',', '');
        return dvalue;
      });
      const rankingCount = majorcount.slice(0, 10);
      this.setState({
        countData: rankingCount,
      });
      console.log(this.state.countData)
    }
  }
  render() {
    return (
      <div className={styles.wrap} ref={this.wrap}>
        <ul className={styles.ranking} ref={this.ul}>
          {this.state.countData.map((value, key) => {
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
    this.getData();
  }
  componentWillUnmount() {
    clearTimeout(this.t);
  }
}
export default RankingList;
