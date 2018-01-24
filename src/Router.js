import React from 'react';
import {StyleSheet} from 'react-native';
import { Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EntryForm from './components/EntryForm';
import EntryLog from './components/EntryLog';
import Welcome from './components/Welcome';
import Icon from 'react-native-fa-icons';
import Calendar from './components/Calendar';


const RouterComponent = () => {
  return (
    <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene} barButtonIconStyle={{ tintColor: 'green' }}>

      <Scene key="root" hideNavBar  >
        <Scene key="auth"  >
          <Scene key="welcome" component={Welcome} initial hideNavBar  />
          <Scene key="login" backButtonTintColor="white" backTitle=" " component={LoginForm} title="Reframe"   />
        </Scene>

        <Scene key="main" >

          <Scene
            rightTitle="Past Reframes"
            onRight={() => Actions.entryLog()}
            key="entryForm"
            component={EntryForm}
            title="Entry"
            initial
            hideNavBar
            />

          <Scene key="entryLog" component={Calendar} backButtonTintColor="white" backTitle=" " title="Past Reframes"/>

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
    backgroundColor: '#496FC2', // changing navbar color
  },
  navTitle: {
    color: 'white', // changing navbar title color
    //add font
  }
})

export default RouterComponent;
