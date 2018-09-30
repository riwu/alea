import { Alert } from 'react-native';

const handleSessionExpired = (e, props) => {
  if (((e || {}).response || {}).status !== 401) {
    return false;
  }
  Alert.alert('Session expired', 'Please re-login');
  props.navigation.navigate('Login');
  return true;
};

export default handleSessionExpired;
