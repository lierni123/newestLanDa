import { observable, action, runInAction } from 'mobx';
import metaCodeAPI from './apis/metaCode';
class Store {
  @observable payList = []; //各招生批次缴费
  @observable arrearsList = []; //欠费率排名
  @observable payMentList = []; //总体缴费
  @observable stuArrearstList = []; //学生欠费

  @action async payment() {
    //各招生批次缴费
    const param =
      '2c9090ec68130998016813099c8f000a;2c9090ec68130998016813099c9a0020;2c9090ec68130998016813099cb40022;2c9090ec68130998016813099cb50026';
    const data = await metaCodeAPI.getListMeta(param);
    runInAction(() => {
      if (data) {
        let jsonParam = data.data;
        let scrollData = JSON.parse(jsonParam).pageMaplist;
        this.payList = scrollData;
      }
    });
  }
  @action async arrearsRanking() {
    //欠费率排名
    const param = '2c9090ec68130998016813099c970016;2c9090ec68130998016813099cb50026';
    const data = await metaCodeAPI.getListMeta(param);
    runInAction(() => {
      if (data) {
        let jsonParam = data.data;
        let arrearsData = JSON.parse(jsonParam).pageMaplist;
        arrearsData.sort((a, b) => {
          let dvalue = b.arrearsrate.replace('%', '') - a.arrearsrate.replace('%', '');
          return dvalue;
        });
        let topEight = arrearsData.slice(0, 8);
        this.arrearsList = topEight;
      }
    });
  }
  @action async paymentGloble() {
    //总体缴费
    const param =
      '2c9090ec68130998016813099c8e0006;2c9090ec68130998016813099cb40022;2c9090ec68188497016818849c310028;2c9090ec68130998016813099c9a0020;2c9090ec68130998016813099cb50024;2c9090ec68188497016818849c32002c;2c9090ec68188497016818849c32002a;2c9090ec68188497016818849c32002e';
    const data = await metaCodeAPI.getListMeta(param);
    runInAction(() => {
      if (data) {
        let payBatch = data.data;
        let payBatchData = JSON.parse(payBatch).pageMaplist;
        this.payMentList = payBatchData;
      }
    });
  }
  @action async stuArrears() {
    //学生欠费
    const param =
      '2c9090ec68130998016813099c8e0006;2c9090ec68130998016813099cb40022;2c9090ec68188497016818849c310028;2c9090ec68130998016813099c9a0020;2c9090ec68130998016813099cb50024;2c9090ec68188497016818849c32002c;2c9090ec68188497016818849c32002a;2c9090ec68188497016818849c32002e';
    const data = await metaCodeAPI.getListMeta(param);
    runInAction(() => {
      if (data) {
        let jsonParam = data.data;
        let financeData = JSON.parse(jsonParam).pageMaplist;
        this.stuArrearstList = financeData;
      }
    });
  }
}

const store = new Store();
export default store;
