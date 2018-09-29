import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  prefix: {
    color: 'white',
    fontSize: 17,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const Header = props => (
  <View style={styles.container}>
    <Text style={styles.prefix}>{props.prefix}</Text>
    <Text style={styles.title}>{props.title}</Text>
  </View>
);

export default Header;
