import React, { Component } from 'react';
import { Button, Card, CardSection, Input, Spinner } from './common';
import axios from 'axios';

class LoginForm extends Component {

  state = { email: '', password: '', error: '', loading: false};



  createUser() {

    const { email, password } = this.state;

    this.setState({error: '', loading: true });

    axios({
      method: 'post',
      url: 'http://localhost:3000/users',
      data: {
        user: {name: this.state.email, email: this.state.email, password: this.state.password}
      }
    // }).catch( () => {
      // need to add conditional statement to check if it doesn't already exist, create user
      // also want to chain a .then(this.onLoginSuccess.bind(this))
    // }).catch( () => {
      // need to show error messaging if the email exists but the password doesn't
      // here can instead call .catch(this.onLoginFail.bind(this));
    }).then(this.onLoginSuccess.bind(this))
  }

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
      <Button onPress={this.createUser.bind(this)}>
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
