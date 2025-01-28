import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../../constants/colors';
import {INavigationProp} from '../../../../types/navigation';
import {APP} from '../../../../constants/app';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/reducers';
import {fetchChildren} from '../../../../redux/actions/children';

const ChildList = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {children, isLoading} = useSelector(
    (state: RootState) => state.childrenReducer,
  );

  const handleDelete = (id: number) => {
    const token = '';
    Axios.post(
      APP.backendUrl + 'deleteChild',
      {userEmail: '', id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(res => {
        // console.log(res.data);
        ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
      })
      .catch(error => {
        // console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };

  useEffect(() => {
    dispatch(fetchChildren());
  }, []);

  return (
    <View style={{position: 'relative', height: '100%'}}>
      <ScrollView>
        <View style={{padding: 10}}>
          {isLoading && children.length === 0 && (
            <ActivityIndicator color={COLORS.green} size="large" />
          )}
          {children.length > 0 ? (
            children.map(child => {
              return (
                <TouchableNativeFeedback
                  key={child.id}
                  onPress={() => {
                    navigation.navigate('ChildDetails', {child});
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginVertical: 10,
                      backgroundColor: COLORS.gray3,
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <View style={{width: 55}}>
                      <Icon name="user-circle" size={50} color="#333" />
                    </View>
                    <View style={{flex: 1}}>
                      <Text>{child.names}</Text>
                      <Text style={{color: '#777'}}>
                        Born {child.day}/{child.month}/{child.year}
                      </Text>
                    </View>
                    {/* <TouchableNativeFeedback
                        onPress={() => {
                          handleDelete(child.id);
                        }}>
                        <View
                          style={{
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            width: 40,
                          }}>
                          <Icon name="trash" size={20} color={COLORS.green} />
                        </View>
                      </TouchableNativeFeedback> */}
                  </View>
                </TouchableNativeFeedback>
              );
            })
          ) : (
            <Text style={{color: COLORS.gray, fontSize: 20}}>
              No child registered yet
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ChildList;
