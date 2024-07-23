import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import PushNotification from 'react-native-push-notification';
import {backendUrl} from '../Config';

const width = Dimensions.get('window').width;

const Deseases = ({navigation}) => {
  const [diabete, setdiabete] = useState([]);
  const [diabeteMealHistory, setdiabeteMealHistory] = useState([]);
  const [bloodPressure, setbloodPressure] = useState([]);
  const [bloodPressureMealHistory, setbloodPressureMealHistory] = useState([]);
  const [isLoadingbloodPressure, setIsLoadingbloodPressure] = useState(true);
  const [isLoadingdiabete, setIsLoadingdiabete] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [isShowingNotification, setIsShowingNotification] = useState(false);
  const today = new Date();

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'notification-channel',
      channelName: 'app channel',
    });
  };

  useEffect(() => {
    createChannels();
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    AsyncStorage.getItem('user_email').then(value => {
      if (isSubscribed) {
        if (value != null) {
          setUserEmail(value);
        }
      }
    });

    if (userEmail != null) {
      Axios.get(backendUrl + 'diabetePatients?userEmail=' + userEmail)
        .then(res => {
          if (isSubscribed) {
            setIsLoadingdiabete(false);
            setdiabete(res.data);
          }
        })
        .catch(error => {
          // ToastAndroid.show(error.message, ToastAndroid.SHORT);
          console.log(error);
          // alert(error);
        });

      Axios.post(backendUrl + 'getAllMealHistory', {
        email: userEmail,
        personType: 'bloodPressurePatient',
      })
        .then(res => {
          if (isSubscribed) {
            setbloodPressureMealHistory(res.data);
            handlebloodPressuresMealHistory();
          }
        })
        .catch(error => {
          // ToastAndroid.show(error.message, ToastAndroid.SHORT);
          console.log(error);
          // alert(error);
        });

      Axios.post(backendUrl + 'getAllMealHistory', {
        email: userEmail,
        personType: 'diabetePatient',
      })
        .then(res => {
          if (isSubscribed) {
            setdiabeteMealHistory(res.data);
            handlediabeteMealHistory();
          }
        })
        .catch(error => {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
          // console.log(error);
          // alert(error);
        });

      Axios.get(backendUrl + 'bloodPressurePatients?userEmail=' + userEmail)
        .then(res => {
          if (isSubscribed) {
            setIsLoadingbloodPressure(false);
            setbloodPressure(res.data);
          }
        })
        .catch(error => {
          // console.log(error);
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        });
    }

    //cancel all subscriptions
    return () => {
      isSubscribed = false;
    };
  }, [userEmail, diabete]);

  const handlebloodPressuresMealHistory = () => {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let today = mm + '/' + dd + '/' + yyyy;

    if (bloodPressureMealHistory.length > 0) {
      for (let i = 0; i < bloodPressureMealHistory.length; i++) {
        let valueStart =
          bloodPressureMealHistory[i].time_for_meal_taken + ':00:00';
        let valueStop = date.getHours() + ':00:00';
        var timeStart = new Date(today + ' ' + valueStart).getHours();
        var timeEnd = new Date(today + ' ' + valueStop).getHours();
        const hourDiff = timeEnd - timeStart;

        if (bloodPressureMealHistory[i].date_for_meal != today) {
          //send notification
          if (
            !isShowingNotification &&
            bloodPressureMealHistory[i].shown == false
          ) {
            showChildNotifications(
              bloodPressureMealHistory[i].person_id,
              bloodPressureMealHistory[i].date_for_meal,
            );
          }
        } else {
          if (
            (hourDiff > 1 && bloodPressureMealHistory[i].shown == 'false') ||
            (timeStart > timeEnd &&
              bloodPressureMealHistory[i].shown == 'false')
          ) {
            //show notification
            showChildNotifications(bloodPressureMealHistory[i].person_id);
          }
        }
      }
    }
  };

  const handlediabeteMealHistory = () => {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let today = mm + '/' + dd + '/' + yyyy;

    if (diabeteMealHistory.length > 0) {
      for (let i = 0; i < diabeteMealHistory.length; i++) {
        let valueStart = diabeteMealHistory[i].time_for_meal_taken + ':00:00';
        let valueStop = date.getHours() + ':00:00';
        var timeStart = new Date(today + ' ' + valueStart).getHours();
        var timeEnd = new Date(today + ' ' + valueStop).getHours();
        const hourDiff = timeEnd - timeStart;

        if (diabeteMealHistory[i].date_for_meal != today) {
          //send notification
          if (
            !isShowingNotification &&
            diabeteMealHistory[i].shown == 'false'
          ) {
            showWomanNotifications(
              diabeteMealHistory[i].person_id,
              diabeteMealHistory[i].date_for_meal,
            );
            break;
          }
        } else {
          if (
            (hourDiff > 1 && diabeteMealHistory[i].shown == 'false') ||
            (timeStart > timeEnd && diabeteMealHistory[i].shown == 'false')
          ) {
            //show notification
            if (!isShowingNotification) {
              showWomanNotifications(diabeteMealHistory[i].person_id);
              break;
            }
          }
        }
      }
    }
  };

  const showChildNotifications = (childId, lastDate = '') => {
    setIsShowingNotification(true);
    let names;
    for (let i = 0; i < bloodPressure.length; i++) {
      if (bloodPressure[i].id == childId) {
        names = bloodPressure[i].names;
        break;
      }
    }

    if (lastDate != '') {
      PushNotification.localNotification({
        channelId: 'notification-channel',
        title: 'Meal reminder!',
        message: `Its time to take meal!`,
        bigText: `It is been a long time for ${names} without taking health meal. Please come and see what you have to prepare.`,
        allowWhileIdle: true,
        vibrate: true,
      });
    } else {
      PushNotification.localNotification({
        channelId: 'notification-channel',
        title: `${names} is now ready to take meal!`,
        message: `${names} must be hungry! come and see what to prepare`,
        bigText: `The time for ${names} to take meal has come.`,
        allowWhileIdle: true,
        vibrate: true,
      });
    }

    Axios.post(backendUrl + 'updateNotificationShow', {
      email: userEmail,
      personType: 'child',
      personId: childId,
      names: names,
    })
      .then(() => {
        setIsShowingNotification(false);
      })
      .catch(error => {
        console.log(error);
        // ToastAndroid.show(error.message, ToastAndroid.SHORT);
        setIsShowingNotification(false);
      });
  };

  const showWomanNotifications = (childId, lastDate = '') => {
    setIsShowingNotification(true);
    let names;
    for (let i = 0; i < diabete.length; i++) {
      if (diabete[i].id == childId) {
        names = diabete[i].names;
        break;
      }
    }

    if (lastDate != '') {
      PushNotification.localNotification({
        channelId: 'notification-channel',
        title: 'Meal reminder!',
        message: `Its time to take meal!`,
        bigText: `It is been a long time for ${names} without taking health meal. Please come and see what you have to prepare.`,
        allowWhileIdle: true,
        vibrate: true,
      });
    } else {
      PushNotification.localNotification({
        channelId: 'notification-channel',
        title: `${names} is now ready to take meal!`,
        message: `${names} must be hungry! come and see what to prepare`,
        bigText: `The time for ${names} to take meal has come.`,
        allowWhileIdle: true,
        vibrate: true,
      });
    }

    Axios.post(backendUrl + 'updateNotificationShow', {
      email: userEmail,
      personType: 'woman',
      personId: childId,
      names: names,
    })
      .then(() => {
        setIsShowingNotification(false);
      })
      .catch(error => {
        // console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        setIsShowingNotification(false);
      });
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.green} />
      <ImageBackground
        source={require('../../assets/img/10.jpg')}
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}>
        <View
          style={{
            backgroundColor: 'rgba(51, 197, 112, 0.739)',
            flex: 1,
            position: 'relative',
          }}>
          <View style={{marginVertical: 30, paddingHorizontal: 25}}>
            <View
              style={{
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, color: colors.gray2}}>
                Bellow you can manage meals for patients of blood pressure and
                diabete.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 30,
              }}>
              <TouchableNativeFeedback
                onPress={() => {
                  navigation.navigate('DiabetePatients');
                }}>
                <View
                  style={{
                    height: 120,
                    backgroundColor: 'lightblue',
                    width: '48%',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {isLoadingdiabete ? (
                    <ActivityIndicator size={30} color={colors.blue} />
                  ) : (
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: 'bold',
                        fontSize: 30,
                        color: colors.blue,
                      }}>
                      {diabete.length}
                    </Text>
                  )}
                  <Text style={{color: colors.blue, fontSize: 18}}>
                    Diabete
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  navigation.navigate('BloodPressurePatients');
                }}>
                <View
                  style={{
                    height: 120,
                    backgroundColor: 'snow',
                    width: '48%',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {isLoadingbloodPressure ? (
                    <ActivityIndicator size={30} color={colors.brown} />
                  ) : (
                    <Text
                      style={{
                        color: colors.brown,
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginTop: 10,
                      }}>
                      {bloodPressure.length}
                    </Text>
                  )}
                  <Text style={{color: colors.brown}}>Blood pressure</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={{marginTop: 25}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RegisterBloodPressure');
                }}>
                <View
                  style={{
                    backgroundColor: 'snow',
                    padding: 15,
                    borderRadius: 7,
                  }}>
                  <Text style={{textAlign: 'center', color: colors.brown}}>
                    Register blood pressure patient
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => navigation.navigate('RegisterDiabete')}>
                <View
                  style={{
                    backgroundColor: 'lightblue',
                    borderRadius: 7,
                    padding: 15,
                  }}>
                  <Text style={{textAlign: 'center', color: colors.blue}}>
                    Register diabete patient
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* bottom tab */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: width,
              backgroundColor: colors.green,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="home" size={20} color="white" />
                <Text style={{color: 'white', fontSize: 10}}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notifications');
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="bell" size={20} color="white" />
                <Text style={{color: 'white', fontSize: 10}}>
                  Notifications
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="user" size={20} color="white" />
                <Text style={{color: 'white', fontSize: 10}}>Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Deseases;
