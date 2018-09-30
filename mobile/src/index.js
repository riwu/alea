import React from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistStore } from 'redux-persist';
import store from './store';
import Navigator from './navigators';
import { getHacks } from './actions';

const persistor = persistStore(store);
// persistor.purge();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Navigator />
    </PersistGate>
  </Provider>
);

AppState.addEventListener('change', async (newState) => {
  console.log('new state', newState);
  if (newState === 'active') {
    // will be called even if fresh start
    store.dispatch(getHacks());
  }
});

export default App;
