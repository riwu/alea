import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import data from '../pages/data';
import Button from './Button';

const styles = StyleSheet.create({
  adaptabilities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 130,
  },
  unselected: {
    backgroundColor: 'white',
    width: 80,
  },
  buttonText: {
    color: 'white',
  },
});

const Adaptabilities = props => (
  <View style={styles.adaptabilities}>
    {Object.entries(data).map(([id, { Icon, title }]) => (
      <Button
        key={id}
        style={[styles.button, props.selected !== title && styles.unselected]}
        onPress={() => props.onPress(title)}
      >
        <Icon fill={props.selected === title ? 'white' : '#86BC25'} />
        {props.selected === title && <Text style={styles.buttonText}>{title}</Text>}
      </Button>
    ))}
  </View>
);

export default Adaptabilities;
