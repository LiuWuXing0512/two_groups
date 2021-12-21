import { Record,IProdListItem } from '@/interfaces'
import { getProd,addProd,getProdList } from '@/services';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

// 模块内部state接口
export interface ProdModelState {
    current: number,
    size: number,
    records:Record[],
    total:number,
    prodList:IProdListItem[],
    prodListtotal:number,
}

// 模块的接口
export interface ProdModelType {
    namespace: 'prod';
    state: ProdModelState;
    effects: {
        getprod: Effect;
        addProd:Effect;
        getProdList:Effect;
    };
    reducers: {
        save: Reducer<ProdModelState>;
        // 启用 immer 之后
        // save: ImmerReducer<IndexModelState>;
    };

}

// 模块的定义
const ProdModel: ProdModelType = {
    namespace: 'prod',

    state: {
        current: 1,
        size: 10,
        records:[],
        total:0,
        prodList:[],
        prodListtotal:0
    },

    // 异步action
    effects: {
        *getprod({ payload }, { call, put, select }) {
            // console.log(payload);

            let result = yield getProd(payload);
            // console.log(result)
            if (result.records) {
                yield put({
                    type: 'save',
                    payload: {
                        records:result.records ,
                        total:result.total
                    }
                })
            }
            // 从redux中拿到状态
            // const state=yield select(state=>state.prod.records)
            // console.log(state,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            

        },
        *addProd({payload},{call,put,select}){
            let result = yield addProd(payload)
            console.log(result,'加加加加加加加加');
        },
        *getProdList({payload},{call,put}){
            let result=yield getProdList(payload)
            if(result.records.length){
                yield put({
                    type: 'save',
                    payload: {
                        prodList:result.records,
                        prodListtotal:result.total,
                    }
                })
            }
        },
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

export default ProdModel;