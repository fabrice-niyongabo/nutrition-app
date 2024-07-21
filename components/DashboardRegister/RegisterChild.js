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

const RegisterChild = ({navigation}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [gotLoginDetails, setGotLoginDetails] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
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
    return () => (isSubscribed = false);
  });

  const handleRegister = () => {
    if (names.trim() == '') {
      setNames('');
      alert('Please provide name');
      return;
    }

    if (day.trim() != '') {
      let dayFormat = day.padStart(2, '0');
      let numberFormat = parseInt(day, 10);
      if (numberFormat > 0 && numberFormat <= 31 && dayFormat.length == 2) {
        setDay(dayFormat);
      } else {
        setDay('');
        alert('Invalid day of birth');
        return;
      }
    } else {
      setDay('');
      alert('Invalid day');
      return;
    }

    if (month.trim() != '') {
      let dayFormat = month.padStart(2, '0');
      let numberFormat = parseInt(month, 10);
      if (numberFormat > 0 && numberFormat <= 12 && dayFormat.length == 2) {
        setMonth(dayFormat);
      } else {
        setMonth('');
        alert('Invalid month');
        return;
      }
    } else {
      setMonth('');
      alert('Invalid month');
      return;
    }

    if (year.trim() != '') {
      let numberFormat = parseInt(year, 10);
      let today = new Date();
      let y = today.getFullYear();
      if (numberFormat < y - 5) {
        setYear('');
        alert(
          'Invalid year.\nThis app is designed for child with age less or equal to 5',
        );
        return;
      } else if (numberFormat > y) {
        setYear('');
        alert('Invalid Year');
        return;
      }
    } else {
      setYear('');
      alert('Invalid year');
      return;
    }

    setIsRegistering(true);
    Axios.post(backendUrl + 'registerChild', {
      names,
      day,
      month,
      year,
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

          navigation.navigate('Child');
        } else {
          if (res.data.type === 'warning') {
            alert(`${res.data.msg}.`);
          } else {
            alert(`${res.data.msg}. ${res.data.error}`);
          }
          setIsRegistering(false);
          setNames('');
          setDay('');
          setMonth('');
          setYear('');
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
              Registering child
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
            placeholder="Enter Child's name"
            accessibilityLabel="Child's names"
            style={styles.textField}
            onChangeText={text => {
              setNames(text);
            }}
            value={names}
          />
          <Text>Date of birth</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TextInput
              placeholder="Day"
              style={{
                ...styles.textField,
                textAlign: 'center',
                paddingHorizontal: 20,
              }}
              keyboardType="number-pad"
              value={day}
              onChangeText={day => {
                setDay(day);
              }}
            />
            <TextInput
              placeholder="Month"
              style={{
                ...styles.textField,
                textAlign: 'center',
                paddingHorizontal: 20,
              }}
              keyboardType="number-pad"
              value={month}
              onChangeText={month => {
                setMonth(month);
              }}
            />
            <TextInput
              placeholder="Year"
              style={{
                ...styles.textField,
                textAlign: 'center',
                paddingHorizontal: 20,
              }}
              keyboardType="number-pad"
              value={year}
              onChangeText={year => {
                setYear(year);
              }}
            />
          </View>
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

export default RegisterChild;