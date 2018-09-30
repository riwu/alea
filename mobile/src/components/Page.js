import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation';
import Button from './Button';
import HeaderComponent from './Header';
import Background from './Background';
import RightHeader from './RightHeader';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
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
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Header.HEIGHT}
      contentContainerStyle={styles.container}
    >
      <View style={styles.headerContainer}>
        <View>
          <HeaderComponent prefix={props.prefix} title={props.title} />
          <View style={styles.buttons}>
            {props.backAction && (
              <Button title="BACK" onPress={props.backAction} style={styles.backButton} />
            )}
            <Button {...props.button} />
          </View>
        </View>
        {props.rightHeader && <RightHeader {...props.rightHeader} />}
      </View>

      {props.children}
    </KeyboardAvoidingView>
  </Background>
);

export default Page;
