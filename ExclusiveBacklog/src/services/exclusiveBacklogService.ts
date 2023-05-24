import {IBacklog, IBacklogDTO} from '../models/Backlog';

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

  async getAllBacklogs(): Promise<IBacklog[]> {
    try {
      const response = await fetch(this.serviceURI + '/exclusive-backlogs');
      const data: IBacklogDTO[] = await response.json();

      // map data
      const mappedBacklog: IBacklog[] = data.map(item => ({
        id: item._id,
        name: item.name,
        buyOn: item.buyOn,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
      }));

      return mappedBacklog;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

    // return fetch(this.serviceURI + '/exclusive-backlogs').then(res => {
    //   if (!res.ok) {
    //     throw new Error('error');
    //   }
    //   return res.json();
    // });
  }

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
