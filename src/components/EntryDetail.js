import React from 'react';
import { Text } from 'react-native';
import { Card } from './common/Card';
import { CardSection } from './common/CardSection';

const EntryDetail = (props) => {
  return (
    <Card>
      <CardSection>
        <Text>{props.entry.date}</Text>
      </CardSection>
      <CardSection>
        <Text>{props.entry.text}</Text>
      </CardSection>
    </Card>
  );
};

export default EntryDetail;
