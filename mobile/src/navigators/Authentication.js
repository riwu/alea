import { createStackNavigator } from 'react-navigation';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import navigationOptions from './navigationOptions';

export default createStackNavigator(
  {
    Home,
    Login,
    Register,
  },
  navigationOptions,
);
