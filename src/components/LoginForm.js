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
      // console.log('res is:' + res);
      //Handle success
      if (response.status >= 200 && response.status < 300) {
        var json = JSON.parse(response._bodyText);
        let userId = json.user_id;

        //On success we will store the access_token in the AsyncStorage
        this.storeUserId(userId);
        Actions.main();
        // this.redirect('home');
      } else {
        //Handle error
        let errors = res;
        throw errors;
      }

    } catch(errors) {
      console.log("catch errors:" + errors);
      let formErrors = JSON.parse(errors);
      let errorsArray = [];

      for(var key in formErrors) {
        //If array is bigger than one we need to split it.
        if(formErrors[key].length > 1) {
          console.log(key);
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${formErrors[key]}`);
        }
      }
      this.setState({errors: errorsArray})
      console.log(this.state.errors);
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

      <Errors errors={this.state.errors}/>

      </Card>
    );
  }
}

export default LoginForm;
