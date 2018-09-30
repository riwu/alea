import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingRight: 50,
  },
  title: {
    color: 'white',
    fontSize: 25,
  },
  item: {
    color: 'white',
    borderColor: '#86BC25',
    borderWidth: 1,
    borderRadius: 12,
    padding: 3,
  },
});

const RightHeader = props => (
  <View style={styles.container}>
    <Text style={styles.title}>{props.title}</Text>
    <View>
      {props.items.map(item => (
        <Text key={item} style={styles.item}>
          {item}
        </Text>
      ))}
    </View>
  </View>
);

export default RightHeader;
