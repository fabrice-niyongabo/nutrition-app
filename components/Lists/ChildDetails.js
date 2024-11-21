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
  Image,
  Button,
  Pressable,
} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Axios from 'axios';
import {backendUrl} from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;

const ChildDetails = ({route, navigation}) => {
  const {child, userEmail} = route.params;
  const [token, setToken] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);

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

    AsyncStorage.getItem('token').then(value => {
      if (isSubscribed) {
        if (value != null) {
          setToken(value);
        }
      }
    });

    if (token != null) {
      Axios.get(backendUrl + '/childrenFood/recommend/' + child.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          setRecommendations(res.data.recommendation);
        })
        .catch(error => {
          ToastAndroid.show(returnError(error), ToastAndroid.SHORT);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    //cancel all subscriptions
    return () => {
      isSubscribed = false;
    };
  }, [token]);

  const handleRecordMeal = () => {
    if (recommendations.length === 0) {
      alert('No recommendations found');
      return;
    }
    if (!token) return;
    setIsLoadingSubmitting(true);
    // api call to record meal
    Axios.post(
      backendUrl + '/childrenFood/record',
      {
        child_id: child.id,
        meals: recommendations,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(res => {
        alert('Meal recorded successfully');
      })
      .catch(error => {
        ToastAndroid.show(returnError(error), ToastAndroid.SHORT);
      })
      .finally(() => {
        setIsLoadingSubmitting(false);
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
          <View style={{flex: 1}}>
            <Text style={{color: 'white', fontSize: 20}}>{child.names}</Text>
            <Text style={{color: colors.gray2}}>
              Born {child.day}/{child.month}/{child.year}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Prediction', {child});
            }}>
            <View style={{alignItems: 'center'}}>
              <Icon name="history" size={30} color="white" />
              <Text style={{color: 'white'}}>Health Prediction</Text>
            </View>
          </TouchableOpacity>
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
                  Foods recommended
                </Text>

                {isLoading ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 300,
                    }}>
                    <ActivityIndicator color={colors.green} size={30} />
                    <Text style={{color: 'black', marginTop: 10}}>
                      Looking for recommendations...
                    </Text>
                  </View>
                ) : (
                  <>
                    {recommendations.map((data, index) => (
                      <View
                        key={index}
                        style={{
                          backgroundColor: colors.gray2,
                          padding: 10,
                          borderRadius: 6,
                          marginVertical: 10,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10,
                          flexDirection: 'row',
                        }}>
                        <View style={{width: '85%'}}>
                          <View
                            style={{
                              alignItems: 'flex-start',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              gap: 10,
                            }}>
                            <View>
                              {data.image.trim() === '' ? (
                                <Icon
                                  name="picture-o"
                                  size={100}
                                  color={colors.blue}
                                />
                              ) : (
                                <Image
                                  source={{uri: data.image}}
                                  width={100}
                                  height={100}
                                  resizeMode="contain"
                                  style={{borderRadius: 10}}
                                />
                              )}
                            </View>
                            <View style={{flex: 1}}>
                              <Text style={{textTransform: 'capitalize'}}>
                                {data.name}
                              </Text>
                              {data.description && (
                                <Text>{data.description}</Text>
                              )}
                              <View style={{marginTop: 8}}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#666',
                                    fontWeight: 'bold',
                                  }}>
                                  Nutrients per serving:
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 8,
                                    marginTop: 4,
                                  }}>
                                  <Text style={{fontSize: 11}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      Calories:
                                    </Text>{' '}
                                    {data.calories}g
                                  </Text>
                                  <Text style={{fontSize: 11}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      Protein:
                                    </Text>{' '}
                                    {data.protein}g
                                  </Text>
                                  <Text style={{fontSize: 11}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      Carbs:
                                    </Text>{' '}
                                    {data.carbs}g
                                  </Text>
                                  <Text style={{fontSize: 11}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      Fats:
                                    </Text>{' '}
                                    {data.fats}g
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 8,
                                    marginTop: 2,
                                  }}>
                                  <Text style={{fontSize: 11}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      Calcium:
                                    </Text>{' '}
                                    {data.calcium}mg
                                  </Text>
                                  <Text style={{fontSize: 11}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      Iron:
                                    </Text>{' '}
                                    {data.iron}mg
                                  </Text>
                                  <Text style={{fontSize: 11}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      Folic Acid:
                                    </Text>{' '}
                                    {data.folic_acid}mcg
                                  </Text>
                                  <Text style={{fontSize: 11}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                      Vitamin D:
                                    </Text>{' '}
                                    {data.vitamin_d}mcg
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </>
                )}
              </View>
            </ScrollView>
            <View style={{padding: 10}}>
              <Pressable
                onPress={handleRecordMeal}
                loading={isLoadingSubmitting}
                disabled={isLoadingSubmitting}
                style={{
                  backgroundColor: colors.green,
                  padding: 10,
                  borderRadius: 6,
                }}>
                {isLoadingSubmitting ? (
                  <ActivityIndicator size={20} />
                ) : (
                  <Text style={{color: 'white'}}>Record Meal</Text>
                )}
              </Pressable>
            </View>
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
