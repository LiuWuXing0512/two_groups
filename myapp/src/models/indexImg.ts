import { IIndexImg } from '@/interfaces';
import { getIndexImg } from '@/services';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';


// 模块的接口
export interface IndexImgModelType {
  namespace: 'indexImg';
  state: IIndexImg;
  effects: {
    getIndexImg: Effect
  };
  reducers: {
    save: Reducer<IIndexImg>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}

// 模块的定义
const IndexImgModel: IndexImgModelType = {
  namespace: 'indexImg',

  state: {
    records: [],
    total: 0,
    size: 1,
    current: 10,
    searchCount: false,
    pages: 0,
  },

  // 异步action
  effects: {
    *getIndexImg({payload }, { call, put, select}){
        const {size, current} = yield select(state=>state.indexImg)
        const obj = {
            size, current,
            ...payload,
        };
        const result = yield getIndexImg(obj)
        yield put({
            type: 'save',
            payload: result,
        });
    }
  }, 

  // 同步action
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  }
};

export default IndexImgModel;