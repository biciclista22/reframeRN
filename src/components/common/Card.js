import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>{props.children}</View>
  );
};

const styles = {
  // this is an arbitrary name for variable - can be anything!
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2, // rounded edges
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .1,
    shadowRadius: 2, // at corners of the shadow, will round them out
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 100,
  }
};
export { Card };
