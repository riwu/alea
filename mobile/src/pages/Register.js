import React from 'react';
import { connect } from 'react-redux';
import { Alert, KeyboardAvoidingView } from 'react-native';
import { register } from '../actions';
import TextInput from '../components/TextInput';
import Title from '../components/Title';
import PageWithCard from '../components/PageWithCard';

class Register extends React.Component {
  state = {
    displayName: '',
    email: '',
    password: '',
  };

  render() {
    const { props } = this;
    return (
      <PageWithCard
        prefix="Customize your"
        title="Profile"
        button={{
          title: 'NEXT',
          onPress: () => {
            const [displayName, email, password] = ['displayName', 'email', 'password'].map(key => this.state[key].trim());
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
          },
        }}
      >
        <KeyboardAvoidingView behavior="position">
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
        </KeyboardAvoidingView>
      </PageWithCard>
    );
  }
}
export default connect(
  null,
  { register },
)(Register);
