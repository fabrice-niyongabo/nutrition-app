import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../screens/beforeLogin/welcome';
import Login from '../screens/beforeLogin/login';
import {COLORS} from '../constants/colors';
import Register from '../screens/beforeLogin/register';

const Stack = createNativeStackNavigator();

const BeforeLogin = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerTransparent: true,
            headerShown: false,
            title: '',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: '',
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerStyle: {backgroundColor: COLORS.green},
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: '',
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerStyle: {backgroundColor: COLORS.green},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BeforeLogin;
