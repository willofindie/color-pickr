import React from 'react';
import ReactDOM from 'react-dom';
import Pickr from './pickr.styled';

export default class App extends React.Component {
  render() {
    return (
      <center>
        <Pickr withSwatch />
      </center>
    );
  }
}

const rootDOM = document.getElementById('root');
rootDOM && ReactDOM.render(<App />, rootDOM);
