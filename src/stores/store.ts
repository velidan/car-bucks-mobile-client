import {action, observable} from 'mobx';

class Store {
  @observable property = 'TEST MOBX PROP';

  @action setProperty = (newProperty: string) => {
    this.property = newProperty;
  };
}

export default new Store();
