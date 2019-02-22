import React from 'react';
import { observable, useStrict, action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
useStrict(true)
class MyState {
  @observable data = null;
  @action initData = async () => {
    const data = await getData('xxx');
    runInAction('name', () => {
      this.data = data;
    });
  };
 
}
async function timeout(){
  return "Hello World!"
}
console.log('我虽然在后面，但是我先执行')
