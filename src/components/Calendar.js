import React, { Component } from 'react';
import { ScrollView, Text, AsyncStorage, View, Image } from 'react-native';
import axios from 'axios';
// import EntryDetail from './EntryDetail';
import { Agenda } from 'react-native-calendars';
import { Icon } from 'react-native-elements';


class Calendar extends Component {
  state = { entries: [], items: {} }


  today() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!

    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
   today = `${yyyy}-${mm}-${dd}`
   console.log(`today is ${today}`);
   return today;
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
          const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

          let entriesArray = [];

          for (i = 0; i < response.data.length; i++) {
            let date = new Date(response.data[i].created_at);
            console.log(date);
            console.log(date.getHours());
            console.log(date.getMinutes());

            let month = monthsArray[date.getMonth()];

            let monthNum = date.getMonth() + 1

            let year = date.getFullYear();

            let day = date.getDate();

            let dd = date.getDate();

            if(dd<10){
                dd='0'+dd;
            }
            if(monthNum<10){
                monthNum='0'+monthNum;
            }

            let minutes = date.getMinutes();

            if (minutes < 10) {
              minutes = `0${minutes}`
            }

            let hour = date.getHours();

            let time = '';

            if (hour > 12 ) {
              hour = hour - 12
              time = `${hour}:${minutes} PM`
            } else {
              time = `${hour}:${minutes} AM`
            }

            let agendaEntryYear = `${year}-${monthNum}-${dd}`;

            let stringDate = `${month} ${day}, ${year}`;

            if (!this.state.items[agendaEntryYear]) {
              this.state.items[agendaEntryYear] = [];
              this.state.items[agendaEntryYear].push({
                stringDate: stringDate,
                text: response.data[i].text,
                time: time
              });
            } else {
              this.state.items[agendaEntryYear].push({
                stringDate: stringDate,
                text: response.data[i].text,
                time: time
              });
            }

            let entryArray = new Object();
            entryArray['text'] = response.data[i].text;
            entryArray['id'] = response.data[i].id;
            entryArray['date'] = stringDate;
            entriesArray.push(entryArray);
          }

          this.setState({ entries: entriesArray })

          const newItems = {};
          Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
          this.setState({
            items: newItems
          });
          console.log(this.state.items);
        }); // end of the then
      }
    });
  }

  renderItem(item) {
    return (
      <View style={[styles.item]}>
        <Text style={{fontSize: 10, paddingBottom: 5}}>{item.time}</Text><Text size={{fontSize: 15}}>{item.text}</Text></View>
    );
  }
  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }
  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  // timeToString(time) {
  //   const date = new Date(time);
  //   return date.toISOString().split('T')[0];
  // }

  render() {
    return (

      <Agenda
      items={this.state.items}
      selected={this.today()}
      renderItem={this.renderItem.bind(this)}
      renderEmptyDate={this.renderEmptyDate.bind(this)}
      rowHasChanged={this.rowHasChanged.bind(this)}
      theme={{calendarBackground: '#E0CCEE',  textSectionTitleColor: 'purple', monthTextColor: '#496FC2', agendaKnobColor: 'purple', backgroundColor: '#b2d8ed', agendaDayNumColor: 'purple', agendaDayTextColor: '#496FC2',}}
      />
    );
  }
}

const styles = {
  calendarStyle: {
    padding: 10
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
}

export default Calendar;
