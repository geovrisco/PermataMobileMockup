import React, {useContext} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import RoundedButton from '../../../Components/RoundedButton';
import {en, id} from '../../../Wordings';
import g from '../../../Styles/GlobalStyle.js';
import Colors from '../../../Styles/Colors';
import translations from '../../../Wordings/index';
import {LocalizationContext} from '../../../Contexts/LocalizationContext';
import * as Animatable from 'react-native-animatable';
import ROUTES from '../../../Navigator/ROUTES';

const {width, height} = Dimensions.get('screen');
export default function AskAccountScreen({navigation, routes}) {
  const {setAppLanguage, appLanguage} = useContext(LocalizationContext);
  const handleNo = () => {
    appLanguage == 'id' ? setAppLanguage('en') : setAppLanguage('id');
  };
  const handleOk = () => {
    navigation.navigate(ROUTES.SCREEN.ASKUSERIDSCREEN);
  };
  return (
    <Animatable.View style={[g.containerStart]}>
      <Image
        resizeMode="contain"
        source={require('../../../assets/img_step_askaccount.png')}
        style={{
          width,
          height: height / 2,
        }}
      />
      <View style={styles.row}>
        <Text style={g.textSizeMd}>
          {translations.DoYouHave}{' '}
          <Text style={[g.textBold, g.textSizeMd]}>
            {translations.PmtAccount} ?
          </Text>
        </Text>
      </View>
      <View style={styles.row}>
        <RoundedButton
          text={translations.no}
          buttonSize={200}
          iconName="close"
          textSize="small"
          onPress={handleNo}
        />
        <RoundedButton
          text={translations.yes}
          buttonSize={200}
          iconName="check"
          textSize="small"
          onPress={handleOk}
          otherStyle={{marginTop: 10}}
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
