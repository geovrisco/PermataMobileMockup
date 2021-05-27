import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Styles/Colors';
import g from '../Styles/GlobalStyle';
const {width, height} = Dimensions.get('screen');
export default function BottomButton({
  onPress,
  title = 'button',
  iconName,
  disabled = false,
}) {
  if (disabled) {
    return (
      <View style={[styles.greenButton, {opacity: 0.5}]}>
        <Text style={[styles.greenButtonText, g.textBold, g.textSizeSm]}>
          {title}
        </Text>
        {iconName && <Icon name={iconName} size={30} color="white" />}
      </View>
    );
  } else {
    return (
      <TouchableOpacity style={styles.greenButton} onPress={onPress}>
        <Text style={[styles.greenButtonText, g.textBold, g.textSizeSm]}>
          {title}
        </Text>
        {iconName && <Icon name={iconName} size={30} color="white" />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  greenButton: {
    backgroundColor: Colors.accent,
    height: (height / 100) * 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: (width * 10) / 100,
    flexDirection: 'row',
  },
  greenButtonText: {
    color: '#fff',
  },
});
