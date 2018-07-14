import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PropsRoute } from 'react-router-with-props';
import DocumentTitle from 'react-document-title';
import AuthService from 'services/authService';
import Home from 'components/Home';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'src/views/pages/Login';
import Register from 'src/views/pages/Register';
import ResetPassword from 'src/views/pages/ResetPassword';
import NotFound404 from 'src/views/pages/NotFound404';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      modal: false,
    };
    this.authService = new AuthService();
  }

  componentWillMount() {
    const loggedIn = this.authService.loggedIn();
    this.setState({
      auth: loggedIn,
    });
  }

  setModal(event) {
    event.preventDefault();
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <DocumentTitle title='React.js Boilerplate'>
        <BrowserRouter>
          <Switch>
            <PrivateRoute
              exact
              path='/'
              state={this.state}
              modal={e => this.setModal(e)}
              component={Home}
              title='Home Page'
            />
            <PropsRoute
              path='/login'
              state={this.state}
              modal={e => this.setModal(e)}
              component={Login}
              title='Login'
            />
            <PropsRoute
              path='/register'
              state={this.state}
              modal={e => this.setModal(e)}
              component={Register}
              title='Register'
            />
            <PropsRoute
              path='/reset-password'
              modal={e => this.setModal(e)}
              component={ResetPassword}
              title='ResetPassword'
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
