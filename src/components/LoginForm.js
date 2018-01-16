import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, Errors } from './common';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

const USER_ID = 'userId';


class LoginForm extends Component {

  state = { email: '', password: '', errors: [], loading: false};

  async storeUserId(userId) {
    userIdString = JSON.stringify(userId)

    try {
      AsyncStorage.setItem(USER_ID, userIdString)
      console.log("ID was stored successfully");
      // var value = await AsyncStorage.getItem(USER_ID)
      // console.log(value);
    } catch(error) {
      console.log("Something went wrong");
    }
  }

  async onRegisterPressed() {
    try {
      let response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user:{
            name: this.state.email,
            email: this.state.email,
            password: this.state.password,
          }
        })
      });

      let res = await response.text();
      //Handle success
      if (response.status >= 200 && response.status < 300) {
        var json = JSON.parse(response._bodyText);
        let userId = json.user_id;

        //On success we will store the access_token in the AsyncStorage
        this.storeUserId(userId);
        Actions.main();
      } else {
        //Handle error
        let errors = res;
        throw errors;
      }

    } catch(errors) {
      let formErrors = JSON.parse(errors);
      let errorsArray = [];

      for(var key in formErrors.errors) {
        if(formErrors.errors[key].length > 1) {
            formErrors.errors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${formErrors.errors[key]}`);
        }
      }
      this.setState({errors: errorsArray})
    }

  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      errors: ''
    });
  }

  onLoginFail() {
    this.setState({
      // errors: 'Authentication Failed.',
      loading: false
    })
  }

  renderButton() {
    if (this.state.loading) {
      return < Spinner size="small" />;
    }

    return (
      <Button onPress={this.onRegisterPressed.bind(this)}>
      Create Account
      </Button>
    )
  }

  render() {
    return (
      <Card>
      <CardSection>
      <Input
      placeholder="user@gmail.com"
      label="Email"
      value={this.state.email}
      onChangeText={email => this.setState({ email })}
      />
      </CardSection>

      <CardSection>
      <Input
      secureTextEntry={true}
      placeholder="password"
      label="Password"
      value={this.state.password}
      onChangeText={password => this.setState({ password })}
      />
      </CardSection>

      <CardSection>
      {this.renderButton()}
      </CardSection>

      <CardSection>
      <Button>Log In</Button>
      </CardSection>

      <Errors errors={this.state.errors}/>

      </Card>
    );
  }
}

export default LoginForm;
