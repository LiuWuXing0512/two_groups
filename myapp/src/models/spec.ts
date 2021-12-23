import { ISpec, RootObj } from '@/interfaces';
import { getAdd, getSpec, getSpecDel, getEdit } from '@/services';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

// 模块内部state接口
export interface SpecState {
  RootObject: RootObj;
  num: number;
}

// 模块的接口
export interface SpecModelType {
  namespace: 'spec';
  state: SpecState;
  effects: {
    getSpec: Effect;
    getSpecDel: Effect;
    getAdd: Effect;
    getEdit: Effect;
  };
  reducers: {
    SpecData: Reducer<ISpec>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };

  // subscriptions: { setup: Subscription };
}

// 模块的定义
const SpecModel: SpecModelType = {
  namespace: 'spec',

  state: {
    RootObject: {} as RootObj,
    num: 0,
  },

  // 异步action
  effects: {
    *getSpec({ payload }, { put, call, select }) {
      console.log(payload, 'specpayload...');
      let result = yield getSpec(payload);
      // 从redux中拿到状态
      const specObj = yield select(
        (state: { spec: { RootObject: any } }) => state.spec.RootObject,
      );
      if (!specObj.length) {
        yield put({
          type: 'SpecData',
          payload: result,
          // payload:{ RootObject:result},
        });
      }
    },

    *getSpecDel({ payload }, { call, put, select }) {
      yield getSpecDel(payload);
    },

    *getAdd({ payload }, { call, put, select }) {
      const result = yield getAdd(payload);
      console.log(result);
    },

    *getEdit({ payload }, { call, put, select }) {
      yield getEdit(payload);
    },
  },

  // 同步action
  reducers: {
    SpecData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default SpecModel;
