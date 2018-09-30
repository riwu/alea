import React from 'react';
import { Alert } from 'react-native';
import TextInput from './TextInput';
import Title from './Title';
import PageWithCard from './PageWithCard';

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
            if (!/^\S+@\S+$/.test(email)) {
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
        {props.hasDisplayName && (
          <TextInput
            onChangeText={displayName => this.setState({ displayName })}
            autoCapitalize="words"
            maxLength={20}
            autoCorrect={false}
            placeholder="Name"
          />
        )}
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
      </PageWithCard>
    );
  }
}
export default Authentication;
