import {IAuthorityItem} from './user'

export interface INavMenu {
  menuList: IMenuList[];
  authorities: IAuthorityItem[];
}

export interface IMenuList {
  menuId: number;
  parentId: number;
  parentName?: any;
  name: string;
  url: string;
  perms: string;
  type: number;
  icon: string;
  orderNum: number;
  list: IMenuItem[];
}

interface IMenuItem {
  menuId: number;
  parentId: number;
  parentName?: any;
  name: string;
  url: string;
  perms: string;
  type: number;
  icon?: null | string | string;
  orderNum: number;
  list?: any;
}

export interface ISysLogItem {
  id: number;
  username: string;
  operation: string;
  method: string;
  params: string;
  time: number;
  ip: string;
  createDate: string;
}

export interface ISysLogData {
  t:number,
  current:number,
  size:number,
}