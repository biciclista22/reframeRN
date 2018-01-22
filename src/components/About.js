import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';

const About = () => {
  return(
    <View>
      <Text>Reframe is a gratitude journal app that keeps things simple. Create an account or login and start writing.</Text>
    </View>
  )
}

export default About;
