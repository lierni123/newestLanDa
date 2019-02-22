import { observable, action, runInAction } from 'mobx';
import metaCodeAPI from './apis/metaCode';
import request from '@utils/request';
class Store {
  @observable realonebatchenroll = [];//招生情況
  @observable realonebatchenrollUrl = '';

  @observable realonebatchpayment = [];//缴费情况
  @observable realonebatchpaymentUrl = '';

  @observable devicesInfoData = {//各层次学生欠费率
    mobile: '',
    pc: '',
  };
  
}
const store = new Store();
export default store;
