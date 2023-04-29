export interface Response<T> {
  status: number;
  body?: T;
}

export interface BacklogResponse {
  name: string;
  price: number;
  quantity: number;
  category: string;
  buyOn: string;
  createdOn: string;
  modifiedOn: string;
  _id: string;
  __v: number;
}

export const CreateBacklog = async (
  name: string,
  price: number,
  quantity: number,
  category: string,
  buyOn: string,
  createdOn: string,
  modifiedOn: string,
): Promise<Response<BacklogResponse>> => {
  try {
    const response = await fetch(
      'http://192.168.1.172:3000/exclusive-backlogs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          quantity,
          category,
          buyOn,
          createdOn,
          modifiedOn,
        }),
      },
    );

    const result: Response<BacklogResponse> = {
      status: response.status,
    };

    if (response.ok) {
      result.body = (await response.json()) as BacklogResponse;
    }

    return result;
  } catch (err) {
    // todo: fetch error handler here
    return {
      status: 0,
    };
  }
};
