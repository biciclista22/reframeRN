import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';


class Welcome extends Component {

  goToLogin() {
    Actions.login();
  }

  goToAbout() {
    Actions.about();
  }

  render() {
    return (
      <Card>
      <CardSection>
      <Button onPress={this.goToLogin.bind(this)}>Time to Reframe</Button>
      </CardSection>

      <CardSection>
        <Button onPress={this.goToAbout.bind(this)}>What is Reframe?</Button>
      </CardSection>
      </Card>

    )
  }
}


export default Welcome;
