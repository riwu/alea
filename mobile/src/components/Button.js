import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 8,
    backgroundColor: '#86BC25',
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    maxWidth: 200,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});

const Button = ({
  title, onPress, disabled, style, textStyle, children,
}) => (
  <TouchableOpacity
    style={[styles.button, style, { opacity: disabled ? 0.5 : 1 }]}
    onPress={onPress}
    disabled={disabled}
  >
    {title && <Text style={[styles.buttonText, textStyle]}>{title}</Text>}
    {children}
  </TouchableOpacity>
);

export default Button;
