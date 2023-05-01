import {makeObservable, observable, action} from 'mobx';

export default class Test {
  text = '';

  constructor(text: string) {
    makeObservable(this, {
      text: observable,
      updateText: action,
    });
    this.text = text;
  }

  updateText = (text: string) => {
    this.text = text;
  };
}
