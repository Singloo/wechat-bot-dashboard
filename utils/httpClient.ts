/*
 * File: /Users/origami/Desktop/templates/web-nextJs-template/utils/httpClient.ts
 * Project: /Users/origami/Desktop/templates/web-nextJs-template
 * Created Date: Monday July 15th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday July 15th 2019 1:11:29 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import Axios from 'axios';
import { API } from './constants';
const httpClient = Axios.create({
  baseURL: API,
  timeout: 10000,
});
export { httpClient };
