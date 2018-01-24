import React, { Component } from 'react';
import { Alert, Text, View, Modal, ImageBackground, Image, Button } from 'react-native';
import { Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';


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
      source={require('../../Welcomecamera.png')}>
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
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        // position: 'absolute',
        // resizeMode: 'contain',
      }}
      source={require('../../about.png')}
      >

      </Image>
      <View style={styles.closeButton}>
      <Button
        onPress={() => this.closeModal()}
        title="Close"
        color="#E0CCEE"
       >
      </Button>
      </View>

      </View>

      </Modal>


      <View style={styles.buttonViewOuter}>

      <View style={styles.buttonViewInner}>
      <Button onPress={this.openModal.bind(this)} color='white' title="What is Reframe?"/>
      </View>

      <View style={styles.buttonViewInner}>
      <Button onPress={this.goToLogin.bind(this)} color='white' title="Start Journaling"/>
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
    height: 650,
    backgroundColor: 'transparent'
  },
  buttonViewInner: {
    backgroundColor: '#496FC2',
    flex: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C7DCE6',
    marginLeft: 8,
    marginRight: 8,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#C3117C',
    fontSize: 20,
    paddingBottom: 15,
    textShadowColor: 'gray'
  },
  closeButton: {
    // flex: 1,
    // alignSelf: 'stretch',
    backgroundColor: '#496FC2',
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#C7DCE6',
    // marginLeft: 5,
    // marginRight: 5,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'purple',
  }
};


export default Welcome;
