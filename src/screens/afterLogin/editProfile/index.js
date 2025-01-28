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

const EditProfile = ({route, navigation}) => {
  const {names, userEmail} = route.params;
  const [userNames, setUserNames] = useState(names);
  const [isSaving, setIsSaving] = useState(false);

  const userNamesRef = useRef(null);

  const handleSubmit = () => {
    setIsSaving(true);
    if (userNames.trim() === '') {
      alert('Please enter your names');
      setIsSaving(false);
      userNamesRef.current.focus();
    } else if (userEmail == '' || userEmail == null) {
      alert('Invalid user email');
    } else {
      Axios.post(backendUrl + 'updateNames', {userEmail, userNames})
        .then(res => {
          if (res.data.type === 'message') {
            setIsSaving(false);
            AsyncStorage.setItem('user_names', userNames);
            RNRestart.Restart();
          } else {
            alert(`${res.data.msg}. ${JSON.stringify(res.data.error)}`);
            setIsSaving(false);
          }
        })
        .catch(error => {
          alert(error);
          setIsSaving(false);
        });
    }
  };

  useEffect(() => {
    userNamesRef.current.focus();
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
