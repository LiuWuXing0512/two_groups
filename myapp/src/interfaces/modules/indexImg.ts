export interface IIndexImg  extends IIndexImgPage{
  records: IndexImgRecordItem[];
  total: number;
  searchCount: boolean;
  pages: number;
}

export interface IIndexImgPage {
    size: number;
    current: number;
    status?:number|string;
}

export interface IndexImgRecordItem {
  imgId: number;
  shopId: number;
  imgUrl: string;
  des: string;
  title:null | string;
  link: null | string | number |undefined | boolean ;
  status: number;
  seq: number;
  uploadTime: string;
  type: number;
  relation: number;
  pic: null | string | number |undefined | boolean ;
  prodName: null | string | number |undefined | boolean ;
}