import React, {useContext, useEffect, useRef} from 'react';
import {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
  StatusBarIOS,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../Styles/Colors';
import g from '../../Styles/GlobalStyle';
import translations from '../../Wordings/index';
import * as Animatable from 'react-native-animatable';
import AnTextInput from '../../Components/AnTextInput';
import BottomButton from '../../Components/BottomButton';
import {AuthContext} from '../../Contexts/AuthContext';

const {width, height} = Dimensions.get('screen');

export default function LoginScreen({navigation, routes}) {
  const authContext = useContext(AuthContext);
  const [step, setStep] = useState(0);

  const [username, setUserName] = useState('');
  const [userDisable, setUserDisable] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordDisable, setPasswordDisable] = useState(true);

  const [captcha, setCaptcha] = useState('');
  const [captchaDisable, setCaptchaDisable] = useState(true);

  /*
    step itu buat menghitung page keberapa sekarang
    0  = userid, 1 = password, 2 = captcha

    userName, password, captcha = variabel / "getter" yang nanti dikirim ke api

    setusername,set...  = semacem "setter" untuk set variable 
    

    userDisable,..Disable = untuk indikator button disable atau tidak.
    dipanggil / trigger dari hooks usestate dengan "getter" sebagai dependensi (event set akan 
    terpanggil otomatis ketika ada perubahan pada variable setter)
  */

  useEffect(() => {
    username.length >= 5 ? setUserDisable(false) : setUserDisable(true);
    //kalo karakter username >=5 maka userDisabled akan jadi false selain itu true
  }, [username]);
  useEffect(() => {
    password.length >= 5 ? setPasswordDisable(false) : setPasswordDisable(true);
  }, [password]);
  useEffect(() => {
    captcha.length >= 1 ? setCaptchaDisable(false) : setCaptchaDisable(true);
  }, [captcha]);

  const handleUsername = value => {
    setUserName(value);
  };
  const handlePassword = value => {
    setPassword(value);
  };
  const handleCaptcha = value => {
    setCaptcha(value);
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const handleLogin = () => {
    alert(
      `username : ${username}\npassword : ${password}\ncaptcha : ${captcha}`,
    );
  };
  const handleExitLogin = () => {
    navigation.goBack();
  };

  if (step === 0) {
    return (
      <UserIdForm
        placHolder={translations.userIdPlaceHolder}
        titleText={translations.askUserId}
        onChangeText={handleUsername}
        btnOnPress={nextStep}
        btnTitle={translations.next}
        textInputValue={username}
        disabled={userDisable}
        step={step}
      />
    );
  } else if (step == 1) {
    return (
      <UserIdForm
        placHolder={translations.passwordPlaceHolder}
        titleText={translations.askPassword}
        onChangeText={handlePassword}
        btnOnPress={nextStep}
        btnTitle={translations.login}
        textInputValue={password}
        secure={true}
        iconName="check"
        disabled={passwordDisable}
        step={step}
        closeAction={handleExitLogin}
        prevStep={prevStep}
      />
    );
  } else if (step == 2) {
    return (
      <UserIdForm
        placHolder={translations.captchaPlaceHolder}
        titleText={translations.captchaDescription}
        onChangeText={handleCaptcha}
        btnOnPress={authContext.handleLogin}
        btnTitle={translations.login}
        textInputValue={captcha}
        secure={false}
        iconName="check"
        disabled={captchaDisable}
        step={step}
        closeAction={handleExitLogin}
        prevStep={prevStep}
      />
    );
  }
}

const UserIdForm = ({
  placHolder,
  onChangeText,
  titleText,
  btnOnPress,
  btnTitle,
  textInputValue,
  secure = false,
  iconName = 'navigate-next',
  disabled = true,
  step,
  closeAction,
  prevStep,
}) => {
  const viewElement = useRef(null);

  const [captchaQuestion, setCaptchaQ] = useState({
    left: 0,
    right: 0,
    operator: '',
    display: '',
    answer: '',
  });
  const createCaptcha = () => {
    const num1 = Math.floor(Math.random() * 30 + 1);
    const num2 = Math.floor(Math.random() * 30 + 1);
    const left = Math.max(num1, num2);
    const right = Math.min(num1, num2);
    let operator = '';
    const typeOperator = Math.round(Math.random() * 1);
    let answer = 0;
    switch (typeOperator) {
      case 0:
        operator = '+';
        answer = right + left;
        break;
      case 1:
        operator = '-';
        answer = left - right;
        break;
      default:
        break;
    }
    setCaptchaQ({
      right: right,
      left: left,
      operator: operator,
      answer: answer,
      display: `${left} ${operator} ${right}`,
    });
    console.log(captchaQuestion);
  };

  useEffect(() => {
    createCaptcha();
  }, []);
  const handleOnPress = () => {
    if (step < 2) {
      viewElement.current.animate('fadeInUpBig', 1000);
      btnOnPress();
    } else {
      if (textInputValue == captchaQuestion.answer) {
        btnOnPress();
      } else {
        alert('captcha salah');
      }
    }
  };
  const handlePrevStep = () => {
    viewElement.current.animate('fadeInDownBig', 1000);
    prevStep();
  };

  const [value, setValue] = useState(textInputValue);
  useEffect(() => {
    setValue(value);
  }, [textInputValue]);

  return (
    <Animatable.View style={{flex: 1}} ref={viewElement}>
      <View
        style={[
          g.containerStart,
          {
            justifyContent: 'space-between',
          },
        ]}>
        {step > 0 && (
          <View style={[styles.headerContainer]}>
            <TouchableOpacity onPress={() => handlePrevStep()}>
              <Icon name="chevron-up" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={closeAction}>
              <Icon name="close" size={25} />
            </TouchableOpacity>
          </View>
        )}
        <View>
          {step < 2 ? (
            <View style={styles.textContainer}>
              <Text style={g.textSizeSm}>{titleText}</Text>
            </View>
          ) : (
            <View style={[styles.textContainer, {width: (width * 85) / 100}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width / 2,
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={styles.captchaText}>
                  {captchaQuestion.display}
                </Text>
                <TouchableOpacity onPress={() => createCaptcha()}>
                  <Text style={{color: Colors.accent}}>
                    {translations.changeCaptcha}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={g.textSizeSm}>{titleText}</Text>
            </View>
          )}
          <View style={styles.row}>
            <AnTextInput
              onChangeText={text => onChangeText(text)}
              placeHolder={placHolder}
              value={textInputValue}
              secure={secure}
            />
          </View>
        </View>
        <View style={{width: '100%'}}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>
              {translations.forgotPassword}
            </Text>
          </TouchableOpacity>
          <BottomButton
            onPress={() => handleOnPress()}
            title={btnTitle}
            iconName={iconName}
            disabled={disabled}
          />
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: (width * 45) / 100,
    alignSelf: 'flex-start',
    marginLeft: (width / 100) * 5,
    marginTop: (height * 10) / 100,
    marginBottom: (height * 2) / 100,
  },
  row: {
    width: (width * 90) / 100,
    alignSelf: 'flex-start',
    marginHorizontal: (width / 100) * 5,
  },
  forgotPassword: {
    color: Colors.fontSecondary,
    marginBottom: (height * 2) / 100,
    paddingHorizontal: (width * 5) / 100,
  },
  headerContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: (height * 5) / 100,
    width: width,
    paddingHorizontal: (width * 3) / 100,
    zIndex: 1,
  },
  captchaText: {
    fontSize: 30,
    borderWidth: StyleSheet.hairlineWidth,
    width: width / 3.5,
    textAlign: 'center',
    paddingVertical: (height * 1) / 100,
  },
});
