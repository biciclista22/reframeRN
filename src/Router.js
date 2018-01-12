import React from 'react';
import { Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EntryForm from './components/EntryForm';
import EntryLog from './components/EntryLog';


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="PleaseLogin" initial/>
        </Scene>
        <Scene key="main">
          <Scene
            rightTitle="View Entries"
            onRight={() => {  console.log('right!');}}
            key="entryForm"
            component={EntryForm}
            title="Entry" />
          <Scene key="entryLog" component={EntryLog} title="Log"/>
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
