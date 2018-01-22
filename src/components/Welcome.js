import React, { Component } from 'react';
import { Alert, Text, View, Modal, ImageBackground, Image, Button } from 'react-native';
import { Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';


class Welcome extends Component {

  state = {
    modalVisible: false,
  };


  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  goToLogin() {
    Actions.login();
  }

  render() {
    return (

    <View>
      <Image
      style={{
        flex: 1,
        position: 'absolute',
        resizeMode: 'cover',
      }}
      source={require('../../welcome.png')}>
      </Image>

      <Modal
      visible={this.state.modalVisible}
      animationType={'fade'}
      onRequestClose={() => this.closeModal()}
      transparent={true}
      >


      <View style={styles.modalContainer}>
      <Image
      style={{
        flex: 1,
        position: 'absolute',
        resizeMode: 'contain',
      }}
      source={require('../../background1000.png')}
      >
      </Image>
      <View style={styles.innerContainer}>

      <Text style={styles.text}>Reframe is a gratitude journal app, an opportunity to reframe your day, the events and people that make it special.!!!</Text>
      <Text style={styles.text}>Reframe is a gratitude journal app that keeps things simple. Create an account or login and start writing.</Text>
      <Button onPress={ this.closeModal.bind(this)} title="Close"></Button>
      </View>

      </View>
      </Modal>


      <View style={styles.buttonView}>
      <Button onPress={this.openModal.bind(this)} title="What is Reframe?"/>

      <Button onPress={this.goToLogin.bind(this)} title="Start Journaling"/>
      </View>

      </View>
    )
  }
}

const styles = {

  buttonView: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'flex-end',
    backgroundColor: '#D6E8F0'

  },
  button: {
    backgroundColor: 'green',
    alignContent: 'flex-end'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '80%',
    width: '80%',
    paddingLeft: '30%'
  },
  innerContainer: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',

  }
};


export default Welcome;
