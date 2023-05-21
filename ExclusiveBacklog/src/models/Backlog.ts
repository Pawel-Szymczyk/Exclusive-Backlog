// https://dev.to/krzysztofzuraw/typescript-classes-interfaces-and-all-between-23jd

export interface IBacklogDTO {
  _id: string;
  __v: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  buyOn: string;
  createdOn: string;
  modifiedOn: string;
}

export interface IBacklog {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  buyOn: string;
  // createdOn: string;
  // modifiedOn: string;
}
