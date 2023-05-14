export default class exclusiveBacklogCategoryService {
  serviceURI: string = 'http://192.168.1.172:3000';

  getAllCategories() {
    return fetch(this.serviceURI + '/categories').then(res => {
      if (!res.ok) {
        throw new Error('error');
      }
      return res.json();
    });
  }
}
