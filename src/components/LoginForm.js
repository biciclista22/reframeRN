import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import axios from 'axios';

const USER_ID = 'userId';


class LoginForm extends Component {

  state = { email: '', password: '', error: '', loading: false};

  async storeUserId(userId) {
    userIdString = JSON.stringify(userId)
    // console.log("ID was stored successfully");
    try {
      AsyncStorage.setItem(USER_ID, userIdString)
      console.log("ID was stored successfully");
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
            name: this.state.name,
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
        // this.redirect('home');
      } else {
        //Handle error
        let error = res;
        throw error;
      }

    } catch(errors) {

    }

  }

  // createUser() {
  //
  //   const { email, password, user_id } = this.state;
  //
  //   this.setState({error: '', user_id: '' loading: true });
  //
  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:3000/users',
  //     data: {
  //       user: {name: this.state.email, email: this.state.email, user_id: this.state.user_id}
  //     }
  //     // }).catch( () => {
  //     // need to add conditional statement to check if it doesn't already exist, create user
  //     // also want to chain a .then(this.onLoginSuccess.bind(this))
  //     // }).catch( () => {
  //     // need to show error messaging if the email exists but the password doesn't
  //     // here can instead call .catch(this.onLoginFail.bind(this));
  //   }).then(this.onLoginSuccess.bind(this))
  // }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  onLoginFail() {
    this.setState({
      error: 'Authentication Failed.',
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
      </Card>
    );
  }
}

export default LoginForm;
