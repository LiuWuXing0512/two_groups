export interface IHotSearch {
  current: number;
  pages: number;
  records: IRecordsItem[];
  searchCount: boolean;
  size: number;
  total: number;
}

export interface IRecordsItem {
  content: string;
  hotSearchId: number;
  recDate: string;
  seq: number;
  shopId: number;
  status: number;
  title: string;
  check?: boolean;
}
