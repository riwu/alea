import React from 'react';
import TextInput from './TextInput';

export const NameInput = props => (
  <TextInput
    onChangeText={displayName => props.onChangeText(displayName)}
    autoCapitalize="words"
    maxLength={25}
    autoCorrect={false}
    placeholder="Name"
    textContentType="name"
  />
);

export const EmailInput = props => (
  <TextInput
    onChangeText={email => props.onChangeText(email)}
    autoCorrect={false}
    autoCapitalize="none"
    maxLength={40}
    placeholder="Email"
    textContentType="emailAddress"
    keyboardType="email-address"
  />
);
