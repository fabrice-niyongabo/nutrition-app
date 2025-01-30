import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {INavigationProp} from '../../../../../types/navigation';
import {errorHandler, toastMessage} from '../../../../../utils/helpers';
import axios from 'axios';
import {APP} from '../../../../../constants/app';
import {IRecipeItem} from '../../../../../types/food';
import {COLORS} from '../../../../../constants/colors';
import {IWoman} from '../../../../../types/women';
import {RootState} from '../../../../../redux/reducers';
import {useSelector} from 'react-redux';
import FullPageLoader from '../../../../../components/FullPageLoader';

interface IProps {
  woman: IWoman;
  pregnancyMonth: number;
}

const keywords = [
  'nutrients',
  'diets',
  'balanced',
  'fat free',
  'sugar free',
  'dairy free',
  'gluten free',
  'wheat free',
];

const Recipes = (props: IProps) => {
  const {token} = useSelector((state: RootState) => state.userReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setIsRefreshing] = useState(false);
  const [recipes, setRecipes] = useState<IRecipeItem[]>([]);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const randomKeyword =
        keywords[Math.floor(Math.random() * keywords.length)];

      const res = await axios.get(
        `https://api.edamam.com/search?app_id=${APP.recipeAPIAplicationID}&app_key=${APP.recipeAPIApplicationKey}&q=${randomKeyword}&health=low-sugar`,
      );
      setRecipes(res.data.hits);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTakeRecipe = async (recipeItem: IRecipeItem) => {
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        APP.backendUrl + '/women/mealhistory',
        {
          woman_id: props.woman.id,
          pregnancy_month: props.pregnancyMonth,
          consumed_at: new Date().toLocaleDateString(),
          carbs:
            recipeItem.recipe.totalNutrients.CHOCDF?.quantity?.toFixed() || 0,
          fats: recipeItem.recipe.totalNutrients.FAT?.quantity?.toFixed() || 0,
          proteins:
            recipeItem.recipe.totalNutrients.PROCNT?.quantity?.toFixed() || 0,
          sugars:
            recipeItem.recipe.totalNutrients[
              'SUGAR.added'
            ]?.quantity.toFixed() ||
            recipeItem.recipe.totalNutrients['SUGAR']?.quantity?.toFixed() ||
            recipeItem.recipe.calories.toFixed(),
          meal: JSON.stringify({
            carbs:
              recipeItem.recipe.totalNutrients.CHOCDF?.quantity?.toFixed() || 0,
            fats:
              recipeItem.recipe.totalNutrients.FAT?.quantity?.toFixed() || 0,
            proteins:
              recipeItem.recipe.totalNutrients.PROCNT?.quantity?.toFixed() || 0,
            sugars:
              recipeItem.recipe.totalNutrients['SUGAR']?.quantity?.toFixed() ||
              recipeItem.recipe.totalNutrients[
                'SUGAR.added'
              ]?.quantity?.toFixed() ||
              0,
            food_category: recipeItem.recipe.dishType[0] || 'recipes',
            food_image: recipeItem.recipe.image,
            food_name: recipeItem.recipe.label,
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toastMessage('success', res.data.message);
    } catch (error) {
      console.error(error);
      errorHandler(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchRecipes();
  };

  useEffect(() => {
    let sub = true;
    if (sub) {
      !isLoading && refreshing && setIsRefreshing(false);
    }
    return () => {
      sub = false;
    };
  }, [isLoading]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // console.log(recipes[0].recipe.totalNutrients);
  return (
    <View style={{flex: 1, paddingTop: 10}}>
      {isLoading && <ActivityIndicator color={COLORS.green} size={35} />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{gap: 20}}>
          {recipes.map((item, index) => (
            <View key={index}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Pressable
                  onPress={() =>
                    Alert.alert(
                      'Ingredients',
                      item.recipe.ingredientLines.toString(),
                    )
                  }>
                  <Image
                    width={150}
                    height={150}
                    source={{uri: item.recipe.image}}
                    style={{borderRadius: 10, resizeMode: 'contain'}}
                  />
                </Pressable>
                <View style={{flex: 1}}>
                  <Text style={{fontWeight: 'bold'}}>{item.recipe.label}</Text>
                  <View
                    style={{
                      borderTopWidth: 1,
                      borderTopColor: COLORS.gray,
                      marginTop: 10,
                    }}>
                    {item.recipe.healthLabels
                      .slice(0, 8)
                      .map((label, index) => (
                        <Text key={index}>{label}</Text>
                      ))}
                  </View>
                </View>
              </View>
              <Pressable
                disabled={isSubmitting}
                onPress={() => handleTakeRecipe(item)}
                style={{
                  backgroundColor: COLORS.green,
                  padding: 15,
                  borderRadius: 100,
                  marginTop: 10,
                }}>
                <Text style={{color: '#FFF', textAlign: 'center'}}>
                  Mark as taken
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
      <FullPageLoader open={isSubmitting} />
    </View>
  );
};

export default Recipes;
