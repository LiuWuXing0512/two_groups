import { getAreaList } from '@/services';
import { IaddressList, Istate } from '@/interfaces';
import { Effect, Reducer } from 'umi';


let list: Array<IaddressList> = [];
const addressFilter = (addressList: IaddressList, parentId: number) => {
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


export interface AreaModelType {
  namespace: 'area';
  state: Istate;
  effects: {
    addressList: Effect;
  };
  reducers: {
    setAreaList: Reducer;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}



// 模块的定义
const AreaModel: AreaModelType = {
  namespace: 'area',

  state: {
    areaList: [],
  },

  // 异步action
  effects: {
    *addressList({ payload }, { put }) {
      let result = yield getAreaList(payload)
      yield put({
        type: 'setAreaList',
        payload: addressFilter(result, 0)
      })
    },
    
  },

  // 同步action
  reducers: {
    setAreaList(state, action) {
      return {
        ...state,
        areaList: action.payload
      }
    },
  },
};

export default AreaModel;