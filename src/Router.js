import React from 'react';
import {StyleSheet} from 'react-native';
import { Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EntryForm from './components/EntryForm';
import EntryLog from './components/EntryLog';


const RouterComponent = () => {
  return (
    <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene}>

      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Welcome" initial/>
        </Scene>

        <Scene key="main">

          <Scene
            rightTitle="Past Reframes"
            onRight={() => Actions.entryLog()}
            // leftTitle="Log Out"
            // onLeft={() => Actions.logOut()}
            key="entryForm"
            component={EntryForm}
            title="Entry"
            initial
            />

          <Scene key="entryLog" component={EntryLog} title="Past Reframes"/>

        </Scene>
      </Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  navBar: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#579FB9', // changing navbar color
  },
  navTitle: {
    color: 'white', // changing navbar title color
    //add font
  }
})

export default RouterComponent;
