/*
 * File: /Users/origami/Desktop/templates/web-nextJs-template/components/test.tsx
 * Project: /Users/origami/Desktop/templates/web-nextJs-template
 * Created Date: Tuesday July 16th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday July 16th 2019 8:16:46 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import {} from 'mobx';
import { GlobalStore } from '../stores';
@inject('global')
@observer
class Template extends React.Component<IProps> {
  render() {
    return (
      <div className={'rowCenter'}>
        
      </div>
    );
  }
}

interface IProps {
  global?: GlobalStore;
}

export default Template;
