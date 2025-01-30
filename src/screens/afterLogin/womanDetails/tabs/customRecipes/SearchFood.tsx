import {
  View,
  Text,
  Modal,
  Dimensions,
  Pressable,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../../../constants/colors';
import {errorHandler} from '../../../../../utils/helpers';
import axios from 'axios';
import {APP} from '../../../../../constants/app';
import {IFoodItem} from '../../../../../types/food';

const {width, height} = Dimensions.get('window');
interface IProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  handleAddFood: (val: IFoodItem) => void;
}
const SearchFood = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<IFoodItem[]>([]);

  const handleSearchFood = async () => {
    if (!keyword.trim().length) return;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP.foodAPIAplicationID}&app_key=${APP.foodAPIApplicationKey}&ingr=${keyword}`,
      );
      setSearchResults(res.data.parsed);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal transparent visible={props.showModal} statusBarTranslucent>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: '#FFF',
            width,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            minHeight: height / 1.2,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              gap: 10,
              borderBottomColor: COLORS.gray,
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, flex: 1}}>
              Search for food item that you have eaten
            </Text>
            <Pressable
              style={{
                backgroundColor: COLORS.gray,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}
              onPress={() => props.setShowModal(false)}>
              <Icon name="close" size={30} />
            </Pressable>
          </View>
          <View style={{marginTop: 20}}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 10,
              }}>
              <TextInput
                value={keyword}
                onChangeText={text => setKeyword(text)}
                placeholderTextColor={COLORS.gray}
                placeholder="Search for food item"
                style={{
                  borderColor: COLORS.gray,
                  borderWidth: 1,
                  color: '#000',
                  borderRadius: 10,
                  padding: 10,
                  flex: 1,
                }}
              />
              <Pressable
                onPress={handleSearchFood}
                disabled={isLoading}
                style={{
                  backgroundColor: COLORS.green,
                  padding: 10,
                  borderRadius: 10,
                }}>
                {!isLoading ? (
                  <Icon name="magnify" size={25} color="#FFF" />
                ) : (
                  <ActivityIndicator color="#FFF" />
                )}
              </Pressable>
            </View>
            <ScrollView style={{flexGrow: 1, paddingTop: 10}}>
              <Text>Search Results: {searchResults.length}</Text>
              {isLoading && (
                <ActivityIndicator size={35} color={COLORS.darkGreen} />
              )}
              <View style={{gap: 15, marginTop: 10}}>
                {searchResults.map(item => (
                  <Pressable
                    onPress={() => {
                      setKeyword('');
                      setSearchResults([]);
                      props.handleAddFood(item);
                    }}
                    key={item.food.foodId}
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      gap: 20,
                      backgroundColor: COLORS.gray,
                      padding: 10,
                      borderRadius: 5,
                    }}>
                    <Image
                      width={50}
                      height={50}
                      source={{uri: item.food.image}}
                      style={{borderRadius: 10}}
                    />
                    <View style={{flex: 1}}>
                      <Text>{item.food.label}</Text>
                      <Text>Category: {item.food.category}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SearchFood;
