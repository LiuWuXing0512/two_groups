import { IConfigitem, IConfig } from '@/interfaces';
import { getConfig, getConfigDel, getConfigAdd, getConfigId } from '@/services';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

// 模块内部state接口
export interface ConfigState {
  RootObject: IConfig;
  editObj: IConfigitem;
}

// 模块的接口
export interface ConfigModelType {
  namespace: 'config';
  state: ConfigState;
  effects: {
    getConfig: Effect;
    getConfigDel: Effect;
    getConfigAdd: Effect;
    getConfigId: Effect;
  };
  reducers: {
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };

  // subscriptions: { setup: Subscription };
}

// 模块的定义
const ConfigModel: ConfigModelType = {
  namespace: 'config',

  state: {
    RootObject: {} as IConfig,
    editObj: {} as IConfigitem,
  },

  // 异步action
  effects: {
    *getConfig({ payload }, { call, put, select }) {
      const result = yield getConfig(payload);
      console.log(result);
      yield put({
        type: 'ConfigData',
        // payload: result,
        payload: { RootObject: result },
      });
    },

    *getConfigDel({ payload }, { call, put, select }) {
      const result = yield getConfigDel(payload);
      console.log(result);
    },

    *getConfigAdd({ payload }, { call, put, select }) {
      const result = yield getConfigAdd(payload);
      console.log(result);
    },
    *getConfigId({ payload }, { call, put, select }) {
      const result = yield getConfigId(payload);
      console.log(result);
      yield put({
        type: 'ConfigEdit',
        // payload: result,
        payload: { editObj: result },
      });
    },
  },

  // 同步action
  reducers: {
    ConfigData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    ConfigEdit(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default ConfigModel;
