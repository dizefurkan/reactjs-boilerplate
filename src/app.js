import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';
import Home from './components/Home';
import Section from './components/Section';
import Footer from './components/Footer';
import Login from './views/pages/Login';
import Register from './views/pages/Register';

class App extends Component {
  render() {
    return (
      <DocumentTitle title='React.js Boilerplate'>
        <BrowserRouter>
          <Switch>
            <PropsRoute
              exact
              path='/'
              component={Home}
              title='Home'
            />
            <PropsRoute
              path='/login'
              component={Login}
              title='Login'
            />
            <PropsRoute
              path='/register'
              component={Register}
              title='Register'
            />
          </Switch>
        </BrowserRouter>
      </DocumentTitle>
    );
  }
}

export default App;
