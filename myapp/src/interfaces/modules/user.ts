export interface ILoginForm {
  t: number;
  principal?: string;
  credentials?: string;
  sessionUUID?: string;
  imageCode?: string;
  current?: number;
  size?:number;
  email?: string;
  mobile?: string;
  password?: string | number;
  roleIdList?: Array<number|string>;
  status?: number | string;
  username?: string;
}
export interface IPropsUser {
  roleList: IUserList;
  userInfo: IUserInfo;
  userList: IUserList;
}
export interface IUserInfo {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  shopId: number;
  userId: number;
  authorities: IAuthorityItem[];
}
export interface IUserList {
  current: number
  pages: number
  records: Array<userItem | roleItem | any>
  searchCount: boolean
  size: number
  total: number
}
interface roleItem {
  createTime: string
  menuIdList: string
  remark: string
  roleId: string
  roleName: string
}
interface userItem {
  createTime: string
  email: string
  mobile: string
  roleIdList: null
  shopId: number
  status: number
  userId: number
  username: string
}
export interface IAuthorityItem {
  authority: string;
}