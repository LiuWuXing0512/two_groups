export interface Iarea {
    current?: number;
    size?: number;
    t?: number;
    areaId?: number,
    areaName?: string,
    parentId?: number,
    level?: null
}
export interface IPropsArea {
    area: { areaList: Array<IaddressList> }
}
export interface Istate {
    areaList: Array<IaddressList>
}
export interface IaddressList {
    filter(arg0: (item: IaddressList) => boolean): Array<IaddressList>;
    map(arg0: (item: IaddressList) => object | void): Array<IaddressList>;
    areaId: number;
    areaName: string;
    areas: null;
    level: number;
    parentId: number;
    children?: Array<IaddressList>
}
