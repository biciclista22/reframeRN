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
        style={{ height: 100, width: 100}}
        multiline={true}
        autoCorrect={true}
        defaultValue='PassMeIn'
        />
      </CardSection>
      <CardSection>
        <Button>
          Log Entry
        </Button>
      </CardSection>

      </Card>
    );
  }
}


export default EntryForm;
