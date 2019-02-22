import request from '@utils/request';

//列表
function getListMeta(itemSystemIds) {
  return request(
    'myanalytics/base/analysis/getcontent',
    {
      method: 'post',
      data: {
        data: {
          itemSystemIds: itemSystemIds,
          metaDataCode: 'str',
          controller: 'xbase.mvc',
          method: 'sqlQuery',
          classId: 'com.board.ChargeBoardBasic',
          isChart: 'true',
          isChartList: 'true',
          pageSize: 30,
          tenantid: '84181',
        },
      },
    },
    false
  );
}

const metaCodeAPI = {
  getListMeta,
};
export default metaCodeAPI;
