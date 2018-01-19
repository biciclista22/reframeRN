import React, { Component } from 'react';
import { Alert, TextInput, AsyncStorage } from 'react-native';
import { Button, Card, CardSection } from './common';
import axios from 'axios';
import { Actions} from 'react-native-router-flux';


class EntryForm extends Component {
  state = { text: ''};

  postEntry() {
    console.log("hi");
    if (this.state.text === '') {
      return Alert.alert('Woops! Entry appears to be empty.')
    }

    AsyncStorage.getItem(USER_ID,  (error, result) => {
      if (result) {
        let value = parseInt(result);
        axios({
          method: 'post',
          url: 'http://localhost:3000/entries',
          data: {
            entry: {text: this.state.text, user_id: value}
          }
        });
        this.setState({ text: ''})
      }
    });
  }

  async userLogout() {
    try {
      AsyncStorage.removeItem(USER_ID);
      Alert.alert('Logout Success!');
      // console.log(USER_ID);
      Actions.auth();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <Card>

      <CardSection>
      <TextInput
      value={this.state.text}
      onChangeText={text => this.setState({text})}
      style={{ height: 100, width: 350}}
      multiline={true}
      autoCorrect={true}
      // lineHeight: 23
      // fontSize: 18
      placeholder='Start reframing...'
      />
      </CardSection>

      <CardSection>
      <Button onPress={this.postEntry.bind(this)} >
      Log it!
      </Button>
      </CardSection>

      <CardSection>
      <Button onPress={this.userLogout}>
      Sign out!
      </Button>
      </CardSection>

      </Card>
    );
  }
}


export default EntryForm;
