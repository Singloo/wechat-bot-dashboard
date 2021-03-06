/*
 * File: /Users/origami/Desktop/templates/web-nextJs-template/pages/_app.tsx
 * Project: /Users/origami/Desktop/templates/web-nextJs-template
 * Created Date: Monday July 15th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Wednesday July 17th 2019 9:04:36 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'mobx-react';
import initializeStore, { RootStore } from '../stores';
import 'antd/dist/antd.css';
class CustomApp extends App {
  mobxStore?: RootStore;
  static async getInitialProps(appContext: any) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const mobxStore = initializeStore();
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = mobxStore;

    let appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  constructor(props: any) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider {...this.mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default CustomApp;
