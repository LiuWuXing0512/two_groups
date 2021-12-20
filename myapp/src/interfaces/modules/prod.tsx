// export  interface Iprod {
//   records: Record[];
//   total: number;
//   size: number;
//   current: number;
//   searchCount: boolean;
//   pages: number;
// }

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