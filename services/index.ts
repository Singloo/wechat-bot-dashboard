/*
 * File: /Users/origami/Desktop/templates/web-nextJs-template/services/index.ts
 * Project: /Users/origami/Desktop/templates/web-nextJs-template
 * Created Date: Monday July 15th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday July 15th 2019 1:19:02 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { HomeService } from './view/home.service';
class RootService {
  home: HomeService;
  constructor() {
    this.home = new HomeService();
  }
}

export default new RootService();
export { HomeService };
