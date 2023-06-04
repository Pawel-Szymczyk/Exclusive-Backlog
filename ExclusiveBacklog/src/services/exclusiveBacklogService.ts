import {IBacklog, IBacklogDTO} from '../features/backlog/Backlog';

export default class exclusiveBacklogService {
  serviceURI: string = 'http://192.168.1.172:3000';

  // getAllBacklogs() {
  //   return fetch(this.serviceURI + '/exclusive-backlogs').then(res => {
  //     if (!res.ok) {
  //       throw new Error('error');
  //     }
  //     return res.json();
  //   });
  // }

  async getAllBacklogsAsync(): Promise<IBacklog[]> {
    try {
      const response = await fetch(this.serviceURI + '/exclusive-backlogs');
      const data: IBacklogDTO[] = await response.json();

      // map data
      const mappedBacklogs: IBacklog[] = data.map(item => ({
        id: item._id,
        name: item.name,
        buyOn: item.buyOn,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
      }));

      // // map data
      // const mappedBacklogs: Backlog[] = data.map(
      //   item =>
      //     new Backlog(
      //       item._id,
      //       item.name,
      //       item.category,
      //       item.buyOn,
      //       item.createdOn,
      //       item.modifiedOn,
      //       item.price,
      //       item.quantity,
      //     ),
      // );

      return mappedBacklogs;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async getBacklogByIdAsync(id: string): Promise<IBacklog> {
    try {
      const response = await fetch(this.serviceURI + '/exclusive-backlogs/' + id);
      const data: IBacklogDTO = await response.json();

      // map data
      const mappedBacklog: IBacklog = {
        id: data._id,
        name: data.name,
        buyOn: data.buyOn,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
      };

      return mappedBacklog;
    } catch (error) {
      console.error('Error fetch data by id:', error);
      throw error;
    }
  }

  // TODO: make it async
  createBacklog(data: IBacklog) {
    return fetch(this.serviceURI + '/exclusive-backlogs', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    }).then(function (res) {
      return res.json();
    });
    // .then(function (data) {
    //   alert(JSON.stringify(data));
    // });
  }
}
