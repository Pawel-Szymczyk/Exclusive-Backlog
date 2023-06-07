import {IBacklog} from './Backlog';
import {Status} from '../../types/Status';

export type BacklogStateType = {
  status: Status;
  error: String | null;
  message: String;
  backlog: IBacklog | null;
  backlogs: Array<IBacklog>;
};

export type StoreType = {
  backlog: BacklogStateType;
};

// export default class Backlog {
//   private id: string;
//   private name: string;
//   private category: string;
//   private buyOn: string;
//   private createdOn: string;
//   private modifiedOn: string;
//   private price: number;
//   private quantity: number;

//   public get Id(): string {
//     return this.id;
//   }

//   public get Name(): string {
//     return this.name;
//   }

//   public get Category(): string {
//     return this.category;
//   }

//   public get BuyOn(): string {
//     return this.buyOn;
//   }

//   public get CreatedOn(): string {
//     return this.createdOn;
//   }

//   public get ModifiedOn(): string {
//     return this.modifiedOn;
//   }

//   public get Price(): number {
//     return this.price;
//   }

//   public get Quantity(): number {
//     return this.quantity;
//   }

//   constructor(
//     id: string,
//     name: string,
//     category: string,
//     buyOn: string,
//     createdOn: string,
//     modifiedOn: string,
//     price: number,
//     quantity: number,
//   ) {
//     this.id = id;
//     this.name = name;
//     this.category = category;
//     this.buyOn = buyOn;
//     this.createdOn = createdOn;
//     this.modifiedOn = modifiedOn;
//     this.price = price;
//     this.quantity = quantity;
//   }
// }
