export interface ILoginForm {
  t: number;
  principal: string;
  credentials: string;
  sessionUUID: string;
  imageCode: string;
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
  records: Array<userItem | roleItem>
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