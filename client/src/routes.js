
import React from 'react';
import { HashRouter, BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom';
import LoginView from './components/SignIn/SignIn_View';
import TabsView from './components/Home/TabsView'


const Root = () => (

  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LoginView} />
      <Route exact path='/home' component={TabsView} />
     
    </Switch>
  </BrowserRouter >
);
export default Root;
