import { IMemberList } from '@/interfaces'
import { getMemberList,getModal,changeStatus } from '@/services'
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface MemberState {
    records: IMemberList[],
    pages: number,
    total:number,
    modalObj:{}
}
// 模块的接口
export interface MemberType {
    namespace: 'member';
    state: MemberState;
    effects: {
        getMemberList:Effect
        getModal:Effect
        changeStatus:Effect
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
        total:0,
        modalObj:{}
    },

    // 异步action
    effects: {
        *getMemberList({payload},{call,put}){
            let result=yield getMemberList(payload)
            if(result.records.length){
                yield put({
                    type: 'save',
                    payload: {
                        records:result.records,
                        total:result.total,
                        pages:result.pages
                    }
                })
            }
        },
        *getModal({userId},{call,put}){
            let result=yield getModal(userId)
            if(result.userRegtime){
                yield put({
                    type: 'save',
                    payload: {
                        modalObj:result
                    }
                })
            }
        },
        *changeStatus({payload},{call,put}){
            console.log(payload,'userid。。。。。。。。。。');
            let result=yield changeStatus(payload)
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