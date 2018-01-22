import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={ onPress } style={buttonStyle}>
      <Text style={textStyle}>
        { children }
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#C7DCE6',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C7DCE6',
    marginLeft: 5,
    marginRight: 5,
  }
}

export { Button };
