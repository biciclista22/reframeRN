import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Header, Input } from './components/common';
import EntryForm from './components/EntryForm';
import LoginForm from './components/LoginForm';

class App extends Component {
  render() {
    return (
      <ScrollView>
        <Header headerText="Reframe"/>
        <LoginForm />
        <EntryForm />
      </ScrollView>
    );
  };
}

export default App;
