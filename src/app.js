import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Section from './components/Section';
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Section />
        <Footer />
      </div>
    )
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));
