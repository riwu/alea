import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

const Title = ({ children, style }) => <Text style={[styles.title, style]}>{children}</Text>;

export default Title;
