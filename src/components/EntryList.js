import React, { Component } from 'react';
import { ScrollView, Text, AsyncStorage, View, Image, Button } from 'react-native';
import axios from 'axios';
import EntryDetail from './EntryDetail';
import { Agenda } from 'react-native-calendars';

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
        <View>
        <Image
        style={{
          flex: 1,
          position: 'absolute',
          resizeMode: 'contain',
        }}
        source={require('../../background1000.png')}
        />


        <ScrollView>
        <View style={styles.calendarStyle}>

        <Agenda
        items={{'2018-01-22': [{text: 'item 1 - any js object'}],
            '2018-01-23': [{text: 'item 2 - any js object'}],
            '2018-01-24': [],
            '2018-01-25': [{text: 'item 3 - any js object'}],
	           }}
        loadItemsForMonth={(month) => {console.log('trigger items loading')}}
        onDayPress={(day)=>{console.log('day pressed')}}
				selected={'2018-01-23'}
        renderItem={item => <View><Text>Hello</Text></View>}
        renderDay={(day, item) => <View />}
        renderEmptyDate={() => <View />}
        rowHasChanged={(r1, r2) => (r1.text !== r2.text)}
        hideKnob={true}
        theme={{}}
        style={{}}
        />
        </View>
        <Button onPress={this.renderEntries()} title="View all Entries"></Button>
        </ScrollView>
        </View>
      );
    }
  }

  const styles = {
    calendarStyle: {
      padding: 10
    }
  }

  export default EntryList;
