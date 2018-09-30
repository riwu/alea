import { createStackNavigator } from 'react-navigation';
import Home from '../pages/Home';
import Register from '../pages/Register';
import navigationOptions from './navigationOptions';

export default createStackNavigator(
  {
    Home,
    Register,
  },
  navigationOptions,
);
