import React, { Component } from 'react';
import { Alert, TextInput, AsyncStorage, Text, View } from 'react-native';
import { Button, Card, CardSection, Quote } from './common';
import axios from 'axios';
import { Actions} from 'react-native-router-flux';


class EntryForm extends Component {
  state = { text: '', quote: '', author: ''};

  componentDidMount() {
    console.log('in the quote component and trying to mount');
    this.getQuote();
  }

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
          url: 'http://example-env.puazktppws.us-west-2.elasticbeanstalk.com//entries',
          data: {
            entry: {text: this.state.text, user_id: value}
          }
        });
        this.setState({ text: ''})
      }
    });
  }

  async getQuote() {
    console.log('in that quote');
    console.log('this is the call url http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
    try {
      const apiQuote = await axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
      console.log(apiQuote);
      this.setState({ quote: apiQuote.data.quoteText, author:apiQuote.data.quoteAuthor })
    } catch(error) {
      console.log('a try');
    }
  }

  renderQuote() {
    return <Text>{this.state.quote} - {this.state.author}</Text>
  }

  async userLogout() {
    try {
      AsyncStorage.removeItem(USER_ID);
      Alert.alert('Logout Success!');
      // console.log(USER_ID);
      Actions.login();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  buttonFunction() {
    this.postEntry();
    this.getQuote();
  }

  render() {
    return (
      <Card>

      <CardSection>
      <View>{this.renderQuote()}</View>
      </CardSection>

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
      <Button onPress={this.buttonFunction.bind(this)} >
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
