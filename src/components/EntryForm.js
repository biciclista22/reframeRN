import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { Button, Card, CardSection } from './common';

class EntryForm extends Component {
  state = { text: ''};

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
        placeholder='Start reframing...'
        />
      </CardSection>

      <CardSection>
        <Button>
          Log it!
        </Button>
      </CardSection>

      </Card>
    );
  }
}


export default EntryForm;
