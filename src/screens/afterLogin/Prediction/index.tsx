import {
  View,
  Text,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import axios from 'axios';
import Monthly from './Monthly';
import {INavigationPropWithRouteRequired} from '../../../types/navigation';
import {IChild} from '../../../types/children';
import {APP} from '../../../constants/app';
import {returnError} from '../../../utils/helpers';
import {COLORS} from '../../../constants/colors';

const Prediction = ({route, navigation}: INavigationPropWithRouteRequired) => {
  const {child} = route.params as {child: IChild};
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNutritionData();
  }, []);

  const fetchNutritionData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        APP.backendUrl + '/predict/child-health/' + child.id,
      );
      console.log(response.data);
      setNutritionData(response.data);
    } catch (err: any) {
      setError(err.message);
      ToastAndroid.show(returnError(error), ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  // Function to format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });
  };

  // Function to transform API data to chart format
  const transformDataForChart = (historicalNutrition: any) => {
    if (!historicalNutrition || historicalNutrition.length === 0) {
      return null;
    }

    return {
      labels: historicalNutrition.map((item: any) => formatDate(item.date)),
      datasets: [
        {
          data: historicalNutrition.map((item: any) => item.calories),
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          strokeWidth: 2,
          label: 'Calories',
        },
        {
          data: historicalNutrition.map((item: any) => item.carbs),
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          strokeWidth: 2,
          label: 'Carbs',
        },
        {
          data: historicalNutrition.map((item: any) => item.protein),
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          strokeWidth: 2,
          label: 'Protein',
        },
        {
          data: historicalNutrition.map((item: any) => item.fats),
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
          strokeWidth: 2,
          label: 'Fats',
        },
      ],
    };
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
    },
    legend: ['Calories', 'Carbs', 'Protein', 'Fats'],
  };

  // Transform the historical nutrition data
  const chartData = transformDataForChart(
    nutritionData?.data?.historical_nutrition,
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {loading && <ActivityIndicator size="large" color={COLORS.green} />}
        <Monthly child={child} />
        {chartData && (
          <>
            <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>
              Historical Nutrition Data
            </Text>
            <View>
              <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 20}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                legend={['Calories', 'Carbs', 'Protein', 'Fats']}
              />
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  padding: 10,
                  gap: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: 'rgba(255, 0, 0, 1)',
                      marginRight: 4,
                    }}
                  />
                  <Text>Calories</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: 'rgba(0, 255, 0, 1)',
                      marginRight: 4,
                    }}
                  />
                  <Text>Carbs</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: 'rgba(0, 0, 255, 1)',
                      marginRight: 4,
                    }}
                  />
                  <Text>Protein</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: 'rgba(255, 165, 0, 1)',
                      marginRight: 4,
                    }}
                  />
                  <Text>Fats</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Prediction;
