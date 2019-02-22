import React, { PureComponent } from 'react';
import styles from './index.module.less';
import metaCodeAPI from '../apis/metaCode';
import { observer } from 'mobx-react';
@observer
class NumberRoll extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }
  componentDidMount() {
    this.getData();
  }
  // scroll = () => {
  //   const rollNumber = this.props.data[0].signcount;
  //   console.log(rollNumber);
  //   setInterval(() => {
  //     this.setState(
  //       {
  //         data: '0035355',
  //       },
  //       () => {
  //         setTimeout(() => {
  //           this.setState({
  //             data: rollNumber,
  //           });
  //         }, 1 * 1000);
  //       }
  //     );
  //   }, 30 * 1000);
  // };
  // componentWillReact() {
  //   this.scroll();
  // }
  async getData() {
    const param =
      '2c90909a683c7f0501683c7f0abe0006;2c90909a683c7f0501683c7f0aca0018;2c90909a683c7f0501683c7f0aca001a;2c90909a683c7f0501683c7f0acb001c;2c90909a683c7f0501683c7f0acc001e;2c90909a683c7f0501683c7f0acc0020';
    const data = await metaCodeAPI.getListMeta(param);
    if (data) {
      let payBatch = data.data;
      let payBatchData = JSON.parse(payBatch).pageMaplist;
      const time = payBatchData[0].recruitbatchname;
      let rollNumber = payBatchData[0].signcount.replace(/,/g, '');
      let recruitbatchname = time.slice(0, 4) + '-' + time.slice(4);
      this.setState({
        data: rollNumber,
        recruitbatchname: recruitbatchname,
      });
      setInterval(() => {
        this.setState(
          {
            data: '003534',
          },
          () => {
            setTimeout(() => {
              this.setState({
                data: rollNumber,
              });
            }, 1 * 1000);
          }
        );
      }, 30 * 1000);
    }
  }
  render() {
    //let rollNumber = this.props.data;
    const data = this.state.data.toString();
    const initArr = ['0', '0', '0', '0', '0', '0'];
    initArr.splice(6 - data.length, data.length, ...data.split('')); //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
    return (
      <div className={styles.normal}>
        <div className={styles.time}>{this.state.recruitbatchname} 招生批次</div>
        <div className={styles.flex}>
          {initArr.map((item, index) => {
            const coms = [];
            if (item * -100 === -900) {
              coms.push(
                <div key={index} className={styles.bg}>
                  <span className={styles.count} style={{ backgroundPositionY: item * -100 }} />
                </div>
              );
            } else {
              coms.push(
                <div key={index} className={styles.bg}>
                  <span className={styles.count} style={{ backgroundPositionY: item * -100 }} />
                </div>
              );
            }
            if (index === 2) {
              coms.push(<span className={styles.dot} />);
            }
            return coms;
          })}
        </div>
      </div>
    );
  }
}
export default NumberRoll;
