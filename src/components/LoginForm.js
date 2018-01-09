import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';
import axios from 'axios';

class LoginForm extends Component {

  state = { email: '', password: ''};

  createUser() {
    axios({
      method: 'post',
      url: 'http://localhost:3000/users',
      data: {
        user: {name: this.state.email, email: this.state.email, password: this.state.password}
      }
    })
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
          <Button onPress={this.createUser.bind(this)}>
            Create Account
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default LoginForm;
