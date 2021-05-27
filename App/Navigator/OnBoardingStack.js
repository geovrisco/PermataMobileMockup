import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import OnBoardingScreen from '../Screens/OnBoardingScreen/index';
import {SCREEN} from './ROUTES';
import LoginScreen from '../Screens/GettingStartedScreen/LoginScreen';
import AskUserIdScreen from '../Screens/GettingStartedScreen/QuestionLists/AskUserIdScreen';
import AskAccountScreen from '../Screens/GettingStartedScreen/QuestionLists/AskAccountScreen';
const Stack = createStackNavigator();
const transparentHeader = {headerTransparent: true, headerTitle: null};

export default OnBoardingStack = props => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name={SCREEN.ONBOARDINGSCREEN}
        component={OnBoardingScreen}
      />
      <Stack.Screen name={SCREEN.ASKUSERIDSCREEN} component={AskUserIdScreen} />
      <Stack.Screen
        name={SCREEN.ASKACCOUNTSCREEN}
        component={AskAccountScreen}
      />
      <Stack.Screen name={SCREEN.LOGINSCREEN} component={LoginScreen} />
    </Stack.Navigator>
  );
};
