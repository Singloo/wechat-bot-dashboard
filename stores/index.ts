/*
 * File: /Users/origami/Desktop/templates/web-nextJs-template/stores/index.js
 * Project: /Users/origami/Desktop/templates/web-nextJs-template
 * Created Date: Monday July 15th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday July 16th 2019 8:14:20 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import rootService from '../services';
import { GlobalStore } from './domain/global.store';
import { HomeStore } from './view/home.store';
import { useStaticRendering } from 'mobx-react';
import { get } from 'lodash';
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);
class RootStore {
  global: GlobalStore;
  home: HomeStore;
  constructor(initialState: RootStore | {} = {}) {
    this.global = new GlobalStore(get(initialState, 'global', {}));
    this.home = new HomeStore({
      service: rootService.home,
    });
  }
}
let store: RootStore;
const initializeStore = (initialMobxState: RootStore | {} = {}) => {
  if (isServer) return new RootStore(initialMobxState);
  if (!store) {
    store = new RootStore(initialMobxState);
  }
  return store;
};
export default initializeStore;

export { GlobalStore, RootStore, HomeStore };
