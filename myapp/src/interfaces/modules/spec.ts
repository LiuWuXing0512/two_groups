export interface ISpec {
  current:number;
  size:number;
  propName:string
}

export interface RootObject {
  records: Record[];
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
}

export interface Record {
  propId: number;
  propName: string;
  rule: number;
  shopId?: any;
  prodPropValues: ProdPropValue[];
}

export interface ProdPropValue {
  valueId: number;
  propValue: string;
  propId?: any;
}