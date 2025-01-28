import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from './src/redux/reducers';
import BeforeLogin from './src/navigation/BeforeLogin';
import {AfterLogin} from './src/navigation/AfterLogin';

const App = () => {
  const {token} = useSelector((state: RootState) => state.userReducer);

  return (
    <SafeAreaView style={{flex: 1}}>
      {token.trim().length === 0 ? <BeforeLogin /> : <AfterLogin />}
    </SafeAreaView>
  );
};

export default App;
