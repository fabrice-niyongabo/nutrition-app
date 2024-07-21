import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import colors from '../colors';
import Axios from 'axios';
import {backendUrl, imageUrl} from '../Config';
import {TouchableOpacity} from 'react-native-gesture-handler';

function RemoveFoods() {
  const [foods, setFoods] = useState([]);
  const [isLoadingFoods, setisLoadingFoods] = useState(true);
  const [keyWord, setkeyWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    Axios.get(backendUrl + 'adminWomensFood2')
      .then(res => {
        setFoods(res.data);
        setisLoadingFoods(false);
      })
      .catch(error => alert(error));
  }, []);

  const search = () => {
    if (keyWord != '') {
      let res = [];
      for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        const name = food.name.toLowerCase();

        if (name.includes(keyWord.toLocaleLowerCase())) {
          res.push(food);
        }
      }
      setSearchResults(res);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoadingFoods ? (
          <>
            <View style={{marginTop: 20}}>
              <ActivityIndicator color={colors.green} size={30} />
            </View>
          </>
        ) : (
          <View style={{padding: 10}}>
            <Text>
              Remove foods that you are told to do not take by your doctor.
            </Text>
            <TextInput
              placeholder="Search for foods"
              style={{
                borderBottomColor: colors.gray,
                borderBottomWidth: 1,
                paddingVertical: 5,
              }}
              onChangeText={text => {
                setkeyWord(text);
                search();
              }}
              value={keyWord}
            />
            <View style={{marginTop: 20}}>
              {searchResults.map((food, index) => (
                <View key={index} style={{marginVertical: 10}}>
                  <Image
                    source={{uri: imageUrl + food.image}}
                    style={{width: '100%', height: 300, borderRadius: 10}}
                  />
                  <Text style={{marginTop: 10}}>{food.name}</Text>
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: colors.green,
                        width: 150,
                        padding: 10,
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'white'}}>Remove food</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default RemoveFoods;
