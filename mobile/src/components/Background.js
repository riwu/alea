import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: 'black',
    flex: 0.375,
  },
  bottom: {
    backgroundColor: 'white',
    flex: 1,
  },
  children: {
    position: 'absolute',
  },
});

const Background = ({ children }) => (
  <View style={styles.container}>
    <View style={styles.top} />

    <View style={styles.bottom} />
    <View style={styles.children}>{children}</View>
  </View>
);

export default Background;
