export  interface Iprod {
  size: number;
  current: number;
  title?:string,
  status?:Boolean
}

export interface Record {
  id: number;
  title: string;
  shopId: number;
  status: number;
  isDefault: number;
  prodCount: number;
  seq: number;
  style: number;
  createTime: string;
  updateTime: string;
  deleteTime?: any;
}

export interface Iaddprod{
  id?: number
  isDefault?: null 
  prodCount?: null
  seq?: string
  shopId?: null
  status:number
  style: number
  title: string
}

