import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, Dimensions, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from './components/Welcome/Welcome';
import colors from './components/colors';
import WelcomeUser from './components/Welcome/WelcomeUser';
import WelcomeAdmin from './components/Welcome/WelcomeAdmin';

const height = Dimensions.get('window').height;
const App = () => {
  const [loginDetails, setLoginDetails] = useState(false);
  const [userLogin, setUserLogin] = useState(null);
  const [userType, setUserType] = useState(null);
  const [gotUserTypeInfo, setGotUserTypeInfo] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('user_email').then(value => {
      if (value != null) {
        setUserLogin(value);
      }
      setLoginDetails(true);
    });
    AsyncStorage.getItem('user_type').then(value => {
      if (value != null) {
        setUserType(value);
      }
      setGotUserTypeInfo(true);
    });
  });

  if (loginDetails && gotUserTypeInfo) {
    if (userLogin != null) {
      if (userType === 'user') {
        return <WelcomeUser />;
      } else {
        return <WelcomeAdmin />;
      }
    } else {
      return <Welcome />;
    }
  } else {
    return (
      <SafeAreaView>
        <View
          style={{
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={colors.green} size={100} />
        </View>
      </SafeAreaView>
    );
  }
};

export default App;
