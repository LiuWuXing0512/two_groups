import { IMemberList } from '@/interfaces'
import { getMemberList } from '@/services'
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface MemberState {
    records: IMemberList[]
}
// 模块的接口
export interface MemberType {
    namespace: 'member';
    state: MemberState;
    effects: {
        getMemberList:Effect
    };
    reducers: {
        save: Reducer<MemberState>;
        // 启用 immer 之后
        // save: ImmerReducer<IndexModelState>;
    };
}

// 模块的定义
const MemberModel: MemberType = {
    namespace: 'member',

    state: {
        records: [],
    },

    // 异步action
    effects: {
        *getMemberList({current=1,size=10},{call,put}){
            let result=yield getMemberList({current,size})
            console.log(result,'result,.......');
            
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

export default MemberModel;