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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {COLORS} from '../../../constants/colors';
import {INavigationProp} from '../../../types/navigation';
import {errorHandler, toastMessage} from '../../../utils/helpers';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {APP} from '../../../constants/app';

const RegisterWoman = ({navigation}: INavigationProp) => {
  const {user, token} = useSelector((state: RootState) => state.userReducer);
  const [isRegistering, setIsRegistering] = useState(false);
  const [gotLoginDetails, setGotLoginDetails] = useState(false);
  const [pregnancyMonth, setPregnancyMonth] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [names, setNames] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleRegister = () => {
    if (names.trim() == '') {
      setNames('');
      toastMessage('error', 'Please provide name');
      return;
    }
    if (pregnancyMonth.trim() != '') {
      let dayFormat = pregnancyMonth.padStart(2, '0');
      let numberFormat = parseInt(pregnancyMonth, 10);
      if (numberFormat > 0 && numberFormat <= 9 && dayFormat.length == 2) {
        setPregnancyMonth(dayFormat);
      } else {
        setPregnancyMonth('');
        toastMessage('error', 'Invalid pregnancy month');
        return;
      }
    } else {
      setPregnancyMonth('');
      toastMessage('error', 'Invalid pregnancy month');
      return;
    }

    if (day.trim() != '') {
      let dayFormat = day.padStart(2, '0');
      let numberFormat = parseInt(day, 10);
      if (numberFormat > 0 && numberFormat <= 31 && dayFormat.length == 2) {
        setDay(dayFormat);
      } else {
        setDay('');
        toastMessage('error', 'Invalid day of birth');
        return;
      }
    } else {
      setDay('');
      toastMessage('error', 'Invalid day');
      return;
    }

    if (month.trim() != '') {
      let dayFormat = month.padStart(2, '0');
      let numberFormat = parseInt(month, 10);
      if (numberFormat > 0 && numberFormat <= 12 && dayFormat.length == 2) {
        setMonth(dayFormat);
      } else {
        setMonth('');
        toastMessage('error', 'Invalid month');
        return;
      }
    } else {
      setMonth('');
      toastMessage('error', 'Invalid month');
      return;
    }

    if (year.trim() != '') {
      let numberFormat = parseInt(year, 10);
      let today = new Date();
      let y = today.getFullYear();
      if (numberFormat < y - 40) {
        setYear('');
        toastMessage(
          'error',
          'Invalid year.\nValid year starts from at least ' + (y - 40),
        );
        return;
      } else if (numberFormat > y - 15) {
        setYear('');
        toastMessage(
          'error',
          'Invalid Year. Valid year must be in range of ' +
            (y - 40) +
            '-' +
            (y - 15),
        );
        return;
      }
    } else {
      setYear('');
      toastMessage('error', 'Invalid year');
      return;
    }

    if (height.trim() != '') {
      setHeight(height);
    } else {
      setHeight('');
      toastMessage('error', 'Invalid height');
      return;
    }

    if (weight.trim() != '') {
      setWeight(weight);
    } else {
      setWeight('');
      toastMessage('error', 'Invalid weight');
      return;
    }

    setIsRegistering(true);
    Axios.post(
      APP.backendUrl + '/women',
      {
        names,
        day,
        month,
        year,
        userEmail: user?.email,
        pregnancyMonth,
        height,
        weight,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(res => {
        setIsRegistering(false);

        navigation.navigate('Women');
      })
      .catch(error => {
        errorHandler(error);
      })
      .finally(() => {
        setIsRegistering(false);
      });
  };

  const registerButton = () => {
    if (isRegistering) {
      return (
        <View
          style={{
            backgroundColor: COLORS.green,
            padding: 15,
            borderRadius: 5,
            opacity: 0.7,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator color="white" />
          <Text style={{textAlign: 'center', color: 'white'}}>
            Registering woman
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableNativeFeedback onPress={handleRegister}>
          <View
            style={{
              backgroundColor: COLORS.green,
              padding: 15,
              borderRadius: 5,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>REGISTER</Text>
          </View>
        </TouchableNativeFeedback>
      );
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.inputsContainer}>
          <TextInput
            placeholder="Enter Woman's name"
            accessibilityLabel="Woman's names"
            style={styles.textField}
            onChangeText={text => {
              setNames(text);
            }}
            value={names}
          />
          <TextInput
            placeholder="Woman's pregnancy month. Ex: 1"
            accessibilityLabel="Woman's Pregnancy month"
            style={styles.textField}
            keyboardType="number-pad"
            onChangeText={text => setPregnancyMonth(text)}
            value={pregnancyMonth}
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
          <TextInput
            placeholder="Enter Woman's height in cm"
            accessibilityLabel="Woman's height"
            style={styles.textField}
            keyboardType="number-pad"
            onChangeText={text => {
              setHeight(text);
            }}
            value={height}
          />
          <TextInput
            placeholder="Enter Woman's weight in kg"
            accessibilityLabel="Woman's weight"
            style={styles.textField}
            keyboardType="number-pad"
            onChangeText={text => {
              setWeight(text);
            }}
            value={weight}
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
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default RegisterWoman;
