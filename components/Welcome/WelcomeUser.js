import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../Dashboard/Dashboard';
import RegisterChild from '../DashboardRegister/RegisterChild';
import colors from '../colors';
import RegisterWoman from '../DashboardRegister/RegisterWoman';
import Profile from '../Profile/Profile';
import Notifications from '../Notifications/Notifications';
import Women from '../Lists/Women';
import Child from '../Lists/Child';
import ChildDetails from '../Lists/ChildDetails';
import ChildMeal from '../Meals/ChildMeal';
import WomanDetails from '../Lists/WomanDetails';
import WomanMeal from '../Meals/WomanMeal';
import EditNames from '../Profile/EditNames';
import RemoveFoods from '../Lists/RemoveFoods';
import Deseases from '../Deseases/Deseases';
import RegisterBloodPressure from '../Deseases/RegisterBloodPressure';
import RegisterDiabete from '../Deseases/RegisterDiabete';
import BloodPressurePatients from '../Deseases/BloodPressurePatients';
import bloodPressurePatientDetails from '../Deseases/bloodPressurePatientDetails';
import BloodPressurePatientMeal from '../Deseases/BloodPressurePatientMeal';
import DiabetePatients from '../Deseases/DiabetePatients';
import DiabetePatientDetails from '../Deseases/DiabetePatientDetails';
import DiabetePatientMeal from '../Deseases/DiabetePatientMeal';

const Stack = createNativeStackNavigator();

const WelcomeUser = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="RegisterChild"
          component={RegisterChild}
          options={{
            // headerTransparent: true,
            title: 'Register New Child',
            // headerShadowVisible: false,
            headerTintColor: 'white',
            // headerBackVisible: false,
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="RegisterWoman"
          component={RegisterWoman}
          options={{
            // headerTransparent: true,
            title: 'Register New Woman',
            // headerShadowVisible: false,
            headerTintColor: 'white',
            // headerBackVisible: false,
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
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
          name="Notifications"
          component={Notifications}
          options={{
            title: 'Notifications',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="RemoveFoods"
          component={RemoveFoods}
          options={{
            title: 'Manage foods to take',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="Women"
          component={Women}
          options={{
            title: 'Registered Women',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Child"
          component={Child}
          options={{
            title: 'Registered Children',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="ChildDetails"
          component={ChildDetails}
          options={{
            title: 'Child Meal Details',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
            // headerTransparent: true,
            // headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="ChildMeal"
          component={ChildMeal}
          options={{
            title: 'Select food to take',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="WomanDetails"
          component={WomanDetails}
          options={{
            title: 'Woman Meal Details',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="WomanMeal"
          component={WomanMeal}
          options={{
            title: 'Choose meal to take',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="Deseases"
          component={Deseases}
          options={{
            title: 'People with deseases',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="RegisterBloodPressure"
          component={RegisterBloodPressure}
          options={{
            title: 'Register blood pressure patient',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="BloodPressurePatients"
          component={BloodPressurePatients}
          options={{
            title: 'Blood pressure patients',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="bloodPressurePatientDetails"
          component={bloodPressurePatientDetails}
          options={{
            title: 'Blood pressure patients',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="BloodPressurePatientMeal"
          component={BloodPressurePatientMeal}
          options={{
            title: "Blood pressure patients's meal",
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="DiabetePatients"
          component={DiabetePatients}
          options={{
            title: 'Diabete patients',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="DiabetePatientDetails"
          component={DiabetePatientDetails}
          options={{
            title: 'Diabete patient details',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="DiabetePatientMeal"
          component={DiabetePatientMeal}
          options={{
            title: 'Meal for diabete patient',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
        <Stack.Screen
          name="RegisterDiabete"
          component={RegisterDiabete}
          options={{
            title: 'Register diabete patient',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: colors.green},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeUser;
