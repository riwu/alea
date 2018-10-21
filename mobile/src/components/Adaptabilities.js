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
    width: '20%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Adaptabilities = (props) => {
  const arr = Object.entries(data);
  const selectedCount = arr.map(([id]) => props.isSelected(id)).filter(selected => selected).length;
  return (
    <View style={styles.adaptabilities}>
      {arr.map(([id, { Icon, title }]) => (
        <Button
          key={id}
          style={[
            styles.button,
            { width: selectedCount === 1 ? '30%' : '25%' },
            !props.isSelected(id) && styles.unselected,
          ]}
          onPress={() => props.onPress(id)}
        >
          <Icon fill={props.isSelected(id) ? 'white' : '#86BC25'} />
          {props.isSelected(id) && <Text style={styles.buttonText}>{title}</Text>}
        </Button>
      ))}
    </View>
  );
};

export default Adaptabilities;
