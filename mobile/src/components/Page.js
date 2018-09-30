import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './Button';
import Header from './Header';
import Background from './Background';
import RightHeader from './RightHeader';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: 'black',
    borderColor: '#86BC25',
    borderWidth: 1,
    marginRight: 8,
  },
});

const Page = props => (
  <Background>
    <View style={styles.headerContainer}>
      <View>
        <Header prefix={props.prefix} title={props.title} />
        <View style={styles.buttons}>
          <Button title="BACK" onPress={() => props.navigation.pop()} style={styles.backButton} />
          <Button title={props.button.title} onPress={props.button.onPress} />
        </View>
      </View>
      {props.rightHeader && <RightHeader {...props.rightHeader} />}
    </View>

    {props.children}
  </Background>
);

export default Page;
