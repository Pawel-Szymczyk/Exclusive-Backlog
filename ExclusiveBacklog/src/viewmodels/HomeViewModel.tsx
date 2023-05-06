import {action, makeObservable, observable} from 'mobx';
import {Backlog} from '../models/Backlog';

export class HomeViewModel {
  greeting: string = 'Hello, world!';
  backlogs: Backlog[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      greeting: observable,
      backlogs: observable,
      isLoading: observable,
      error: observable,
      fetchItems: action,
    });
  }

  async fetchItems() {
    try {
      this.isLoading = true;
      const response = await fetch(
        'http://192.168.1.172:3000/exclusive-backlogs',
      );
      const data = await response.json();
      this.backlogs = data;
      this.isLoading = false;
    } catch (error) {
      //   this.error = error.message;
      console.error(error);
      this.isLoading = false;
    }
  }

  //   async backlogs: Backlog[] (){
  //     try {
  //       let response = await fetch(
  //         'http://192.168.1.172:3000/exclusive-backlogs',
  //       );
  //       let json = await response.json();
  //       return json;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   backlogs = () => {
  //     return fetch('http://192.168.1.172:3000/exclusive-backlogs')
  //       .then(response => response.json())
  //       .then(json => {
  //         return json;
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //     // try {
  //     //   const response = await fetch(
  //     //     'http://192.168.1.172:3000/exclusive-backlogs',
  //     //   );
  //     //   const json = await response.json();
  //     //   this.backlogs = json;
  //     // } catch (err) {
  //     //   console.error(err);
  //     // }
  //   };
}
