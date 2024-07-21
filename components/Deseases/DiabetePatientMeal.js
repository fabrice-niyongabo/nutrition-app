import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableNativeFeedback,
  Image,
  ToastAndroid,
} from 'react-native';
import colors from '../colors';
import Axios from 'axios';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendUrl, imageUrl} from '../Config';

const DiabetePatientMeal = ({route, navigation}) => {
  const {diabetePatient} = route.params;
  const [gotLoginDetails, setGotLoginDetails] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoadingFood, setIsLoadingFood] = useState(true);
  const [foods, setFoods] = useState({});
  const [meal, setMeal] = useState([]);
  const [isSavingMeal, setIsSavingMeal] = useState(false);
  const [gotdiabetePatientrenMealHistory, setGotdiabetePatientrenMealHistory] =
    useState(false);
  const [diabetePatientrenMealHistory, setdiabetePatientrenMealHistory] =
    useState([]);
  const [takeAnotherMeal, setTakeAnotherMeal] = useState(false);

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

    Axios.post(backendUrl + 'getAllMealHistory', {
      email: userEmail,
      personType: 'diabetePatient',
    })
      .then(res => {
        if (isSubscribed) {
          setdiabetePatientrenMealHistory(res.data);
          setGotdiabetePatientrenMealHistory(true);
          handlediabetePatientrensMealHistory();
        }
      })
      .catch(error => {
        console.log(error);
        // ToastAndroid.show(error.message, ToastAndroid.SHORT);
        // alert(error);
      });

    Axios.get(backendUrl + 'diabetePatientFood?type=' + diabetePatient.type)
      .then(res => {
        if (isSubscribed) {
          const dataFood = res.data;
          let filteredFoods = {};
          for (let i = 0; i < dataFood.length; i++) {
            let category = dataFood[i].food_category;
            if (!filteredFoods[category]) {
              filteredFoods[category] = [];
            }
            for (let j = 0; j < dataFood.length; j++) {
              if (dataFood[j].food_category == category) {
                filteredFoods[category].push({
                  id: dataFood[j].id,
                  name: dataFood[j].name,
                  image: dataFood[j].image,
                  category: category,
                });
              }
            }
          }

          setFoods(filteredFoods);
          setIsLoadingFood(false);
        }
      })
      .catch(error => {
        // alert(error);
        console.log(error);
        // ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });

    //cancel all subscriptions
    return () => (isSubscribed = false);
  }, [diabetePatientrenMealHistory]);

  const handlediabetePatientrensMealHistory = () => {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let today = mm + '/' + dd + '/' + yyyy;

    if (diabetePatientrenMealHistory.length > 0) {
      for (let i = 0; i < diabetePatientrenMealHistory.length; i++) {
        if (diabetePatientrenMealHistory[i].person_id == diabetePatient.id) {
          let valueStart =
            diabetePatientrenMealHistory[i].time_for_meal_taken + ':00:00';
          let valueStop = date.getHours() + ':00:00';
          var timeStart = new Date(today + ' ' + valueStart).getHours();
          var timeEnd = new Date(today + ' ' + valueStop).getHours();
          const hourDiff = timeEnd - timeStart;
          if (diabetePatientrenMealHistory[i].date_for_meal != today) {
            setTakeAnotherMeal(true);
          } else {
            if (hourDiff > 1) {
              setTakeAnotherMeal(true);
            } else {
              setTakeAnotherMeal(false);
            }
          }
          break;
        }
      }
    } else {
      setTakeAnotherMeal(true);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (!isLoadingFood) {
        selectMeal();
      }
    }
    return (isSubscribed = false);
  }, [isLoadingFood]);

  const getRandomFood = array => {
    let x = Math.floor(Math.random() * array.length);
    return array[x];
  };
  const selectMeal = () => {
    if (!isLoadingFood) {
      const categories = Object.keys(foods);
      let newMeal = [];
      if (categories.length > 0) {
        for (let i = 0; i < categories.length; i++) {
          let cat = categories[i];
          let food = getRandomFood(foods[cat]);
          newMeal.push(food);
        }
      }
      setMeal(newMeal);
    }
  };

  const replaceFood = (food, index) => {
    let updatedMeal = [...meal];
    updatedMeal[index] = getRandomFood(foods[food.category]);
    setMeal(updatedMeal);
  };

  const renderMeal = ({item, index}) => {
    return (
      <TouchableNativeFeedback
        key={index}
        onPress={() => {
          replaceFood(item, index);
        }}>
        {item.image != '' ? (
          <View
            style={{
              width: '48%',
              backgroundColor: 'rgb(236, 236, 236)',
              margin: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: imageUrl + item.image}}
              style={{width: 100, height: 90, borderRadius: 7}}
            />
            <Text style={{textTransform: 'capitalize', marginVertical: 5}}>
              {item.name}
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: '48%',
              backgroundColor: 'rgb(236, 236, 236)',
              margin: 5,
              padding: 10,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon2 name="fastfood" size={70} color={colors.gray} />
            <Text style={{textTransform: 'capitalize'}}>{item.name}</Text>
          </View>
        )}
      </TouchableNativeFeedback>
    );
  };
  const saveMeal = () => {
    setIsSavingMeal(true);
    let mealToSave = JSON.stringify(meal);
    Axios.post(backendUrl + 'savediabetePatientMeal', {
      userEmail,
      meal: mealToSave,
      id: diabetePatient.id,
    })
      .then(res => {
        navigation.navigate('DiabetePatientDetails', {
          userEmail,
          diabetePatient,
        });
      })
      .catch(error => {
        // alert(error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        setIsSavingMeal(false);
      });
  };
  return (
    <SafeAreaView>
      {isLoadingFood || gotdiabetePatientrenMealHistory == false ? (
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={colors.green} size={30} />
          <Text>Waiting for meals...</Text>
        </View>
      ) : (
        <>
          {takeAnotherMeal ? (
            <View style={{padding: 10}}>
              <View style={{marginBottom: 10}}>
                <Text>
                  Some foods are hard to find at the time you are using this
                  app. If so, click on that food so that the app can finds
                  another one which fits much ingredients as the previous one.
                </Text>
              </View>
              <FlatList
                data={meal}
                renderItem={renderMeal}
                numColumns={2}
                style={{width: '100%'}}
                extraData={meal}
              />
              <View
                style={{
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <TouchableNativeFeedback
                  onPress={() => {
                    selectMeal();
                  }}>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: colors.green,
                      borderRadius: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '48%',
                    }}>
                    <Icon name="exchange" size={20} color="white" />
                    <Text style={{color: 'white'}}>Change meal</Text>
                  </View>
                </TouchableNativeFeedback>
                {gotLoginDetails && userEmail != null ? (
                  <>
                    {isSavingMeal ? (
                      <View
                        style={{
                          padding: 10,
                          backgroundColor: colors.blue,
                          borderRadius: 6,
                          width: '48%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          opacity: 0.4,
                        }}>
                        <ActivityIndicator color="white" size={20} />
                        <Text style={{color: 'white'}}>Saving Meal</Text>
                      </View>
                    ) : (
                      <TouchableNativeFeedback onPress={() => saveMeal()}>
                        <View
                          style={{
                            padding: 10,
                            backgroundColor: colors.blue,
                            borderRadius: 6,
                            width: '48%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon name="check" size={20} color="white" />
                          <Text style={{color: 'white'}}>Select Meal</Text>
                        </View>
                      </TouchableNativeFeedback>
                    )}
                  </>
                ) : (
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: colors.blue,
                      borderRadius: 6,
                      width: '48%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0.4,
                    }}>
                    <Icon name="check" size={20} color="white" />
                    <Text style={{color: 'white'}}>Select Meal</Text>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                paddingHorizontal: 30,
              }}>
              <Icon name="frown-o" size={50} color={colors.brown} />
              <Text style={{color: colors.brown}}>
                Come back after an hour!
              </Text>
              <Text style={{color: colors.brown, textAlign: 'center'}}>
                You will be able see what you can prepare again for{' '}
                {diabetePatient.names} after an hour.
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default DiabetePatientMeal;
