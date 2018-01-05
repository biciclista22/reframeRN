import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { Button, Card, CardSection } from './common';
import axios from 'axios';


class EntryForm extends Component {
  state = { text: ''};

  postEntry() {
    // console.log(this.state.text)
    axios({
      method: 'post',
      url: 'http://localhost:3000/entries',
      data: {
        entry: {text: this.state.text}
      }
    })
  }

  //   axios.post('localhost:3000/entries', {
  //     entry: {text: this.state.text}})
  //     .then(response => (console.log(response)));
  //   // a request will return a promise back to us... it is asynchronus
  // }


  //   fetch('https://localhost:3000/entries', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       entry: {
  //         text: this.state.text
  //       }
  //     }),
  //   });
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

      </Card>
    );
  }
}


export default EntryForm;
