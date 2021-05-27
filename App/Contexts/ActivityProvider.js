// ini provider ini berfungsi untung memunculkan pop up 10 detik sebelum end session / logout
import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import UserInactivity from 'react-native-user-inactivity';
import Colors from '../Styles/Colors';
import translation from '../Wordings/index';
import {AuthContext} from './AuthContext';
import g from '../Styles/GlobalStyle';

export const UserInactivityContext = React.createContext({
  active: true,
  setActive: () => {},
  timer: 2000,
  setTimer: () => {},
});

export const ActivityProvider = ({children}) => {
  const [active, setActive] = useState(true);
  const [timer, setTimer] = useState(2000);
  const [expiredTimer, setExpiredTimer] = useState(15);
  const handleAction = isActive => {
    setActive(isActive);
    console.log(isActive);
  };

  const {handleLogout} = useContext(AuthContext);

  const handleResetTimer = () => {
    setActive(true);
    setTimer(5000);
    setExpiredTimer(15);
  };

  useEffect(() => {
    if (!active) {
      const countDownExpired = setInterval(() => {
        if (expiredTimer === 0) return;
        setExpiredTimer(expiredTimer => expiredTimer - 1);
      }, 1000);
      return () => clearInterval(countDownExpired);
    }
  }, [active]);

  useEffect(() => {
    if (expiredTimer == 0) {
      handleLogout();
    }
  }, [expiredTimer]);

  return (
    <UserInactivityContext.Provider
      value={{active, setActive, timer, setTimer}}>
      <UserInactivity
        isActive={active}
        timeForInactivity={timer}
        onAction={isActive => {
          handleAction(isActive);
        }}>
        {children}
      </UserInactivity>
      {!active && (
        <Modal animationType="fade" transparent style={styles.modalContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.popUp}>
              <Image
                source={require('../assets/timeout.png')}
                style={{
                  width: widthPercentageToDP(60),
                  height: heightPercentageToDP(25),
                  resizeMode: 'center',
                }}
              />
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[g.textSizeMd, g.textBold, styles.title]}>
                  {translation.inActiveText}
                </Text>
                <Text style={styles.timer}>
                  {translation.remainingTime} 00:
                  {expiredTimer < 10 ? `0${expiredTimer}` : expiredTimer}
                </Text>
                <Text style={styles.description}>{translation.timeout}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleResetTimer}>
                <Text style={[g.textSizeMd, {color: '#fff'}]}>
                  {translation.resetTimer}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </UserInactivityContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUp: {
    height: heightPercentageToDP(70),
    width: widthPercentageToDP(80),
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP(5),
  },
  title: {
    color: Colors.accent,
  },
  timer: {
    color: '#ababab',
    marginVertical: heightPercentageToDP(1),
  },
  description: {
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: widthPercentageToDP(5),
    backgroundColor: Colors.accent,
    paddingVertical: heightPercentageToDP(2),
    borderRadius: 50,
  },
});
