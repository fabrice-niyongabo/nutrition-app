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
import {backendUrl} from '../Config';
import {returnError} from '../util';
import colors from '../colors';
import Monthly from './Monthly';

const Prediction = ({route, navigation}) => {
  const {child} = route.params;
  const [nutritionData, setNutritionData] = useState(null);
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
        backendUrl + '/predict/child-health/' + child.id,
      );
      console.log(response.data);
      setNutritionData(response.data);
    } catch (err) {
      setError(err.message);
      ToastAndroid.show(returnError(error), ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  // Function to format date to readable format
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });
  };

  // Function to transform API data to chart format
  const transformDataForChart = historicalNutrition => {
    if (!historicalNutrition || historicalNutrition.length === 0) {
      return null;
    }

    return {
      labels: historicalNutrition.map(item => formatDate(item.date)),
      datasets: [
        {
          data: historicalNutrition.map(item => item.calories),
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          strokeWidth: 2,
          label: 'Calories',
        },
        {
          data: historicalNutrition.map(item => item.carbs),
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          strokeWidth: 2,
          label: 'Carbs',
        },
        {
          data: historicalNutrition.map(item => item.protein),
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          strokeWidth: 2,
          label: 'Protein',
        },
        {
          data: historicalNutrition.map(item => item.fats),
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
        {loading && <ActivityIndicator size="large" color={colors.green} />}
        <Monthly child={child} />
        {chartData && (
          <>
            <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>
              Historical Nutrition Data
            </Text>
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
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Prediction;
