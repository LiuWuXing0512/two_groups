export interface ISpec {
  current: number;
  size: number;
  propName?: string;
}

export interface RootObj {
  records: Records[];
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
  key?: string;
  title: string;
}

export interface Records {
  propId?: number;
  propName: string;
  rule: number;
  shopId?: any;
  prodPropValues: ProdPropValues[];
}

export interface ProdPropValues {
  valueId: number;
  propValue: string;
  propId?: any;
}

export interface IDel {
  num: number;
}