/*
 * File: /Users/origami/Desktop/templates/web-nextJs-template/components/TEMPLATE.tsx
 * Project: /Users/origami/Desktop/templates/web-nextJs-template
 * Created Date: Tuesday July 16th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday July 16th 2019 8:06:35 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React from 'react';
import {} from 'mobx-react';
import { observable } from 'mobx';

@observable
class Template extends React.Component<IProps> {
  render() {
    return <button title={'tempalte'} />;
  }
}
interface IProps {}
export default Template;
