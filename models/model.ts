/*
 * File: /Users/origami/Desktop/templates/web-nextJs-template/models/model.ts
 * Project: /Users/origami/Desktop/templates/web-nextJs-template
 * Created Date: Monday July 15th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday July 15th 2019 1:17:38 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */

export interface IStrategy {
  _id: string | null;
  from: 'friend' | 'group' | 'at' | string;
  condition: string;
  reply: string;
  type: 'keyword' | 'reg';
  state: 'editing' | 'done';
  uniqId?: number;
}
