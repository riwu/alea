import React from 'react';
import {
  AppState, Image, StyleSheet, Alert, Platform,
} from 'react-native';
import { Provider } from 'react-redux';
import { Updates } from 'expo';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistStore } from 'redux-persist';
import { Root } from 'native-base';
import store from './store';
import Navigator from './navigators';
import splash from '../assets/splash.png';
import getUserInfo from './util/getUserInfo';

const fetchData = () => {
  // is logged in
  if (store.getState().user.email) {
    store.dispatch(getUserInfo());
  }
};

const persistor = persistStore(store, null, fetchData);
// persistor.purge();

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Root>
        <Navigator
          persistenceKey="NavigationState"
          renderLoadingExperimental={() => <Image source={splash} style={styles.image} />}
        />
      </Root>
    </PersistGate>
  </Provider>
);

const checkForUpdates = async () => {
  if (process.env.NODE_ENV === 'development') return;
  const { isAvailable } = await Updates.checkForUpdateAsync();
  if (!isAvailable) return;
  await Updates.fetchUpdateAsync();
  Alert.alert(
    'Update available',
    'Reload for the latest version.\n'
      + `Some updates can only be delivered over ${
        Platform.OS === 'ios' ? 'App Store' : 'Google Play'
      }, look up for them!`,
    [{ text: 'Reload', onPress: () => Updates.reloadFromCache() }],
  );
};

if (Platform.OS === 'ios') {
  checkForUpdates(); // AppState change event not called for initial load on iOS
}

AppState.addEventListener('change', async (newState) => {
  console.log('new state', newState);
  if (newState === 'active') {
    checkForUpdates();
    fetchData();
  }
});

export default App;
