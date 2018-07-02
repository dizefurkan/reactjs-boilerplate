import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Redirect,
} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import {
  PropsRoute,
  PublicRoute,
  PrivateRoute,
} from 'react-router-with-props';
import Login from 'src/views/pages/Login';
import Private from 'src/views/pages/Private';
import AuthService from 'services/authService';
import NotFound404 from 'src/views/pages/NotFound404';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      isRedirect: false,
    };
    this.authService = new AuthService();
  }

  componentWillMount() {
    const loggedIn = this.authService.loggedIn();
    if (loggedIn) {
      this.setState({
        isRedirect: true,
      });
    }
    this.setState({
      auth: loggedIn,
    });
  }

  render() {
    const { auth, isRedirect } = this.state;
    return (
      <DocumentTitle title='React.js Boilerplate'>
        <BrowserRouter>
          <Switch>
            <PropsRoute
              exact
              path='/'
              auth={auth}
              component={Private}
            />
            <PropsRoute
              path='/login'
              auth={auth}
              component={Login}
              title='Login'
            />
            <PropsRoute
              path=''
              component={NotFound404}
              title='404 | Not Found'
            />
          </Switch>
        </BrowserRouter>
      </DocumentTitle>
    );
  }
}

export default App;
