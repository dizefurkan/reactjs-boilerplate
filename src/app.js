import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PropsRoute } from 'react-router-with-props';
import DocumentTitle from 'react-document-title';
import AuthService from 'services/authService';
import Section from 'components/Section';
import Login from 'src/views/pages/Login';
import PrivateRoute from 'src/views/pages/PrivateRoute';
import NotFound404 from 'src/views/pages/NotFound404';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
    };
    this.authService = new AuthService();
  }

  componentWillMount() {
    const loggedIn = this.authService.loggedIn();
    this.setState({
      auth: loggedIn,
    });
  }

  render() {
    const { auth } = this.state;
    return (
      <DocumentTitle title='React.js Boilerplate'>
        <BrowserRouter>
          <Switch>
            <PrivateRoute
              exact
              path='/'
              auth={auth}
              component={Section}
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
