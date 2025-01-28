import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableNativeFeedback,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import Axios from 'axios';
import {COLORS} from '../../../constants/colors';
import {INavigationProp} from '../../../types/navigation';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {errorHandler, toastMessage} from '../../../utils/helpers';
import {APP} from '../../../constants/app';

const EditProfile = ({}: INavigationProp) => {
  const {user, token} = useSelector((state: RootState) => state.userReducer);
  const [userNames, setUserNames] = useState(user?.names || '');
  const [isSaving, setIsSaving] = useState(false);

  const userNamesRef = useRef<TextInput | null>(null);

  const handleSubmit = () => {
    setIsSaving(true);
    if (userNames.trim() === '') {
      toastMessage('error', 'Please enter your names');
      setIsSaving(false);
      userNamesRef?.current && userNamesRef.current.focus();
    } else {
      Axios.put(
        APP.backendUrl + 'profile/names',
        {userNames},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then(res => {
          if (res.data.type === 'message') {
            setIsSaving(false);
            AsyncStorage.setItem('user_names', userNames);
            RNRestart.Restart();
          } else {
            toastMessage(
              'error',
              `${res.data.msg}. ${JSON.stringify(res.data.error)}`,
            );
            setIsSaving(false);
          }
        })
        .catch(error => {
          errorHandler(error);
          setIsSaving(false);
        });
    }
  };

  useEffect(() => {
    userNamesRef?.current && userNamesRef.current.focus();
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 15}}>
        <View
          style={{
            marginVertical: 15,
          }}>
          <TextInput
            placeholder="Enter your names"
            value={userNames}
            style={{borderBottomColor: COLORS.gray, borderBottomWidth: 2}}
            ref={userNamesRef}
            onChangeText={text => {
              setUserNames(text);
            }}
          />
        </View>

        {isSaving ? (
          <View
            style={{
              backgroundColor: COLORS.green,
              borderRadius: 50,
              paddingVertical: 15,
              marginVertical: 30,
              opacity: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <ActivityIndicator color="white" />
            <Text style={{color: 'white'}}> Updating ...</Text>
          </View>
        ) : (
          <TouchableNativeFeedback onPress={handleSubmit}>
            <View
              style={{
                backgroundColor: COLORS.green,
                borderRadius: 50,
                paddingVertical: 15,
                marginTop: 30,
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>Update</Text>
            </View>
          </TouchableNativeFeedback>
        )}
      </View>
    </SafeAreaView>
  );
};
export default EditProfile;
