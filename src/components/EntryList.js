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
        .then(response => {
          const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

          let entriesArray = []

          for (i = 0; i < response.data.length; i++) {
            let date = new Date(response.data[i].created_at);

            let month = monthsArray[date.getMonth()];
            let year = date.getFullYear();
            let day = date.getDate();

            let stringDate = `${month} ${day}, ${year}`;

            let entryArray = new Object();
            entryArray['text'] = response.data[i].text;
            entryArray['id'] = response.data[i].id;
            entryArray['date'] = stringDate;

            entriesArray.push(entryArray);
          }

          this.setState({ entries: entriesArray })});
        }
      });
    }

    renderEntries() {
      return this.state.entries.map(entry =>
        < EntryDetail key={entry.id} entry={entry}/>
      );
    }

    render() {
      return (
        <ScrollView>
        {this.renderEntries()}
        </ScrollView>
      );
    }
  }

  export default EntryList;
