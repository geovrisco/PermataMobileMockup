import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  NativeModules,
} from 'react-native';
export default function Index({children, style}) {
  return (
    <View style={[styles.container]}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={[styles.contentContainer, {...style}]}>{children}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:
      Platform.OS == 'ios' ? NativeModules.StatusBarManager.HEIGHT : 0,
  },
});
