import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Axios from 'axios';
import {backendUrl} from '../Config';
const width = Dimensions.get('window').width;

const WomanDetails = ({route, navigation}) => {
  const {woman, userEmail} = route.params;
  const [mealList, setMealList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pregnancyMonth, setPregnancyMonth] = useState(0);

  const calculateMonths = person => {
    const today = new Date();
    let months;
    months = (today.getFullYear() - person.reg_year) * 12;
    months -= person.reg_month;
    months += today.getMonth() + 1;
    return months <= 0 ? 0 : months;
  };

  useEffect(() => {
    let isSubscribed = true;
    const month = parseInt(woman.pregnancy_month, 10) + calculateMonths(woman);
    setPregnancyMonth(month);

    if (userEmail != null) {
      Axios.post(backendUrl + 'womanMealList', {userEmail, womanId: woman.id})
        .then(res => {
          if (isSubscribed) {
            setIsLoading(false);
            let rs = [];
            for (let i = 0; i < res.data.length; i++) {
              let data = res.data[i];
              data.meal = JSON.parse(data.meal);
              rs.push(data);
            }
            setMealList(rs);
            setIsLoading(false);
          }
        })
        .catch(error => {
          // console.log(error);
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
          // alert(error);
        });
    }

    //cancel all subscriptions
    return () => {
      isSubscribed = false;
    };
  }, [woman, mealList]);

  const handleDelete = id => {
    Axios.post(backendUrl + 'deleteWomanMeal', {
      userEmail,
      id,
      womanId: woman.id,
    })
      .then(res => {
        // console.log(res.data);
        ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
      })
      .catch(err => {
        // console.log(err);
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  return (
    <SafeAreaView>
      <View style={{position: 'relative', height: '100%'}}>
        <View
          style={{
            backgroundColor: colors.green,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingBottom: 50,
          }}>
          <View style={{width: 50}}>
            <Icon name="user-circle" size={40} color="white" />
          </View>
          <View style={{width: '60%'}}>
            <Text style={{color: 'white', fontSize: 20}} numberLines="1">
              {woman.names}
            </Text>
            <Text style={{color: colors.gray2}}>
              {pregnancyMonth} months of 9 months to go!
            </Text>
          </View>
          <View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {pregnancyMonth != 0 && pregnancyMonth <= 9 && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('WomanMeal', {woman, pregnancyMonth});
                  }}>
                  <View style={{paddingHorizontal: 10}}>
                    <Icon name="plus" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RemoveFoods', {woman});
                }}>
                <View style={{paddingHorizontal: 10}}>
                  <Icon name="ellipsis-v" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            position: 'relative',
            marginTop: -20,
            backgroundColor: 'white',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            height: '100%',
          }}>
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 150,
              height: '100%',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}>
            <ScrollView>
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  padding: 10,
                  height: '100%',
                }}>
                <Text
                  style={{fontSize: 20, color: colors.blue, marginBottom: 10}}>
                  Meals taken by {woman.names}
                </Text>

                {(pregnancyMonth == 0 || pregnancyMonth > 9) && !isLoading ? (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 10,
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{paddingRight: 10}}>
                        <Icon
                          name="exclamation-triangle"
                          size={30}
                          color={colors.brown}
                        />
                      </View>
                      <Text style={{color: colors.brown, width: '100%'}}>
                        Pregnancy months exceeded.
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    {isLoading ? (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 300,
                        }}>
                        <ActivityIndicator color={colors.green} size={30} />
                        <Text style={{color: 'black', marginTop: 10}}>
                          Looking for meal...
                        </Text>
                      </View>
                    ) : (
                      <>
                        {mealList.length > 0 ? (
                          <>
                            {mealList.map((data, index) => (
                              <View
                                key={index}
                                style={{
                                  backgroundColor: colors.gray2,
                                  padding: 10,
                                  borderRadius: 6,
                                  marginVertical: 10,
                                }}>
                                <Text>
                                  {data.pregnancy_month} Pregnancy month
                                </Text>
                                <View
                                  style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                  }}>
                                  <View style={{width: '90%'}}>
                                    <View
                                      style={{
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                      }}>
                                      {data.meal.map((food, index) =>
                                        index == 0 ? (
                                          <Text
                                            key={index}
                                            style={{color: colors.blue}}>
                                            {food.name}{' '}
                                          </Text>
                                        ) : (
                                          <Text
                                            key={index}
                                            style={{color: colors.blue}}>
                                            - {food.name}{' '}
                                          </Text>
                                        ),
                                      )}
                                    </View>
                                    <Text style={{color: '#777'}}>
                                      {data.date}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    onPress={() => {
                                      handleDelete(data.id);
                                    }}>
                                    <View>
                                      <Icon
                                        name="trash"
                                        size={30}
                                        color={colors.green}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            ))}
                          </>
                        ) : (
                          <Text>
                            Seems like {woman.names} did not took any meal. Hit
                            the plus icon at the top and start feeding him.
                          </Text>
                        )}
                      </>
                    )}
                  </>
                )}
              </View>
            </ScrollView>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Dashboard');
            }}>
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
              <Text style={{color: 'white', fontSize: 10}}>Notifications</Text>
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
    </SafeAreaView>
  );
};

export default WomanDetails;
