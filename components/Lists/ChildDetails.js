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

const ChildDetails = ({route, navigation}) => {
  const {child, userEmail} = route.params;
  const [mealList, setMealList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const calculateMonths = person => {
    const today = new Date();
    let months;
    months = (today.getFullYear() - person.year) * 12;
    months -= person.month;
    months += today.getMonth() + 1;
    return months <= 0 ? 0 : months;
  };

  useEffect(() => {
    let isSubscribed = true;

    if (userEmail != null) {
      Axios.post(backendUrl + 'childMealList', {userEmail, childId: child.id})
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
    return () => (isSubscribed = false);
  }, [child, mealList]);

  const handleDeleteMeal = id => {
    Axios.post(backendUrl + 'deleteChildMeal', {
      userEmail,
      id,
      childId: child.id,
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
          <View style={{width: '70%'}}>
            <Text style={{color: 'white', fontSize: 20}}>{child.names}</Text>
            <Text style={{color: colors.gray2}}>
              Born {child.day}/{child.month}/{child.year}
            </Text>
          </View>
          {calculateMonths(child) >= 6 && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChildMeal', {child});
              }}>
              <View style={{width: 40, alignItems: 'center'}}>
                <Icon name="plus" size={30} color="white" />
              </View>
            </TouchableOpacity>
          )}
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
                  Meals taken by {child.names} this month
                </Text>

                {calculateMonths(child) < 6 ? (
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
                      <Text style={{color: colors.brown}}>
                        {child.names} has {calculateMonths(child)} months. He
                        only need breastmilk as his main source of energy and
                        nutrients.
                      </Text>
                    </View>
                    <Text>
                      You will start giving him other foods when he is over six
                      months. This is not the right time to give him foods, we
                      will notify you when it is the right time.
                    </Text>
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
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexDirection: 'row',
                                }}>
                                <View style={{width: '85%'}}>
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
                                    handleDeleteMeal(data.id);
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
                            ))}
                          </>
                        ) : (
                          <Text>
                            Seems like {child.names} did not took any meal. Hit
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

export default ChildDetails;
