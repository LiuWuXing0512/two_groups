export interface IMemberList {
    userId: string;
    nickName: string;
    realName?: any;
    userMail?: any;
    loginPassword?: any;
    payPassword?: any;
    userMobile?: any;
    modifyTime: string;
    userRegtime: string;
    userRegip?: any;
    userLasttime?: any;
    userLastip?: any;
    userMemo?: any;
    sex: string;
    birthDate?: any;
    pic: string;
    status: number;
    score?: any;
}

export interface IMemberData {
    current:number,
    size:number,
    nickName?:string,
    status?:string
}

export interface IChangeStatus {
    nickName:string,
    status:number,
    t:number,
    userId:string
}