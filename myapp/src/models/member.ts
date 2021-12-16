import { IMemberList } from '@/interfaces'
import { getMemberList } from '@/services'
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface MemberState {
    records: IMemberList[],
    pages: number,
    total:number
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
        pages:0,
        total:0
    },

    // 异步action
    effects: {
        *getMemberList({payload},{call,put}){
            console.log(payload,'参数。。。。。。。。。。');
            
            let result=yield getMemberList(payload)
            console.log(result,'result,.......');
            if(result.records.length){
                yield put({
                    type: 'save',
                    payload: result
                })
            }
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