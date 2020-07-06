import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import TypoGraphy from '@material-ui/core/Typography'
import logo from './logo.svg';
import './App.css';

import HealthCheckComponent from './components/HealthCheckComponent';
import VINCheckComponent from './components/VINCheckComponent';

import Form from './form/Form';

const App = () => {
  return (
    <div className="app-wrapper">
      <AppBar color="primary" position="static">
        <TypoGraphy variant="title" color="inherit" align="center">
          NHTSA VIN Demo
        </TypoGraphy>
      </AppBar>
      <HealthCheckComponent />
      {/* <VINCheckComponent /> */}
      <div className="vin-form">
        <Form />
      </div>
    </div>
  );
};

export default App;
