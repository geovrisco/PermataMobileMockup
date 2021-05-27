import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../Styles/Colors';
import g from '../Styles/GlobalStyle';

const TextSize = [g.textSizeSm, g.textSizeMd, g.textSizeLg];
const Sizes = ['small', 'medium', 'large'];

export default function RoundedButton({
  iconName,
  buttonSize = null,
  onPress = null,
  textSize = 'medium',
  text = '',
  otherStyle,
}) {
  let txtSize = Sizes.indexOf(textSize);
  txtSize >= 0 ? txtSize : 1;
  console.log(otherStyle);
  return (
    <TouchableOpacity
      style={[
        styles.buttonBox,
        buttonSize ? {width: buttonSize} : '',
        otherStyle,
      ]}
      onPress={onPress ? () => onPress() : console.log('')}>
      {iconName && (
        <View style={styles.iconContainer}>
          <Icon name={iconName} size={35} color={Colors.primary} />
        </View>
      )}
      <Text style={[TextSize[txtSize], {marginLeft: 20}]}>{text}</Text>
    </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
