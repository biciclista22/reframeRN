import React, { Component } from 'react';
import { ScrollView, Text, AsyncStorage } from 'react-native';
import axios from 'axios';
import EntryDetail from './EntryDetail';

class EntryList extends Component {
  state = { entries: [] }

  componentWillMount() {
    console.log('hi!');

    AsyncStorage.getItem(USER_ID, (error, result) => {
      if (result) {
        let value = parseInt(result);
        console.log(value);
        console.log('now waiting to make the get request');
        axios.get(`http://localhost:3000/users/`+value+`/entries`)
        .then(response => this.setState({ entries: response.data }));
      }
    });


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
