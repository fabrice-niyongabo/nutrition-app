import * as React from 'react';
import {ActivityIndicator, useWindowDimensions, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {INavigationProp} from '../../../../types/navigation';
import Recipes from './recipes';
import CustomRecipes from './customRecipes';
import {COLORS} from '../../../../constants/colors';
import {IWoman} from '../../../../types/women';

const renderScene = ({
  route,
  jumpTo,
  navigation,
  woman,
  pregnancyMonth,
}: any) => {
  switch (route.key) {
    case 'recipes':
      return <Recipes woman={woman} pregnancyMonth={pregnancyMonth} />;
    case 'custom':
      return (
        <CustomRecipes
          // navigation={navigation}
          woman={woman}
          pregnancyMonth={pregnancyMonth}
        />
      );
    default:
      return null;
  }
};
const renderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{
        backgroundColor: COLORS.gray2,
        height: 5,
      }}
      tabStyle={{
        paddingVertical: 8,
        maxHeight: 100,
        width: 'auto',
      }}
      style={{
        backgroundColor: COLORS.green,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      }}
      activeColor="#FFF"
      labelStyle={{
        textTransform: 'uppercase',
        color: COLORS.darkGreen,
      }}
      //   renderIcon={({route, focused, color}) =>
      //     returnIcon(Number(route.key), focused)
      //   }
    />
  );
};

interface IProps extends INavigationProp {
  woman: IWoman;
  pregnancyMonth: number;
}

export default function Tabs({navigation, woman, pregnancyMonth}: IProps) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'recipes', title: 'Recommended Recipes'},
    {key: 'custom', title: 'Custom Recipes'},
  ]);

  return (
    <TabView
      lazy
      navigationState={{index, routes}}
      renderScene={props =>
        renderScene({...props, navigation, woman, pregnancyMonth})
      }
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
      renderLazyPlaceholder={() => (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={50} color={COLORS.green} />
        </View>
      )}
    />
  );
}
