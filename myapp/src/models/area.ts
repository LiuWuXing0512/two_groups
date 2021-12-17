import { getAreaList } from '@/services';

let list;
const addressFilter = (addressList, parentId) => {
  if (parentId === 0) {
    list = addressList.filter(item => item.parentId === parentId)
    list.map(item => Object.defineProperty(item, 'children', { value: addressFilter(addressList, item.areaId), writable: true }));
    return list;
  } else {
    list.map(item => {
      if (item.children) {
        return item.children.map(items => Object.defineProperty(items, 'children', { value: addressList.filter(level3 => level3.parentId === items.areaId), writable: true }))
      }
    })
    return addressList.filter(item => item.parentId === parentId)
  }
}
// 模块的定义
const AreaModel = {
  namespace: 'area',

  state: {
    areaList: [],
  },

  // 异步action
  effects: {
    *addressList({ payload, callback }, { put, call }) {
      let result = yield getAreaList(payload)
      yield put({
        type: 'setAreaList',
        payload: addressFilter(result, 0)
      })
    }
  },

  // 同步action
  reducers: {
    setAreaList(state, action) {
      return {
        ...state,
        areaList: action.payload
      }
    }
  },

  subscriptions: {

  },
};

export default AreaModel;