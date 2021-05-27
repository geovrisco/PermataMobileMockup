import React, {useContext} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import RoundedButton from '../../../Components/RoundedButton';
import g from '../../../Styles/GlobalStyle.js';
import Colors from '../../../Styles/Colors';
import translations from '../../../Wordings/index';
import {LocalizationContext} from '../../../Contexts/LocalizationContext';
import * as Animatable from 'react-native-animatable';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ROUTES from '../../../Navigator/ROUTES';

const {width, height} = Dimensions.get('screen');
export default function AskUserIdScreen({navigation}) {
  const {setAppLanguage, appLanguage} = useContext(LocalizationContext);
  const handleLanguage = () => {
    appLanguage == 'id' ? setAppLanguage('en') : setAppLanguage('id');
  };
  const handleOk = () => {
    navigation.navigate(ROUTES.SCREEN.LOGINSCREEN);
  };

  return (
    <Animatable.View style={[g.containerStart]}>
      <ImageBackground
        resizeMode="contain"
        source={require('../../../assets/img_step_askpmobx.png')}
        style={{
          width,
          height: height / 2,
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 50,
            right: 0,
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icons name="close" size={30} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.row}>
        <Text style={g.textSizeMd}>
          {translations.DoYouHave}{' '}
          <Text style={[g.textBold, g.textSizeMd]}>
            {translations.PMobXAcc}
          </Text>
        </Text>
      </View>
      <View style={styles.row}>
        <RoundedButton
          text={translations.yes}
          buttonSize={200}
          iconName="check"
          textSize="small"
          onPress={handleOk}
          otherStyle={{marginBottom: 10}}
        />
        <RoundedButton
          text={translations.no}
          buttonSize={200}
          iconName="close"
          textSize="small"
          onPress={handleLanguage}
        />
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    height: 70,
    width: 300,
    borderColor: Colors.accent,
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: Colors.accent,
    borderRadius: 30,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: (width * 80) / 100,
    marginBottom: 10,
  },
});
