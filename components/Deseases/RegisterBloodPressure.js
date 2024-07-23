import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import colors from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {backendUrl} from '../Config';
import Axios from 'axios';

const RegisterBloodPressure = ({navigation}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [gotLoginDetails, setGotLoginDetails] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [names, setNames] = useState('');

  useEffect(() => {
    let isSubscribed = true;

    AsyncStorage.getItem('user_email').then(value => {
      if (isSubscribed) {
        if (value != null) {
          setUserEmail(value);
        }
        setGotLoginDetails(true);
      }
    });

    //cancel all subscriptions
    return () => {
      isSubscribed = false;
    };
  });

  const handleRegister = () => {
    if (names.trim() == '') {
      setNames('');
      alert('Please provide name');
      return;
    }

    setIsRegistering(true);
    Axios.post(backendUrl + 'registerBloodPressure', {
      names,
      userEmail,
    })
      .then(res => {
        if (res.data.type === 'message') {
          // alert(res.data.msg);
          PushNotification.localNotification({
            channelId: 'notification-channel',
            title: 'Congratulations',
            message: `${names} has been registered to our app successfully.`,
            allowWhileIdle: true,
            vibrate: true,
          });
          setIsRegistering(false);

          navigation.navigate('BloodPressurePatients');
        } else {
          if (res.data.type === 'warning') {
            alert(`${res.data.msg}.`);
          } else {
            alert(`${res.data.msg}. ${res.data.error}`);
          }
          setIsRegistering(false);
          setNames('');
        }
      })
      .catch(error => {
        alert(error);
        setIsRegistering(false);
      });
  };

  const registerButton = () => {
    if (gotLoginDetails && userEmail != null) {
      if (isRegistering) {
        return (
          <View
            style={{
              backgroundColor: colors.green,
              padding: 15,
              borderRadius: 5,
              opacity: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <ActivityIndicator color="white" />
            <Text style={{textAlign: 'center', color: 'white'}}>
              Registering patient
            </Text>
          </View>
        );
      } else {
        return (
          <TouchableNativeFeedback onPress={handleRegister}>
            <View
              style={{
                backgroundColor: colors.green,
                padding: 15,
                borderRadius: 5,
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                REGISTER
              </Text>
            </View>
          </TouchableNativeFeedback>
        );
      }
    } else {
      return (
        <View
          style={{
            backgroundColor: colors.green,
            padding: 15,
            borderRadius: 5,
            opacity: 0.5,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>REGISTER</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.inputsContainer}>
          <TextInput
            placeholder="Enter patient's name"
            accessibilityLabel="Child's names"
            style={styles.textField}
            onChangeText={text => {
              setNames(text);
            }}
            value={names}
          />

          <View style={{marginTop: 15}}>{registerButton()}</View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {padding: 15},
  textField: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default RegisterBloodPressure;
