import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, View } from 'react-native';
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
      // console.log('user id is ' + USER_ID);
      var value = await AsyncStorage.getItem(USER_ID)
      console.log('in the store user id function and the user id is ' + value);
    } catch(error) {
      console.log("Something went wrong");
    }
  }

  async onRegisterPressed() {

    try {
      let response = await fetch('https://example-env.puazktppws.us-west-2.elasticbeanstalk.com/users/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user:{
            name: this.state.email.downcase,
            email: this.state.email,
            password: this.state.password,
          }
        })
      });
      // console.log(response);

      let res = await response.text();

      // console.log(res);
      // Handle success
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

  async onLogin() {
    console.log('trying to login');
    try {
      // crazy that changing from let to const got rid of the error
      const response = await axios.get('http://example-env.puazktppws.us-west-2.elasticbeanstalk.com/users/login', {
        params: {
          email: this.state.email
        }
      })

      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        console.log('the response.data.user_id is ' + response.data.user_id);
        let userId = response.data.user_id;

        this.storeUserId(userId);
        Actions.main();
      }

    } catch(response) {
      // Alert.alert('You are not a user yet... Sign up!');
      console.log(response);
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

  renderCreateAccountButton() {
    if (this.state.loading) {
      return < Spinner size="small" />;
    }

    return (
      <Button onPress={this.onRegisterPressed.bind(this)}>
      Create Account
      </Button>
    )
  }

  renderSignUpButton() {
    if (this.state.loading) {
      return < Spinner size="small" />;
    }

    return (
      <Button onPress={this.onLogin.bind(this)}>
      Log In
      </Button>
    )
  }

  render() {
    return (

      <View>
      <Image
      style={{
        flex: 1,
        position: 'absolute',
        resizeMode: 'contain',
      }}
      source={require('../../background1000.png')}
      />

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
      {this.renderCreateAccountButton()}
      </CardSection>

      <CardSection>
      <Button onPress={this.onLogin.bind(this)}>
      Log In
      </Button>
      </CardSection>

      <Errors errors={this.state.errors}/>

      </Card>
      </View>
    );
  }
}

export default LoginForm;
