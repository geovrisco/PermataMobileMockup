import React, {createContext, useState} from 'react';
import translations, {DEFAULT_LANGUAGE} from '../Wordings/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
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
    <AuthContext.Provider
      value={{userData, setUserData, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};
