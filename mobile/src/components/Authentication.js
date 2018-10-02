import React from 'react';
import { Alert } from 'react-native';
import { Form } from 'native-base';
import TextInput from './TextInput';
import Title from './Title';
import PageWithCard from './PageWithCard';
import { NameInput, EmailInput } from './TextInputs';
import isValidEmail from '../util/isValidEmail';

class Authentication extends React.Component {
  state = {
    displayName: '',
    email: '',
    password: '',
  };

  render() {
    const { props } = this;
    return (
      <PageWithCard
        keyboardAvoidingView
        prefix={props.prefix}
        title={props.title}
        button={{
          title: 'NEXT',
          onPress: () => {
            const [displayName, email, password] = ['displayName', 'email', 'password'].map(key => this.state[key].trim());
            if (props.hasDisplayName && !displayName) {
              Alert.alert('Display name cannot be empty');
              return;
            }
            if (!isValidEmail(email)) {
              Alert.alert('Invalid email address');
              return;
            }
            if (password.length < 6) {
              Alert.alert('Password must be at least 6 characters long');
              return;
            }

            props.onSubmit({
              email,
              password,
              ...(props.hasDisplayName && { displayName }),
            });
          },
        }}
      >
        <Title>Account Details</Title>
        <Form>
          {props.hasDisplayName && (
            <NameInput onChangeText={displayName => this.setState({ displayName })} />
          )}
          <EmailInput onChangeText={email => this.setState({ email })} />
          <TextInput
            onChangeText={password => this.setState({ password })}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Password"
            textContentType="password"
          />
        </Form>
      </PageWithCard>
    );
  }
}
export default Authentication;
