import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import Authentication from '../components/Authentication';
import { login } from '../actions';

const Login = props => (
  <Authentication
    prefix="Sign in to your"
    title="Hogan Report"
    onSubmit={data => props
      .login(data)
      .then(action => props.navigation.navigate(action.user.adaptabilities ? 'Profile' : 'CustomizeProfile')) // if not yet customize profile
      .catch((err) => {
        console.log('err', err);
        if (((err || {}).response || {}).status === 401) {
          Alert.alert('Wrong email/password entered');
        } else {
          Alert.alert('Unable to connect to server', 'Please check your Internet connection.');
        }
      })
    }
  />
);

export default connect(
  null,
  { login },
)(Login);
