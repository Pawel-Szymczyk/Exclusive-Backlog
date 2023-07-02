// https://dev.to/krzysztofzuraw/typescript-classes-interfaces-and-all-between-23jd

export interface IBacklogDTO {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  buyOn: string;
  createdOn: string;
  modifiedOn: string;
  base64qrcode: string;
  base64image: string;
}

export interface IBacklog {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  buyOn: string;
  base64qrcode: string;
  base64image: string;
  createdOn: string;
  modifiedOn: string;
}

export interface IBacklogResponseDTO {
  code: number;
  message: string;
}

export interface IQRCodeScanner {
  id: string;
  name: string;
}
