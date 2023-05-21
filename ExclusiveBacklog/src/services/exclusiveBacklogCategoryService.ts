import {ICategory, ICategoryTDO} from '../models/Category';

export default class exclusiveBacklogCategoryService {
  serviceURI: string = 'http://192.168.1.172:3000';

  async getAllCategories(): Promise<ICategory[]> {
    try {
      const response = await fetch(this.serviceURI + '/categories');
      const data: ICategoryTDO[] = await response.json();

      // map data
      const mappedCategory: ICategory[] = data.map(item => ({
        id: item._id,
        name: item.name,
        value: item.value,
      }));

      return mappedCategory;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  // getAllCategories() {
  //   return fetch(this.serviceURI + '/categories').then(res => {
  //     if (!res.ok) {
  //       throw new Error('error');
  //     }
  //     return res.json();
  //   });
  // }
}
