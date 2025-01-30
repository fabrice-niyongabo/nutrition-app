import {Modal, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

interface IProps {
  open: boolean;
}
const FullPageLoader = (props: IProps) => {
  return (
    <Modal statusBarTranslucent transparent visible={props.open}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={50} color={COLORS.darkGreen} />
      </View>
    </Modal>
  );
};

export default FullPageLoader;
