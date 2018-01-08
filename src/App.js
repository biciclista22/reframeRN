import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Input } from './components/common';
import EntryForm from './components/EntryForm';
import LoginForm from './components/LoginForm';

class App extends Component {
  render() {
    return (
      <View>
        <Header headerText="Reframe"/>
        <LoginForm />
        <EntryForm />
      </View>
    );
  };
}

export default App;
