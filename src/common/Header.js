// import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// make a component
const Header = (props) => {
  // here we are doing destructuting so there are not multuple references to styles
  // can see video piece that explains it -- part 25

  const { textStyle, viewStyle } = styles;

  return (
    <View style={styles.viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
  // the style is a prop
};

const styles = {
  viewStyle: {
    backgroundColor: '#00e4ff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: 'purple',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.3,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
  }
};

// make the component available to other parts of the app
// don't want to use app-registry -- will import child components

export { Header };
