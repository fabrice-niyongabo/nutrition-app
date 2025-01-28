import {View, Text} from 'react-native';
import React from 'react';
import {INavigationProp} from '../../../../../types/navigation';

const Recipes = ({}: INavigationProp) => {
  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <Text>Recipes</Text>
    </View>
  );
};

export default Recipes;
