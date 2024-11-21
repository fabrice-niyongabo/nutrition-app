import {View, Text, ActivityIndicator, ToastAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {backendUrl} from '../Config';
import {returnError} from '../util';
import colors from '../colors';

const Monthly = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const fetchAnalysisData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        backendUrl + '/predict/child-health/timely/1',
      );
      setAnalysisData(response.data);
    } catch (err) {
      setError(err.message);
      ToastAndroid.show(returnError(err), ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const renderStatusCard = period => {
    if (!analysisData?.analysis[period]) return null;
    const {status, score} = analysisData.analysis[period];
    const statusColor =
      status === 'High Risk'
        ? 'red'
        : status === 'Medium Risk'
        ? 'orange'
        : 'green';

    return (
      <View
        style={{
          padding: 15,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
          marginVertical: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}>
          {period} Analysis
        </Text>
        <Text style={{color: statusColor, fontWeight: 'bold'}}>
          Status: {status}
        </Text>
        <Text>Score: {score}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.green} />
      </View>
    );
  }

  return (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        Nutritional Analysis
      </Text>

      {renderStatusCard('week')}
      {renderStatusCard('month')}
      {renderStatusCard('year')}
    </View>
  );
};

export default Monthly;
