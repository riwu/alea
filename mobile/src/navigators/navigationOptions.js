import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Logo from '../../assets/Logo';

const styles = StyleSheet.create({
  backIcon: {
    color: 'white',
    fontSize: 30,
    paddingLeft: 20,
  },
});

export default {
  navigationOptions: {
    headerTitle: Logo,
    headerStyle: {
      backgroundColor: 'black',
    },
    headerBackImage: <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />,
  },
};
