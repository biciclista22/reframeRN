import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Header, Input } from './components/common';
import EntryForm from './components/EntryForm';
import LoginForm from './components/LoginForm';
import USER_ID from './global.js';
import Router from './Router';
import EntryLog from './components/EntryLog';

class App extends Component {
  render() {
    return (
        <Router />
    );
  };
}

export default App;
