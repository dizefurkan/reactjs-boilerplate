import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Header from './components/Header';
import Section from './components/Section';
import Footer from './components/Footer';
import Login from './views/pages/Login';
import Register from './views/pages/Register';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Header} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
