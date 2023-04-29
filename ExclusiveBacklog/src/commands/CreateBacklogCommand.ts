import {Backlog} from '../models/BacklogModel';
import {Command} from './Command';
import {observable, action} from 'mobx';

export interface CreateBacklogCommandParams {
  name: string;
  price: number;
  quantity: number;
  category: string;
  buyOn: string;
  createdOn: string;
  modifiedOn: string;
}

export class CreateBacklogCommand
  implements Command<CreateBacklogCommandParams>
{
  @observable
  public pending: boolean = false;

  @observable
  public error: string | null = null;

  @action
  public async execute(params?: CreateBacklogCommandParams): Promise<void> {
    if (params) {
      this.pending = true;

      const result = await Backlog.createBacklog(
        params.name,
        params.price,
        params.quantity,
        params.category,
        params.buyOn,
        params.createdOn,
        params.modifiedOn,
      );

      if (result.action === 'success') {
        // -> go to the next screen
      } else if (result.error) {
        this.error = result.error;
      }

      this.pending = false;
    }
  }

  @action
  public canExecute(params?: CreateBacklogCommandParams): boolean {
    if (params) {
      // todo: finish
      if (!params.name) {
        return false;
      }
    }
    return !this.pending;
  }
}
