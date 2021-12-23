export interface ICon {
  current: number;
  size: number;
  propName?: string;
  paramKey?:string;
}

export interface IConfig {
  records: IConfigitem[];
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
}

export interface IConfigitem {
  id?: number;
  paramKey: string;
  paramValue: string;
  remark: string;
}

export interface IDelt{
  num:number[];
}