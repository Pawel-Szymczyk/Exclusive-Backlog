import {CreateBacklog} from '../api/CreateBacklog';

declare type CreateAction = 'success' | 'failure';

export interface CreateBacklogResult {
  action: CreateAction;
  error?: string;
}

export class BacklogModel {
  // observalbles here...

  public async createBacklog(
    name: string,
    price: number,
    quantity: number,
    category: string,
    buyOn: string,
    // createdOn: string,
    // modifiedOn: string,
  ): Promise<CreateBacklogResult> {
    const response = await CreateBacklog(
      name,
      price,
      quantity,
      category,
      buyOn,
      // createdOn,
      // modifiedOn,
    );

    if (response.status === 200) {
      //   const body = response.body as BacklogResponse;
      return {
        action: 'success',
      };
    }

    return {
      action: 'failure',
      error: 'Create backlog failed',
    };
  }
}

export const Backlog = new BacklogModel();
