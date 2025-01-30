import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {INavigationProp} from '../../../../../types/navigation';
import {COLORS} from '../../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchFood from './SearchFood';
import {IFoodItem} from '../../../../../types/food';
import {errorHandler, toastMessage} from '../../../../../utils/helpers';
import FullPageLoader from '../../../../../components/FullPageLoader';
import axios from 'axios';
import {APP} from '../../../../../constants/app';
import {IWoman} from '../../../../../types/women';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../redux/reducers';
import DatePicker from 'react-native-date-picker';

interface IProps {
  woman: IWoman;
  pregnancyMonth: number;
}

const CustomRecipes = (props: IProps) => {
  const {token} = useSelector((state: RootState) => state.userReducer);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedFoods, setSelectedFoods] = useState<IFoodItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(true);

  const handleAddFood = (foodItem: IFoodItem) => {
    const exists = selectedFoods.find(
      item => item.food.foodId === foodItem.food.foodId,
    );
    if (!exists) {
      setSelectedFoods([...selectedFoods, foodItem]);
      setShowModal(false);
    } else {
      toastMessage('warn', 'Food item already exists!.');
    }
  };

  const handleSaveFood = async () => {
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        APP.backendUrl + '/women/mealhistory',
        {
          woman_id: props.woman.id,
          pregnancy_month: props.pregnancyMonth,
          consumed_at: date.toLocaleDateString(),
          meal: selectedFoods.map(item => ({
            carbs: item.food.nutrients.CHOCDF,
            fats: item.food.nutrients.FAT,
            proteins: item.food.nutrients.PROCNT,
            sugars: item.food.nutrients.ENERC_KCAL,
            food_category: item.food.category,
            food_image: item.food.image,
            food_name: item.food.label,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toastMessage('success', res.data.message);
      setSelectedFoods([]);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <View style={{flex: 1, paddingTop: 10, gap: 15}}>
        <DatePicker
          modal
          maximumDate={new Date()}
          open={openDatePicker}
          date={date}
          onConfirm={date => {
            setDate(date);
            setOpenDatePicker(false);
            handleSaveFood();
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
        />
        <ScrollView style={{flexGrow: 1}}>
          {selectedFoods.map(item => (
            <View
              key={item.food.foodId}
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                flexDirection: 'row',
                borderBottomColor: COLORS.gray1,
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}>
              <Image
                width={50}
                height={50}
                source={{uri: item.food.image}}
                style={{borderRadius: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={{color: COLORS.darkGreen}}>{item.food.label}</Text>
                <Text>{item.food.category}</Text>
              </View>
            </View>
          ))}
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
            disabled={selectedFoods.length == 0}
            onPress={() => setOpenDatePicker(true)}
            style={{
              backgroundColor: COLORS.darkGreen,
              padding: 10,
              borderRadius: 100,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              flexDirection: 'row',
              opacity: selectedFoods.length > 0 ? 1 : 0.5,
            }}>
            <Icon name="content-save-check" size={30} color="white" />
            <Text style={{color: '#FFF'}}>Record custom meal</Text>
          </Pressable>
        </View>
      </View>

      <SearchFood
        showModal={showModal}
        setShowModal={setShowModal}
        handleAddFood={handleAddFood}
      />
      <FullPageLoader open={isSubmitting} />
    </>
  );
};

export default CustomRecipes;
