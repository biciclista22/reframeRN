import React from 'react';
import { Text, View } from 'react-native';
import { Card } from './common/Card';
import { CardSection } from './common/CardSection';
import { Icon } from 'react-native-elements'

const EntryDetail = (props) => {
  return (
    <View style={styles.viewStyle}>
    <View style={styles.dateStyle}>
      <Icon
        name='toys' />
      <Text style={{paddingLeft: 5}}>{props.entry.date}</Text>
    </View>
    <View style={styles.entryStyle}>
      <Text>{props.entry.text}</Text>
    </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    borderWidth: 1,
    borderRadius: 2, // rounded edges
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .1,
    shadowRadius: 2, // at corners of the shadow, will round them out
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20
  },
  dateStyle: {
    backgroundColor: '#86A0D4',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#86A0D4',
    position: 'relative',
  },
  entryStyle: {
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#86A0D4',
    position: 'relative',

  }
}
export default EntryDetail;
