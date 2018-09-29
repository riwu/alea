import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;

export default Title;
