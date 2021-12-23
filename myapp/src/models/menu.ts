import { MenuList } from '@/interfaces';
import { meunTable } from '@/services';
import { Effect, Reducer } from 'umi';
export interface MenuModelState {
    menuList:Array<MenuList>
} 
const menuListFilter = (list: Array<MenuList>, parentId: number) => {
    let arr:Array<MenuList> = []
    const Filter = (arr: Array<MenuList>, menuId: number) => {
        return arr.filter(item => {
            if (item.parentId === menuId) {
                item.children = Filter(list, item.menuId);
            }
            return item.parentId === menuId
        })
    }
    return list.filter(item => {
        if (item.parentId === parentId) {
            item.children = Filter(list, item.menuId);
            arr.push(item)
            return arr
        }
    })
}


// 模块内部state接口
export interface MenuModelType {
    namespace: 'menu';
    state: MenuModelState;
    effects: {
        meunTable: Effect;
    };
    reducers: {
        getMenuList: Reducer;
        // 启用 immer 之后
        // save: ImmerReducer<IndexModelState>;
    };
}


// 模块的定义
const UserModel: MenuModelType = {
    namespace: 'menu',

    state: {
        menuList: []
    },

    // 异步action
    effects: {
        *meunTable({ payload }, { put }) {
            let result = yield meunTable(payload);
            yield put({
                type: 'getMenuList',
                payload: menuListFilter(result, 0)
            })
        },
    },
    // 同步action
    reducers: {
        getMenuList(state, action) {
            return {
                ...state,
                menuList: action.payload
            };
        },
    }
};

export default UserModel;