import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {LocalizationProvider} from './App/Contexts/LocalizationContext';
import {
  ActivityProvider,
  UserInactivityContext,
} from './App/Contexts/ActivityProvider';
import {AuthContextProvider, AuthContext} from './App/Contexts/AuthContext';
import {useContext} from 'react';
import OnBoardingStack from './App/Navigator/OnBoardingStack';
import PermataStore from './App/Screens/PermataStoreScreen/Index';
import LoginStack from './App/Navigator/PermataStoreStack';
import PermataStoreStack from './App/Navigator/PermataStoreStack';

// TODO: Sabtu Sore
// 1. buat provider satu lagi yang selisih + 10 detik dari Activity provider yang bakal end session user
// 2. buat Login Context

export default function App() {
  useEffect(() => {
    console.log(userData, 'via appjs');
  }, [userData]);
  const [userData, setUserData] = useState(null);
  const handleLogin = () => {
    setUserData({
      username: 'Xtetew',
      casa: [
        {accountId: 123321, accountType: 'tabungan1'},
        {accountId: 111111, accountType: 'giro'},
        {accountId: 111111, accountType: 'deposito'},
      ],
    });
    console.log(userData, 'called');
  };
  const handleLogout = () => {
    console.log('logout');
    setUserData(null);
  };
  return (
    <LocalizationProvider>
      <AuthContext.Provider value={{userData, handleLogin, handleLogout}}>
        <NavigationContainer>
          {userData ? (
            <ActivityProvider>
              <PermataStoreStack />
            </ActivityProvider>
          ) : (
            <OnBoardingStack />
          )}
          {/* <PermataStore /> */}
        </NavigationContainer>
      </AuthContext.Provider>
    </LocalizationProvider>
  );
}

const styles = StyleSheet.create({});
