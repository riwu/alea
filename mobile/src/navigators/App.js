import { createStackNavigator } from 'react-navigation';
import CustomizeProfile from '../pages/CustomizeProfile';
import Profile from '../pages/Profile';
import SubmitHack from '../pages/SubmitHack';
import RequestFeedback from '../pages/RequestFeedback';
import navigationOptions from './navigationOptions';

export default createStackNavigator(
  {
    CustomizeProfile,
    Profile,
    SubmitHack,
    RequestFeedback,
  },
  navigationOptions,
);
