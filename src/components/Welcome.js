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

      <Text style={styles.text}>Reframe is a gratitude journal app, an opportunity to reframe your day, the events and people that make it special!!!</Text>
      <Text style={styles.text}>Keep it simple. Create an account or login and start writing.</Text>
      <Button onPress={ this.closeModal.bind(this)} title="Close"></Button>
      </View>

      </View>
      </Modal>


      <View style={styles.buttonViewOuter}>

      <View style={styles.buttonViewInner}>
      <Button onPress={this.openModal.bind(this)} color='#5A2B5E' title="What is Reframe?"/>
      </View>

      <View style={styles.buttonViewInner}>
      <Button onPress={this.goToLogin.bind(this)} color='#5A2B5E' title="Start Journaling"/>
      </View>

      </View>

      </View>
    )
  }
}

const styles = {

  buttonViewOuter: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 650
  },
  buttonViewInner: {
    backgroundColor: '#D7EAF2',
    flex: 2,
    backgroundColor: '#C7DCE6',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C7DCE6',
    marginLeft: 8,
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '80%',
    width: '80%',
    paddingLeft: '30%'
  },
  innerContainer: {
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#5A2B5E',
    fontSize: 20,
    paddingBottom: 15,
    // fontStyle: '',
    textShadowColor: 'gray'
  },
  closeButton: {

  }
};


export default Welcome;
