import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {INavigationPropWithRouteRequired} from '../../../types/navigation';
import {IWoman} from '../../../types/women';
import {COLORS} from '../../../constants/colors';
import CustomBottomTabs from '../../../components/CustomBottomTabs';
import Tabs from './tabs';

const WomanDetails = ({
  route,
  navigation,
}: INavigationPropWithRouteRequired) => {
  const {woman} = route.params as {woman: IWoman};
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);
  const [pregnancyMonth, setPregnancyMonth] = useState(0);

  const calculateMonths = (person: IWoman) => {
    const today = new Date();
    let months;
    months = (today.getFullYear() - person.reg_year) * 12;
    months -= person.reg_month;
    months += today.getMonth() + 1;
    return months <= 0 ? 0 : months;
  };

  useEffect(() => {
    const month = woman.pregnancy_month + calculateMonths(woman);
    setPregnancyMonth(month);
  }, [woman]);

  //   const handleRecordMeal = () => {
  //     if (recommendations.length === 0) {
  //       toastMessage('error', 'No recommendations found');
  //       return;
  //     }
  //     if (!token) return;
  //     setIsLoadingSubmitting(true);
  //     // api call to record meal
  //     Axios.post(
  //       APP.backendUrl + '/womenFood/record',
  //       {
  //         woman_id: woman.id,
  //         meals: recommendations,
  //         pregnancy_month: woman.pregnancy_month,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     )
  //       .then(res => {
  //         toastMessage('error', 'Meal recorded successfully');
  //       })
  //       .catch(error => {
  //         errorHandler(error);
  //       })
  //       .finally(() => {
  //         setIsLoadingSubmitting(false);
  //       });
  //   };

  return (
    <SafeAreaView>
      <View style={{position: 'relative', height: '100%'}}>
        <View
          style={{
            backgroundColor: COLORS.green,
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
            <Text style={{color: 'white', fontSize: 20}} numberOfLines={1}>
              {woman.names}
            </Text>
            <Text style={{color: COLORS.gray2}}>
              {pregnancyMonth} months of 9 months to go!
            </Text>
          </View>
          <View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}></View>
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
            <View
              style={{
                marginTop: 10,
                backgroundColor: 'rgba(255,255,255,0.5)',
                padding: 10,
                flex: 1,
              }}>
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
                        color={COLORS.brown}
                      />
                    </View>
                    <Text style={{color: COLORS.brown, width: '100%'}}>
                      Pregnancy months exceeded.
                    </Text>
                  </View>
                </>
              ) : (
                <Tabs
                  navigation={navigation}
                  woman={woman}
                  pregnancyMonth={pregnancyMonth}
                />
              )}
            </View>
          </View>
        </View>

        {/* bottom tab */}
        <CustomBottomTabs navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default WomanDetails;
