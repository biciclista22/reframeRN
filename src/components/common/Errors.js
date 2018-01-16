import React from 'react';
import { View, Text} from 'react-native';


const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) =>
        <Text key={i} style={styles.errorStyle}> {error} </Text>)}
    </View>
  );
}

const styles = {
  errorStyle: {
    color: 'red',
    paddingTop: 10
  }
};

export {Errors};
