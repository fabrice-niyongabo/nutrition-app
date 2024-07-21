import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../colors';
import AdminDashboard from '../Admin/Dashboard';
import AdminProfile from '../Admin/AdminProfile';
import EditNames from '../Profile/EditNames';
import Children from '../Admin/Children/Children';

const Stack = createNativeStackNavigator();

const WelcomeAdmin = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={AdminDashboard}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={AdminProfile}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="EditNames"
          component={EditNames}
          options={{
            title: 'Edit your names',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="Children"
          component={Children}
          options={{
            title: 'Children registered',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeAdmin;
