import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import Button from './Button';
import Header from './Header';
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
  button: {
    marginRight: 10,
  },
  backButton: {
    backgroundColor: 'black',
    borderColor: '#86BC25',
    borderWidth: 1,
    marginRight: 8,
  },
});

const Page = (props) => {
  const Component = props.keyboardAvoidingView ? KeyboardAvoidingView : View;
  const buttons = props.buttons || [props.button];
  return (
    <Background ratio={props.ratio}>
      <Component
        behavior="position"
        contentContainerStyle={styles.container}
        style={styles.container}
      >
        <View style={styles.headerContainer}>
          <View>
            <Header prefix={props.prefix} title={props.title} />
            <View style={styles.buttons}>
              {props.backAction && (
                <Button title="BACK" onPress={props.backAction} style={styles.backButton} />
              )}
              {buttons.map(button => (
                <Button key={button.title} {...button} style={styles.button} />
              ))}
            </View>
          </View>
          {props.rightHeader && <RightHeader {...props.rightHeader} />}
        </View>

        {props.children}
      </Component>
    </Background>
  );
};

export default Page;
