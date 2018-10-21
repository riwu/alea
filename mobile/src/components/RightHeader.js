import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },
  title: {
    color: 'white',
    margin: 3,
    textAlign: 'right',
  },
  items: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
  },
  item: {
    color: 'white',
    borderColor: '#86BC25',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    margin: 2,
  },
});

const RightHeader = props => (
  <View style={styles.container}>
    <Text style={styles.title}>{props.title}</Text>
    <View style={styles.items}>
      {props.items.map(item => (
        <Text key={item.id} style={styles.item}>
          {item.label}
        </Text>
      ))}
    </View>
  </View>
);

export default RightHeader;
