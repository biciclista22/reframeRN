import React, { Component } from 'react';
import { ScrollView, Text, AsyncStorage } from 'react-native';
import axios from 'axios';
import EntryDetail from './EntryDetail';

class EntryList extends Component {
  state = { entries: [] }

  date(entry) {
    console.log(entry.created_at)
  }

  componentWillMount() {
    console.log('hi!');

    AsyncStorage.getItem(USER_ID, (error, result) => {
      if (result) {
        let value = parseInt(result);
        console.log(value);
        console.log('now waiting to make the get request');
        axios.get(`http://localhost:3000/users/`+value+`/entries`)
        .then(response => {
          // console.log(response.data[0]);
          // console.log(response.data.length);
          // response.data
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

            // console.log(entryArray);
            entriesArray.push(entryArray);
          }

          // console.log(entriesArray);

          //text, date, id
          this.setState({ entries: entriesArray })});
        }
      });
    }



    // renderEntries() {
    //   return this.state.entries.map(entry =>
    //     <Text> {new Date(entry.created_at)} </Text>
    //     )
    //   }

    renderEntries() {
      return this.state.entries.map(entry =>
        < EntryDetail key={entry.id} entry={entry}/>
      );
    }

    render() {
      // console.log(this.state.entries);
      return (
        <ScrollView>
        {this.renderEntries()}
        </ScrollView>
      );
    }
  }

  export default EntryList;
