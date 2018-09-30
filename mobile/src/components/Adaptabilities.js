import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import data from '../pages/data';
import Button from './Button';

const styles = StyleSheet.create({
  adaptabilities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  button: {
    width: '30%',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  unselected: {
    backgroundColor: 'white',
    width: '20%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Adaptabilities = props => (
  <View style={styles.adaptabilities}>
    {Object.entries(data).map(([id, { Icon, title }]) => (
      <Button
        key={id}
        style={[styles.button, !props.isSelected(title) && styles.unselected]}
        onPress={() => props.onPress(title)}
      >
        <Icon fill={props.isSelected(title) ? 'white' : '#86BC25'} />
        {props.isSelected(title) && <Text style={styles.buttonText}>{title}</Text>}
      </Button>
    ))}
  </View>
);

export default Adaptabilities;
