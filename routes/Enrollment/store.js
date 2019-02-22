import { observable, action, runInAction } from 'mobx';
import metaCodeAPI from './apis/metaCode';
class Store {
  @observable paybatchList = []; //报名转化率
  @observable weekDataList = []; //一周报名人数
  @observable studentsList = []; //报名学生层次
  @observable studyCenterList = []; //学习中心报名排行
  @observable majorList = []; //专业前十排行
  @action async getData() {
    //报名转化率
    const param =
      '2c90909a683c7f0501683c7f0abe0006;2c90909a683c7f0501683c7f0aca0018;2c90909a683c7f0501683c7f0aca001a;2c90909a683c7f0501683c7f0acb001c;2c90909a683c7f0501683c7f0acc001e;2c90909a683c7f0501683c7f0acc0020';
    const data = await metaCodeAPI.getListMeta(param);
    runInAction(() => {
      if (data) {
        let payBatch = data.data;
        let payBatchData = JSON.parse(payBatch).pageMaplist;
        this.paybatchList = payBatchData;
      }
    });
  }
  @action async weekData() {
    //报名人数变化
    const param =
      '2c90909a683c7f0501683c7f0abe0006;2c90909a683c7f0501683c7f0abf0008;2c90909a683c7f0501683c7f0aca0018';
    const data = await metaCodeAPI.getListMeta(param);
    runInAction(() => {
      if (data) {
        let payBatch = data.data;
        let payBatchData = JSON.parse(payBatch).pageMaplist.slice(0, 7);
        this.weekDataList = payBatchData;
      }
    });
  }
  @action async studentsLayer() {
    //学生层次分布
    const param =
      '2c90909a683c7f0501683c7f0abe0006;2c90909a683c7f0501683c7f0ac2000e;2c90909a683c7f0501683c7f0aca0018';
    const data = await metaCodeAPI.getListMeta(param);
    runInAction(() => {
      if (data) {
        let payBatch = data.data;
        let signcount = JSON.parse(payBatch).pageMaplist;
        this.studentsList = signcount;
      }
    });
  }
  @action async studyCenter() {
    //学习中心报名排行
    const param =
      '2c90909a683c7f0501683c7f0abe0006;2c90909a683c7f0501683c7f0ac70012;2c90909a683c7f0501683c7f0aca0018';
    const data = await metaCodeAPI.getListMeta(param);
    runInAction(() => {
      if (data) {
        let majorRanking = data.data;
        let majorcount = JSON.parse(majorRanking).pageMaplist;
        majorcount.sort((a, b) => {
          let dvalue = b.signcount.replace(',', '') - a.signcount.replace(',', '');
          return dvalue;
        });
        const rankingCount = majorcount.slice(0, 10);
        this.studyCenterList = rankingCount;
      }
    });
  }
  @action async majorCenter() {
    //专业前十排行
    const param =
      '2c90909a683c7f0501683c7f0abe0006;2c90909a683c7f0501683c7f0ac30010;2c90909a683c7f0501683c7f0aca0018';
    const data = await metaCodeAPI.getListMeta(param);
    runInAction(() => {
      if (data) {
        let majorRanking = data.data;
        let majorcount = JSON.parse(majorRanking).pageMaplist.slice(0, 10);
        majorcount.sort((a, b) => {
          let dvalue = b.signcount.replace(',', '') - a.signcount.replace(',', '');
          return dvalue;
        });
        this.majorList = majorcount;
      }
    });
  }
}

const store = new Store();
export default store;
