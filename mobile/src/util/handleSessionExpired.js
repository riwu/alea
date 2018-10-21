import { Toast } from 'native-base';

const handleSessionExpired = (e, props) => {
  if (((e || {}).response || {}).status !== 401) {
    return false;
  }
  Toast.show({
    text: 'Session expired, Please re-login',
    type: 'warning',
    duration: 4000,
  });
  props.navigation.navigate('Login');
  return true;
};

export default handleSessionExpired;
