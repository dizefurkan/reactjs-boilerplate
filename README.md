# React.js Boilerplate
[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

# Get Started
Constantly improving and updating. Because I use it on my own projects.
- [Installation](https://github.com/dizefurkan/reactjs-boilerplate#installation)
- [Techs](https://github.com/dizefurkan/reactjs-boilerplate#techs)
- [Project Structure](https://github.com/dizefurkan/reactjs-boilerplate#project-structure)
- [Code Examples](https://github.com/dizefurkan/reactjs-boilerplate#code-examples)
- [Whats inside](https://github.com/dizefurkan/reactjs-boilerplate#whats-inside)
- [Authors](https://github.com/dizefurkan/reactjs-boilerplate#authors)


## Installation
1. Clone the project `git clone https://github.com/dizefurkan/reactjs-boilerplate.git`.
2. Install dependencies `npm install`

---

## Techs
### Dependencies
- [axios](https://www.npmjs.com/package/axios)
- [classnames](https://www.npmjs.com/package/classnames)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- [prop-types](https://www.npmjs.com/package/prop-types)
- [react-bootstrap](https://www.npmjs.com/package/react-bootstrap)
- [react-document-title](https://github.com/hapijs/react-document-title)
- [react-router-with-props](https://www.npmjs.com/package/react-router-with-props)
### devDependencies
- [webpack](https://www.npmjs.com/package/webpack)
- [css-loader](https://www.npmjs.com/package/css-loader)
- [file-loader](https://www.npmjs.com/package/file-loader)
- [html-loader](https://www.npmjs.com/package/html-loader)
- [style-loader](https://www.npmjs.com/package/style-loader)
- [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)
- [babel-core](https://www.npmjs.com/package/babel-core)
- [babel-eslint](https://www.npmjs.com/package/babel-eslint)
- [babel-loader](https://www.npmjs.com/package/babel-loader)
- [babel-polyfill](https://www.npmjs.com/package/babel-polyfill)
- [babel-preset-react](https://www.npmjs.com/package/babel-preset-react)
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
---
## Project Structure
|Folder|Description|
|--|--|
|dist|The build folder|
|src|Source folder|
|src/assets|For plugins. Like; bootstrap, jquery, fontawesome...|
|src/components|For partitions. Like; Footer, Header...|
|src/public|There are hosts in this folder; index.html|
|src/services|Put files like helper, with fetch operations (MVC)|
|src/utils|Keep files here like; form validations.|
|src/views|This folder for pages like login page, register, 404, 500...|
---
## Code Examples
### App.js
You can see the DocumentTitle for page title on browser

Auth control for token
```html
// src/app.js
class App extends Component {
  ...
  render() {
    const { auth } = this.state;
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
```
```js
// Private Component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Home from 'components/Home';
import styles from './styles.css';

class Private extends Component {
  render() {
    if (!this.props.auth) {
      return <Redirect to='/login' />;
    }
    return (
      <Home title='Home' auth={this.props.auth} />
    );
  }
}

Private.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default Private;
```
---
## Whats inside
### Css Style
Local and Global styles with hashed classNames
```js
import gbStyles from 'public/main.css'; //Global Styles
import styles from './styles.css'; //Local Styles

const Test = () => {(
  <div className={gbStyles.clearfix}>
    <h1 className={styles.title}>React.js Boilerplate</h1>
  </div>
)};
```
output;
```js
<html>
  <body>
    <div class="main__clearfix___34Arz">
      <h1 class="styles__title___2m2w7">React.js Boilerplate</h1>
    </div>
  </body>
</html>
```
webpack.config.js;
```js
localIdentName: "[name]__[local]___[hash:base64:5]"
```
---
### Path Alias
Set Alias for Folder Path
```js
import gbStyles from 'public/main.css'; //Global Styles
```
webpack.config.js;
```js
resolve: {
  alias: {
    'public': path.resolve(__dirname, 'src/public/'),
  }
}
```
---
### Public Main HTML Page
You can see imported the plugins like
Bootstrap or Fontawesome
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>REACTJS BOILERPLATE</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/src/assets/plugins/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="src/assets/plugins/font-awesome-5/css/fontawesome-all.min.css">
</head>
<body>
  <div id="app"></div>
</body>
</html>
```
---
## Authors
[<img src="https://avatars1.githubusercontent.com/u/28892291?s=460&v=4" width="100px;"/><br /><sub>Said Furkan Dize</sub>](https://github.com/dizefurkan)<br />
