import { createSwitchNavigator } from 'react-navigation';
import Authentication from './Authentication';
import CustomizeProfile from '../pages/CustomizeProfile';
import App from './App';

export default createSwitchNavigator({
  Authentication,
  CustomizeProfile,
  App,
});
