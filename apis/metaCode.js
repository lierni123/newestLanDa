import request from '@utils/request';

//列表
function getListMeta(code) {
  return request(
    'common/system/getpagelistmeta',
    {
      method: 'post',
      data: { metaDataCode: code },
    },
    false
  );
}

const metaCodeAPI = {
  getListMeta,
};
export default metaCodeAPI;
