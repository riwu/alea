import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: 'black',
  },
  bottom: {
    backgroundColor: 'white',
  },
  children: {
    position: 'absolute',
    height: '100%',
  },
});

const Background = ({ children, style, ratio = 0.375 }) => (
  <View style={[styles.container, style]}>
    <View style={[styles.top, { flex: ratio }]} />
    <View style={[styles.bottom, { flex: 1 - ratio }]} />
    <View style={styles.children}>{children}</View>
  </View>
);

export default Background;
