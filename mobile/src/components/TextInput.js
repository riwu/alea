import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 1,
    marginTop: 10,
  },
});

const Input = props => <TextInput style={styles.container} {...props} />;

export default Input;
