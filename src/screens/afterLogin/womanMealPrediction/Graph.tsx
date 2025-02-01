import {Text, View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import _ from 'lodash';

interface IProps {
  mealsData: IMealItem[];
}

const Graph = ({mealsData}: IProps) => {
  // Group meals by consumed_at date
  const groupedData = _.groupBy(mealsData, meal => meal.consumed_at);

  // Prepare data for chart
  const chartData = Object.keys(groupedData).map(date => {
    const items = groupedData[date];
    const totalItems = items.length;
    const itemsLe05 = items.filter(
      item => parseFloat(item.diabetes) <= 0.5,
    ).length;
    const itemsGt05 = items.filter(
      item => parseFloat(item.diabetes) > 0.5,
    ).length;

    return {
      date,
      avgPercentageLe05: (itemsLe05 / totalItems) * 100,
      avgPercentageGt05: (itemsGt05 / totalItems) * 100,
    };
  });

  const labels = chartData.map(data => data.date);
  const avgLe05Data = chartData.map(data => data.avgPercentageLe05);
  const avgGt05Data = chartData.map(data => data.avgPercentageGt05);

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          marginBottom: 10,
          padding: 10,
          backgroundColor: '#fff',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 20,
              height: 2,
              backgroundColor: 'green',
              marginRight: 5,
            }}
          />
          <Text>Chances of Not Getting Diabetes</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 20,
              height: 2,
              backgroundColor: 'red',
              marginRight: 5,
            }}
          />
          <Text>Chances of Getting Diabetes</Text>
        </View>
      </View>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: avgLe05Data,
              color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green
              strokeWidth: 2,
            },
            {
              data: avgGt05Data,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red
              strokeWidth: 2,
            },
          ],
        }}
        width={400} // from react-native
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Graph;
