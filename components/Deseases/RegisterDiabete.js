import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import colors from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendUrl} from '../Config';
import Axios from 'axios';
import PushNotification from 'react-native-push-notification';
const {width} = Dimensions.get('window');
const RegisterDieabete = ({navigation}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [gotLoginDetails, setGotLoginDetails] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [diabeteType, setdiabeteType] = useState('');
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
    if (diabeteType.trim() != '') {
      let dayFormat = diabeteType.padStart(2, '0');
      let numberFormat = parseInt(diabeteType, 10);
      if (numberFormat > 0 && numberFormat <= 2 && dayFormat.length == 2) {
        setdiabeteType(dayFormat);
      } else {
        setdiabeteType('');
        alert('Invalid diabete type');
        return;
      }
    } else {
      setdiabeteType('');
      alert('Invalid diabete type');
      return;
    }

    setIsRegistering(true);
    Axios.post(backendUrl + 'registerDiabete', {
      names,
      userEmail,
      diabeteType,
    })
      .then(res => {
        if (res.data.type === 'message') {
          // alert(res.data.msg);
          PushNotification.localNotification({
            channelId: 'notification-channel',
            title: 'Meal reminder!',
            message: `Its time to take meal!`,
            bigText: `${names} has been registerd to our app successfully`,
            allowWhileIdle: true,
            vibrate: true,
          });
          setIsRegistering(false);

          navigation.navigate('DiabetePatients');
        } else {
          if (res.data.type === 'warning') {
            alert(`${res.data.msg}.`);
          } else {
            alert(`${res.data.msg}. ${JSON.stringify(res.data.error)}`);
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
        <Image
          source={require('../../assets/diabete-info.jpg')}
          style={{resizeMode: 'contain', width}}
        />
        <View style={styles.inputsContainer}>
          <TextInput
            placeholder="Enter Patient's name"
            accessibilityLabel="Patient's names"
            style={styles.textField}
            onChangeText={text => {
              setNames(text);
            }}
            value={names}
          />
          <TextInput
            placeholder="Diabete type Ex: 1"
            accessibilityLabel="Diabete type"
            style={styles.textField}
            keyboardType="number-pad"
            onChangeText={text => setdiabeteType(text)}
            value={diabeteType}
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

export default RegisterDieabete;
