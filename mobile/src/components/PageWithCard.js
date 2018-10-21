import React from 'react';
import { StyleSheet } from 'react-native';
import Card from './Card';
import { WIDTH } from '../constants';
import Page from './Page';

const styles = StyleSheet.create({
  card: {
    width: WIDTH - 20,
    marginHorizontal: 10,
    marginVertical: 15,
    padding: 20,
    flex: 1,
  },
});

const PageWithCard = props => (
  <Page {...props}>
    <Card style={styles.card}>{props.children}</Card>
  </Page>
);

export default PageWithCard;
