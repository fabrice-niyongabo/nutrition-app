import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {APP} from '../../../constants/app';
import {INavigationPropWithRouteRequired} from '../../../types/navigation';
import {IWoman} from '../../../types/women';
import {errorHandler} from '../../../utils/helpers';
import {COLORS} from '../../../constants/colors';
import Graph from './Graph';

const WomanMealPrediction = ({
  route,
  navigation,
}: INavigationPropWithRouteRequired) => {
  const {woman} = route.params as {woman: IWoman};
  const [isLoading, setIsLoading] = useState(false);
  const [mealsData, setMealsData] = useState<IMealItem[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        APP.backendUrl + '/women/mealhistory/' + woman.id,
      );
      setMealsData(res.data.meals);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{flex: 1}}>
      {isLoading && (
        <View style={{padding: 10}}>
          <ActivityIndicator size={30} color={COLORS.green} />
        </View>
      )}
      {mealsData.length > 0 && <Graph mealsData={mealsData} />}
    </View>
  );
};

export default WomanMealPrediction;
