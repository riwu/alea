import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';

const styles = StyleSheet.create({
  spinnerContainer: {
    // blocks click event by taking up all spaces
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
});

const SpinnerComponent = props => props.animating && (
<View style={styles.spinnerContainer}>
  <Spinner />
</View>
);

export default SpinnerComponent;
