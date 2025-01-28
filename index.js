/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import PushNotification from 'react-native-push-notification';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NotifierWrapper} from 'react-native-notifier';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';

// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);
//   },
//   requestPermissions: Platform.OS === 'ios',
// });

const Main = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NotifierWrapper translucentStatusBar>
          <App />
        </NotifierWrapper>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
