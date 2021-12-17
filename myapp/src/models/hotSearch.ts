import {  IHotSearch, IRecordsItem } from '@/interfaces';
import { getHotSearch } from '@/services';
import { getToken } from '@/utils';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

// 模块内部state接口
export interface HotSearchState extends IPage{
    pages: number;
    records: IRecordsItem[];
    searchCount: boolean;
    total: number;
}

export interface IPage {
    current: number;
    size: number;
}

// 模块的接口
export interface HotSearchModelType {
  namespace: 'hotSearch';
  state: HotSearchState;
  effects: {
    hotSearchList: Effect;
    SearchList: Effect;
    hotSearchChange: Effect;
  };
  reducers: {
    save: Reducer<HotSearchState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}

// 模块的定义
const HotSearchModel: HotSearchModelType = {
  namespace: 'hotSearch',

  state: {
    current: 1,//当前下标
    pages: 1,
    records: [],
    searchCount: false,
    size: 10,//一页多少个
    total: 0,//共多少条
  },

  // 异步action
  effects: {
    *hotSearchList({ payload }, { call, put, select}) {
      // 从dva中拿到状态
      const state = yield select(state=>state.hotSearch)
        const obj = {
            current:state.current,
            size:state.size
        }
        let result = yield getHotSearch(obj);
        yield put({
          type: 'save',
          payload: result
        })
    },
    *SearchList({ payload }, { call, put, select}) {
      // 从dva中拿到状态
      const state = yield select(state=>state.hotSearch)
        const obj = {
            current:state.current,
            size:state.size
        }
        console.log(payload);
        
    },
    *hotSearchChange({ payload }, { call, put, select}){
      console.log(payload,'payload...74');
      
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
  },
};

export default HotSearchModel;