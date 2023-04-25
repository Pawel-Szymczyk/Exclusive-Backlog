export interface CustomResponse {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  buyOn: string;
  createdOn: string;
  modifiedOn: string;
  __v: number;
}

export const getAllBacklogs = async () => {
  try {
    return fetch('http://192.168.1.172:3000/exclusive-backlogs')
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });

    // const response = await fetch('http://localhost:3000/exclusive-backlogs', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // const results: CustomResponse;
    // if (response.ok) {
    //   results = (await response.json()) as CustomResponse;
    // }

    // return results;
  } catch (err) {}
};
