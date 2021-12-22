import { IUserInfo, IUserList  } from '@/interfaces';
import { login, userList, roleList } from '@/services';
import { setToken } from '@/utils';
import { Effect, Reducer } from 'umi';
 
// 模块内部state接口
export interface UserModelState {
  userInfo: IUserInfo;
  userList: IUserList;
  roleList: IUserList;
}

// 模块的接口
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    userList: Effect;
    roleList: Effect;
  };
  reducers: {
    save: Reducer;
    getUserList: Reducer;
    getRoleList: Reducer;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}

// 模块的定义
const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    userInfo: {} as IUserInfo,
    userList: {} as IUserList,
    roleList: {} as IUserList,
  },

  // 异步action
  effects: {
    *login({ payload }, { put }) {
      let result = yield login(payload);
      // 设置cookie
      if (result.access_token) {
        setToken(`${result.token_type + result.access_token}`, result.expires_in);
      }
      put({
        type: 'save',
        payload: result
      })
    },
    *userList({ payload }, { put }) {
      let result = yield userList(payload);
      yield put({
        type: 'getUserList',
        payload: result
      })
    },
    *roleList({ payload }, { put }) {
      let result = yield roleList(payload);
      yield put({
        type: 'getRoleList',
        payload: result
      })
    }
  },

  // 同步action
  reducers: {
    save(state, action) {
      return {
        ...state,
        userInfo: action.payload
      };
    },
    getUserList(state, action) {
      return {
        ...state,
        userList: action.payload
      };
    },
    getRoleList(state, action) {
      return {
        ...state,
        roleList: action.payload
      };
    },
  }
};

export default UserModel;