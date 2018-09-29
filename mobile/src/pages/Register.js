import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Alert, KeyboardAvoidingView, Dimensions,
} from 'react-native';
import Button from '../components/Button';
import { register } from '../actions';
import TextInput from '../components/TextInput';
import Header from '../components/Header';
import Background from '../components/Background';
import Card from '../components/Card';
import Title from '../components/Title';
import { WIDTH } from '../constants';

const styles = StyleSheet.create({
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
  card: {
    width: WIDTH - 40,
    margin: 20,
  },
});

class Register extends React.Component {
  state = {
    displayName: '',
    email: '',
    password: '',
  };

  render() {
    const { props } = this;
    return (
      <Background>
        <KeyboardAvoidingView behavior="position">
          <Header prefix="Customize your" title="Profile" />
          <View style={styles.buttons}>
            <Button title="BACK" onPress={() => props.navigation.pop()} style={styles.backButton} />
            <Button
              title="NEXT"
              onPress={() => {
                const [displayName, email, password] = ['displayName', 'email', 'password'].map(
                  key => this.state[key].trim(),
                );
                if (!displayName) {
                  Alert.alert('Display name cannot be empty');
                  return;
                }
                if (!/^\S+@\S+$/.test(email)) {
                  Alert.alert('Invalid email address');
                  return;
                }
                if (password.length < 6) {
                  Alert.alert('Password must be at least 6 characters long');
                  return;
                }

                props
                  .register({
                    email,
                    password,
                    displayName,
                  })
                  .then(() => props.navigation.navigate('CustomizeProfile'))
                  .catch((err) => {
                    if (((err || {}).response || {}).status === 409) {
                      Alert.alert('Email already used');
                    } else {
                      console.log('err', err);
                      Alert.alert(
                        'Unable to connect to server',
                        'Please check your Internet connection.',
                      );
                    }
                  });
              }}
            />
          </View>

          <Card style={styles.card}>
            <Title>Account Details</Title>
            <TextInput
              onChangeText={displayName => this.setState({ displayName })}
              autoCapitalize="words"
              maxLength={20}
              autoCorrect={false}
              placeholder="Name"
            />
            <TextInput
              onChangeText={email => this.setState({ email })}
              autoCorrect={false}
              autoCapitalize="none"
              maxLength={30}
              placeholder="Email"
            />
            <TextInput
              onChangeText={password => this.setState({ password })}
              secureTextEntry
              autoCapitalize="none"
              placeholder="Password"
            />
          </Card>
        </KeyboardAvoidingView>
      </Background>
    );
  }
}
export default connect(
  null,
  { register },
)(Register);
