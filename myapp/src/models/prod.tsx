import { Record } from '@/interfaces'
import { getProd,addProd,DeleteProd,getProdEdit,EditProd } from '@/services';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { message} from 'antd';
  
// 模块内部state接口
export interface ProdModelState {
    current: number,
    size: number,
    records:Record[],
    total:number,
    edit:Object
}

// 模块的接口
export interface ProdModelType {
    namespace: 'prod';
    state: ProdModelState;
    effects: {
        getprod: Effect,
        addProd:Effect,
        delProd:Effect,
        getProdEdit:Effect,
        editProd:Effect
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
        edit:{}
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
        },
        *addProd({payload},{call,put,select}){
            let result = yield addProd(payload)
            console.log(result,'加加加加加加加加');
            if(result){
                message.success('添加成功');
            }
        },
        *delProd({payload},{call,put,select}){
            let result = yield DeleteProd (payload.id) 
            console.log(result);
            if(result){
                message.success('删除成功');
            }
            // 从redux中拿到状态
            const current=yield select(state=>state.prod.current)
            const size=yield select(state=>state.prod.size)
            let res= yield getProd({
                current,
                size
            });
            if (res.records) {
                yield put({
                    type: 'save',
                    payload: {
                        records:res.records ,
                        total:res.total
                    }
                })
            }
        },
        *getProdEdit({payload},{call,put,select}){
            // console.log(payload);
            let result = yield getProdEdit(payload)
            console.log('result...', result);
            if(result){
               yield put({
                    type:'save',
                    payload:{
                        edit:result
                    }
               })
            } 
        },
        *editProd({payload},{call,put,select}){
            // console.log(payload);
            let result=yield EditProd (payload)
            console.log(result);
            
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

export default ProdModel;