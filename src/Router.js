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
            rightTitle="Past Reframes"
            onRight={() => Actions.entryLog()}
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

export default RouterComponent;
