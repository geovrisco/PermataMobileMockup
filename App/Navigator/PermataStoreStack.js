import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import OnBoardingScreen from '../Screens/OnBoardingScreen/index';
import {SCREEN} from './ROUTES';
import MainPermataStore from '../Screens/PermataStoreScreen/Index';
const Stack = createStackNavigator();
const transparentHeader = {headerTransparent: true, headerTitle: null};

export default PermataStoreStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name={SCREEN.PERMATASTORESCREEN}
        component={MainPermataStore}
      />
    </Stack.Navigator>
  );
};
