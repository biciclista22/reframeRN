import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button, Card, CardSection } from './common';
import axios from 'axios';
import EntryList from './EntryList';

class EntryLog extends Component {
  render() {
    return(
      <EntryList />
    );
  };
}


export default EntryLog;
