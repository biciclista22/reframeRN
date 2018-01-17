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
      let response = await fetch('http://localhost:3000/users/signup', {
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

  async APILoginCall() {
    console.log('pressing button and in async checkLoginAccount');

    let response = await axios.get('http://localhost:3000/users/login', {
      params: {
        email: this.state.email
      }
    })
    console.log('in the checkloginaccount response:')
    console.log(response);
    return response;
    // const json = await response.json();

  }

  onLogin() {
    this.APILoginCall()
    .then((response) => {
      console.log('in the then portion of the promise');
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        console.log('the response.data.user_id');
        console.log(response.data.user_id);
        let userId = response.data.user_id;

        this.storeUserId(userId);
        console.log(USER_ID);
        Actions.main(); }
        else {
          console.log(response.data.errors);
        }
      })
    }


    // async onLogin() {
    //   let response = this.APILoginCall();
    //
    //   try {
    //     console.log(response);
    //
    //     if (response.status >= 200 && response.status < 300) {
    //       console.log('the response.data.user_id');
    //       console.log(response.data.user_id);
    //       let json = JSON.parse(response.data);
    //       let userId = json.user_id;
    //
    //       //On success we will store the access_token in the AsyncStorage
    //       this.storeUserId(userId);
    //       Actions.main();
    //     } else {
    //       console.log('error');
    //       let errors = res;
    //       throw errors;
    //     }
    //   } catch(errors) {
    //     let formErrors = JSON.parse(errors);
    //     let errorsArray = [];
    //
    //     for(var key in formErrors.errors) {
    //       if(formErrors.errors[key].length > 1) {
    //         formErrors.errors[key].map(error => errorsArray.push(`${key} ${error}`));
    //       } else {
    //         errorsArray.push(`${key} ${formErrors.errors[key]}`);
    //       }
    //     }
    //     this.setState({errors: errorsArray})
    //   }
    // }

    // let response = await fetch("http://localhost:3000/users/login", {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     user:{
    //       // name: this.state.email.downcase,
    //       email: this.state.email,
    //       // password: this.state.password,
    //     }
    //   })
    // });

    // axios({
    //   method: 'get',
    //   url: 'http://localhost:3000/users/login',
    //   data: {
    //     user: {name: this.state.email, email: this.state.email}
    //   }
    // })
    // .then(function (response) {
    //   console.log('you got to the response...');
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    // let response = axios({
    //   method: 'get',
    //   url: 'http://localhost:3000/users/login',
    //   data: {
    //     user: {name: this.state.email, email: this.state.email}
    //   }
    // })
    //
    // console.log('you got to the response...');
    // console.log(response);

    // let textRes = response.text();
    // console.log('this is the res' + textRes);


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
      );
    }
  }

  export default LoginForm;
