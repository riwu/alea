import React from 'react';
import { StyleSheet } from 'react-native';
import { Item, Input, Label } from 'native-base';

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 1,
    marginTop: 10,
  },
});

const TextInput = ({ placeholder, ...props }) => (
  <Item floatingLabel>
    <Label>{placeholder}</Label>
    <Input style={styles.container} {...props} />
  </Item>
);

export default TextInput;
