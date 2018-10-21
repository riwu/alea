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
    width: '25%',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  unselected: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Adaptabilities = (props) => {
  const arr = Object.entries({ ...data, ...props.extraData });
  const selectedCount = arr.map((_, i) => props.isSelected(i)).filter(selected => selected).length;
  return (
    <View style={[styles.adaptabilities, props.style]}>
      {arr.map(([id, { Icon, title }], i) => (
        <Button
          key={id}
          style={[
            styles.button,
            { width: selectedCount === 1 ? '30%' : '25%' },
            !props.isSelected(i) && styles.unselected,
            !props.isSelected(i) && { width: `${80 / arr.length}%` },
          ]}
          onPress={() => props.onPress(i)}
        >
          <Icon fill={props.isSelected(i) ? 'white' : '#86BC25'} />
          {props.isSelected(i) && <Text style={styles.buttonText}>{title}</Text>}
        </Button>
      ))}
    </View>
  );
};

export default Adaptabilities;
