import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {INavigationProp} from '../../../../../types/navigation';
import {COLORS} from '../../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchFood, {IFoodItem} from './SearchFood';

const CustomRecipes = ({}: INavigationProp) => {
  const [showModal, setShowModal] = useState(true);
  const [selectedFoods, setSelectedFoods] = useState<IFoodItem[]>([]);
  return (
    <>
      <View style={{flex: 1, paddingTop: 10, gap: 15}}>
        <ScrollView style={{flexGrow: 1}}>
          <Text>here</Text>
        </ScrollView>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
          }}>
          <Pressable
            onPress={() => setShowModal(true)}
            style={{
              backgroundColor: COLORS.gray3,
              padding: 10,
              borderRadius: 100,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              flexDirection: 'row',
            }}>
            <Icon name="plus-circle" size={25} />
            <Text style={{fontWeight: 'bold'}}>Add food item</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: COLORS.darkGreen,
              padding: 10,
              borderRadius: 100,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              flexDirection: 'row',
            }}>
            <Icon name="content-save-check" size={30} color="white" />
            <Text style={{color: '#FFF'}}>Record custom meal</Text>
          </Pressable>
        </View>
      </View>

      <SearchFood showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default CustomRecipes;
