import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
module.exports = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerStart: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textSizeMd: {
    fontSize: 20,
  },
  textSizeLg: {
    fontSize: 23,
  },
  textSizeSm: {
    fontSize: 17,
  },
  textSizeTitle: {
    fontSize: 30,
  },
  textSizeXs: {
    fontSize: 15,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
