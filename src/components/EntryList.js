import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import axios from 'axios';
import EntryDetail from './EntryDetail';

class EntryList extends Component {
  state = { entries: [] }

  componentWillMount() {
    axios.get('http://localhost:3000/entries')
    .then(response => this.setState({ entries: response.data }));
  }

  renderEntries() {
    return this.state.entries.map(entry =>
      < EntryDetail key={entry.id} entry={entry}/>
    );
  }

  render() {
    console.log(this.state.entries);
    return (
      <ScrollView>
        {this.renderEntries()}
      </ScrollView>
    );
  }
}

export default EntryList;
