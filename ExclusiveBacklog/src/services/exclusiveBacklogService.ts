import {IBacklog, IBacklogDTO, IBacklogResponseDTO} from '../features/backlog/Backlog';

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

  // ---------------------------------------------------------
  // XML
  //

  async exportBacklogsToXmlAsync(): Promise<string> {
    try {
      const response = await fetch(this.serviceURI + '/files/export-to-xml');
      const data: IBacklogResponseDTO = await response.json();

      return data.message;
    } catch (error) {
      console.error('Error during exporting backlogs to xml: ', error);
      throw error;
    }
  }

  // ---------------------------------------------------------

  // ---------------------------------------------------------
  // QR Codes
  //
  async exportAllQRCodesAsync(): Promise<string> {
    try {
      const response = await fetch(this.serviceURI + '/qr-codes/export');
      const data: IBacklogResponseDTO = await response.json();

      return data.message;
    } catch (error) {
      console.error('Error during exporting qr codes: ', error);
      throw error;
    }
  }

  async exportQRCodeByBacklogIdAsync(id: string): Promise<string> {
    try {
      const response = await fetch(this.serviceURI + '/qr-codes/export/' + id);
      const data: IBacklogResponseDTO = await response.json();

      return data.message;
    } catch (error) {
      console.error('Error during exporting qr codes: ', error);
      throw error;
    }
  }

  async exportQRCodesByCategoryIdAsync(id: string): Promise<string> {
    try {
      const response = await fetch(this.serviceURI + '/qr-codes/export/group/' + id);
      const data: IBacklogResponseDTO = await response.json();

      return data.message;
    } catch (error) {
      console.error('Error during exporting qr codes: ', error);
      throw error;
    }
  }

  // ---------------------------------------------------------

  async getAllBacklogsAsync(): Promise<IBacklog[]> {
    try {
      const response = await fetch(this.serviceURI + '/exclusive-backlogs');
      const data: IBacklogDTO[] = await response.json();

      // map data
      const mappedBacklogs: IBacklog[] = data.map(item => ({
        id: item.id,
        name: item.name,
        buyOn: item.buyOn,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        base64qrcode: item.base64qrcode,
        base64image: item.base64image,
        createdOn: item.createdOn,
        modifiedOn: item.modifiedOn,
      }));

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
        id: data.id,
        name: data.name,
        buyOn: data.buyOn,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
        base64qrcode: data.base64qrcode,
        base64image: data.base64image,
        createdOn: data.createdOn,
        modifiedOn: data.modifiedOn,
      };

      return mappedBacklog;
    } catch (error) {
      console.error('Error fetch data by id:', error);
      throw error;
    }
  }

  async deleteBacklogAsync(id: string): Promise<string> {
    try {
      const response = await fetch(this.serviceURI + '/exclusive-backlogs/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: IBacklogResponseDTO = await response.json();

      return data.message;
    } catch (error) {
      console.error('Error fetch data by id:', error);
      throw error;
    }
  }

  async updateBacklogAsync(id: string, backlog: IBacklog): Promise<IBacklog> {
    try {
      const mappedBacklogDTO: IBacklogDTO = {
        id: backlog.id,
        name: backlog.name,
        buyOn: backlog.buyOn,
        category: backlog.category,
        price: backlog.price,
        quantity: backlog.quantity,
        base64qrcode: '',
        base64image: backlog.base64image,
        createdOn: '',
        modifiedOn: '',
      };

      const response = await fetch(this.serviceURI + '/exclusive-backlogs/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mappedBacklogDTO),
      });
      const data: IBacklogDTO = await response.json();

      const mappedBacklog: IBacklog = {
        id: data.id,
        name: data.name,
        buyOn: data.buyOn,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
        base64qrcode: data.base64qrcode,
        base64image: data.base64image,
        createdOn: data.createdOn,
        modifiedOn: data.modifiedOn,
      };

      return mappedBacklog;
    } catch (error) {
      console.error('Error fetch data by id:', error);
      throw error;
    }
  }

  // TODO: make it async
  createBacklog(backlog: IBacklog) {
    return fetch(this.serviceURI + '/exclusive-backlogs', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(backlog),
    }).then(function (res) {
      return res.json();
    });
    // .then(function (data) {
    //   alert(JSON.stringify(data));
    // });
  }
}
