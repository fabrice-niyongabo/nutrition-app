import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../../constants/colors';
import {INavigationProp} from '../../../../types/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/reducers';
import {fetchWomen} from '../../../../redux/actions/women';

const WomenList = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {isLoading, women} = useSelector(
    (state: RootState) => state.womenReducer,
  );

  useEffect(() => {
    dispatch(fetchWomen());
  }, []);

  return (
    <View style={{position: 'relative', height: '100%'}}>
      <ScrollView>
        <View style={{padding: 10, marginBottom: 100}}>
          {isLoading && women.length === 0 && (
            <ActivityIndicator color={COLORS.green} size="large" />
          )}
          {women.length > 0 ? (
            women.map(woman => {
              return (
                <TouchableNativeFeedback
                  key={woman.id}
                  onPress={() => {
                    navigation.navigate('WomanDetails', {woman});
                  }}>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginVertical: 10,
                      backgroundColor: COLORS.gray3,
                      padding: 10,
                      borderRadius: 10,
                      gap: 10,
                    }}>
                    <View style={{width: 55}}>
                      <Icon name="user-circle" size={50} color="#333" />
                    </View>
                    <View style={{flex: 1}}>
                      <Text>{woman.names}</Text>
                      <Text style={{color: '#777'}}>
                        Born {woman.day}/{woman.month}/{woman.year}
                      </Text>
                      <Text style={{color: '#777'}}>
                        Pregnancy month: {woman.pregnancy_month}
                      </Text>
                      <Text style={{color: '#777'}}>
                        Height: {woman.height} cm
                      </Text>
                      <Text style={{color: '#777'}}>
                        Weight: {woman.weight} Kg
                      </Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              );
            })
          ) : (
            <Text style={{color: COLORS.gray, fontSize: 20}}>
              No woman registered yet
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default WomenList;
