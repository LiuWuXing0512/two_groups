export  interface Iprod {
  size: number;
  current: number;
  title?:string,
  status?:Boolean
}

export interface Record {
  propId(propId: any): void;
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

export interface IProdData {
  t:number;
  size: number;
  current: number;
  prodName?: string;
  status?: string;
}

export interface IProdListItem {
  prodId: number;
  shopId: number;
  prodName: string;
  oriPrice: number;
  price: number;
  brief: string;
  pic: string;
  imgs: string;
  status: number;
  categoryId: number;
  soldNum?: any;
  totalStocks: number;
  deliveryMode: string;
  deliveryTemplateId: number;
  createTime: string;
  updateTime: string;
  content: string;
  putawayTime: string;
  version?: number;
  skuList?: any;
  shopName?: any;
  tagList?: any;
}