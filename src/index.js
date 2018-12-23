import React, { Component } from 'react';

import Routes from './routes';

import './config/ReactotronConfig';
import './config/DevToolsConfig';

export default class App extends Component {
  state = {};

  render() {
    return <Routes />;
  }
}
