import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, TextInput, Animated} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Styles/Colors';
import g from '../Styles/GlobalStyle';
const {width, height} = Dimensions.get('screen');

export default function AnTextInput({
  onChangeText,
  placeHolder,
  value = '',
  secure = false,
}) {
  let greenUnderline = React.useRef(new Animated.Value(0)).current;
  let blackUnderLine = React.useRef(new Animated.Value(100 * 5)).current;

  if (!onChangeText) return null;
  const [length, setLength] = useState(value);
  const handleTextInput = text => {
    onChangeText(text);
    setLength(text.length);
    console.log(length);
  };

  const handleOnFocus = () => {
    Animated.sequence([
      Animated.timing(blackUnderLine, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(greenUnderline, {
        toValue: 100 * 5,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    Animated.sequence([
      Animated.timing(greenUnderline, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(blackUnderLine, {
        toValue: 100 * 5,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.textInputContainer}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <TextInput
          style={styles.textInput}
          placeholder={placeHolder}
          onFocus={handleOnFocus}
          onBlur={handleBlur}
          onChangeText={handleTextInput}
          value={value}
          secureTextEntry={secure}
        />
        {length >= 5 ? (
          <Animatable.View animation="bounceIn">
            <Icons
              name="check"
              size={30}
              style={{height: 40}}
              color={'#f5bf42'}
            />
          </Animatable.View>
        ) : (
          <Animatable.View animation="bounceOut">
            <Icons
              name="check"
              size={30}
              style={{height: 40}}
              color={'#f5bf42'}
            />
          </Animatable.View>
        )}
      </View>
      <Animated.View
        style={[
          {
            borderBottomWidth: 1,
            width: 1,
            maxWidth: '10%',
            borderColor: '#000',
            backgroundColor: 'red',
            height: 10,
          },
          {transform: [{scaleX: blackUnderLine}]},
        ]}
      />
      <Animated.View
        style={[
          {
            borderBottomWidth: 3,
            width: 1,
            maxWidth: (width * 80) / 100,
            borderColor: Colors.accent,
          },
          {transform: [{scaleX: greenUnderline}]},
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    width: (width * 45) / 100,
    alignSelf: 'flex-start',
    marginLeft: (width / 100) * 5,
    marginTop: (height * 10) / 100,
    marginBottom: (height * 2) / 100,
  },
  textInputContainer: {
    width: '100%',
    // borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {height: 50, fontSize: 20, alignSelf: 'flex-start', width: '80%'},
});
