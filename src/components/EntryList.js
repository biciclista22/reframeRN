import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

class EntryList extends Component {
  state = { entries: [] }

  componentWillMount() {
    axios.get('http://localhost:3000/entries')
    .then(response => this.setState({ entries: response.data }));
  }

  render() {
    return (
      <View>
      <Text> Past Entries List!!! </Text>
      </View>
    );
  }
}

export default EntryList;
