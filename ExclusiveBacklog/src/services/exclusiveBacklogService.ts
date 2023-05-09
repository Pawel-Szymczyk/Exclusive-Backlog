export default class exclusiveBacklogService {
  serviceURI: string = 'http://192.168.1.172:3000';

  getAllBacklogs() {
    return fetch(this.serviceURI + '/exclusive-backlogs').then(res => {
      if (!res.ok) {
        throw new Error('error');
      }
      return res.json();
    });
  }
}
