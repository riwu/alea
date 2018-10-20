import { createStackNavigator } from 'react-navigation';
import Profile from '../pages/Profile';
import SubmitHack from '../pages/SubmitHack';
import RequestFeedback from '../pages/RequestFeedback';
import ProvideFeedback from '../pages/ProvideFeedback';
import SendFeedback from '../pages/SendFeedback';
import navigationOptions from './navigationOptions';

export default createStackNavigator(
  {
    Profile,
    SubmitHack,
    RequestFeedback,
    ProvideFeedback,
    SendFeedback,
  },
  navigationOptions,
);
