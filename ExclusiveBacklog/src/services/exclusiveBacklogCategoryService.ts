import {ICategory, ICategoryTDO} from '../features/category/Category';

export default class exclusiveBacklogCategoryService {
  serviceURI: string = 'http://192.168.1.172:3000';

  async getAllCategories(): Promise<ICategory[]> {
    try {
      const response = await fetch(this.serviceURI + '/categories');
      const data: ICategoryTDO[] = await response.json();

      // map data
      const mappedCategory: ICategory[] = data.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
      }));

      return mappedCategory;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  createCategory(data: ICategory) {
    return fetch(this.serviceURI + '/categories', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    }).then(function (res) {
      return res.json();
    });
    // .then(function (data) {
    //   alert(JSON.stringify(data)); // <- alert
    // });
  }
}
