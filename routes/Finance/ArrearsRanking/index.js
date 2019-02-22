import React, { Component } from 'react';
import styles from './index.module.less';
import Progress from './Progress';
import metaCodeAPI from '../apis/metaCode';
import { observer } from 'mobx-react';
@observer
class ArrearsRanking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
    };
  }
  // async getData() {
  //   const param = '2c9090ec68130998016813099c970016;2c9090ec68130998016813099cb50026';
  //   const data = await metaCodeAPI.getListMeta(param);
  //   let jsonParam = data.data;
  //   let arrearsData = JSON.parse(jsonParam).pageMaplist;
  //   console.log(arrearsData);
  //   arrearsData.sort((a, b) => {
  //     let dvalue = b.arrearsrate.replace('%', '') - a.arrearsrate.replace('%', '');
  //     return dvalue;
  //   });
  //   let topEight = arrearsData.slice(0, 8);
  //   this.setState({
  //     progress: topEight,
  //   });
  // }

  // componentDidMount() {
  //   this.getData();
  // }
  render() {
    const progress = this.props.data;
    const n = this.props.n;
    const arr = [];
    for (let i = 1; i < n; i++) {
      arr.push(i);
    }

    return (
      <div>
        <h2 className={styles.tilte}>学习中心欠费率排名TOP8</h2>
        {progress.map((value, key) => {
          let rate = parseFloat(value.arrearsrate);
          rate = rate.toFixed(1) + '%';
          return (
            <div key={key}>
              <div className={styles.processBar}>
                <span className={styles.circle + ' ' + styles['circle' + key]}>{key + 1}</span>
                <div>
                  <span>{value.stationname}</span>
                  <span className={styles.fr}>{rate}</span>
                </div>
                <div className={styles.bar}>
                  <Progress percent={value.arrearsrate} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArrearsRanking;
