import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Layout from './layouts/Main';

import Home from './views/Home';
import Favorite from './views/Favorite';
import Person from './views/Person';


export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Layout><Home /></Layout>
          </Route>
          <Route path="/favorite">
            <Layout><Favorite /></Layout>
          </Route>
          <Route path="/person/:id">
            <Layout><Person /></Layout>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
