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
          classId: 'com.board.RecruitBoardBasic',
          method: 'sqlQuery',
          isChart: 'true',
          isChartList: 'true',
          currentpage: '1',
          pageSize: '40',
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
