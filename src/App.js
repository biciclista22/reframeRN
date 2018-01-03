import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './common/Header';
import { Button } from './common/Button';


class App extends Component {
  render() {
    return (
      <View>
        <Header headerText="REFRAME"/>
      </View>
    );
  };
}

export default App;
