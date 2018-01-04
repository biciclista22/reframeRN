import React from 'react';
import { View} from 'react-native';

// this is just showing information - no life cycle events
const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>{props.children}</View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  }
};

export { CardSection };
