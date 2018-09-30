import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import Authentication from '../components/Authentication';
import { register } from '../actions';

const Register = props => (
  <Authentication
    prefix="Customize your"
    title="Profile"
    hasDisplayName
    onSubmit={data => props
      .register(data)
      .then(() => props.navigation.navigate('CustomizeProfile'))
      .catch((err) => {
        if (((err || {}).response || {}).status === 409) {
          Alert.alert('Email already used');
        } else {
          console.log('err', err);
          Alert.alert('Unable to connect to server', 'Please check your Internet connection.');
        }
      })
    }
  />
);

export default connect(
  null,
  { register },
)(Register);
