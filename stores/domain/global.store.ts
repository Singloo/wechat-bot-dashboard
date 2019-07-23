/*
 * File: /Users/origami/Desktop/templates/web-nextJs-template/stores/domain/global.store.ts
 * Project: /Users/origami/Desktop/templates/web-nextJs-template
 * Created Date: Monday July 15th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday July 15th 2019 8:53:15 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { action, configure, observable } from 'mobx';
import {} from '../../models';
import {} from '../../services';
import {} from '../../utils';
// import { get } from 'lodash';
configure({
  enforceActions: 'always',
});
interface IState {
  isLoading?: boolean;
}
class GlobalStore {
  @observable isLoading: boolean = false;
  constructor(initialState?: IState) {
    this.setState(initialState);
  }
  @action setState = (nextState?: IState) => {
    Object.assign(this, nextState);
  };
  @action setLoading = (bool: boolean) => (this.isLoading = bool);
}
export { GlobalStore };
