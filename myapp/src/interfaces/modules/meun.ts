export interface IPropsMenu {
    menu: { menuList: Array<MenuList> }
}

export interface MenuList {
    icon: null | string;
    list: null;
    menuId: number;
    name: string;
    orderNum: number;
    parentId: number;
    parentName: null | string;
    perms: string;
    type: number;
    url: string;
    children?: Array<MenuList>
}