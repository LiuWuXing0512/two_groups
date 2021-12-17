import { ISpec ,RootObject} from '@/interfaces';
import { getSpec } from '@/services';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

// 模块内部state接口
export interface SpecState {
  RootObject:RootObject,
}

// 模块的接口
export interface SpecModelType {
  namespace: 'spec';
  state: SpecState;
  effects: {
    getSpec: Effect;
  };
  reducers: {
    SpecData: Reducer<ISpec>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}

// 模块的定义
const SpecModel: SpecModelType = {
  namespace: 'spec',

  state: {
    RootObject:{} as RootObject,
  },

  // 异步action
  effects: {
    *getSpec({ payload }, { put, call, select }) {
      console.log(payload, 'specpayload...');
      let result = yield getSpec(payload);
      // 从redux中拿到状态
      const specObj = yield select((state) => state.spec.RootObject);
      if (!specObj.length) {
        yield put({
          type: 'SpecData',
          payload:{ RootObject:result},
        });
      }
    },
  },

  // 同步action
  reducers: {
    SpecData(state, action) {
      console.log(action.payload,'52...spec');
      
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname }) => {
  //       if (pathname !== '/login') {
  //         dispatch({
  //           type: 'getSpec',
  //         });
  //       }
  //     });
  //   },
  // },
};

export default SpecModel;
