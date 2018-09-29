import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    backgroundColor: 'white',
    padding: 20,
  },
});

const Card = ({ children, style }) => <View style={[styles.card, style]}>{children}</View>;

export default Card;
