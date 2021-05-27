import * as React from 'react';

import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ROUTES from '../../Navigator/ROUTES';
import translations from '../../Wordings';

const {width, height} = Dimensions.get('screen');
const bgs = ['#111f45', '#1d3c80', '#593b6e', '#3898ff'];

const BackDrop = ({scrollX}) => {
  const bg = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map(bg => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {backgroundColor: bg},
      ]}></Animated.View>
  );
};

const Indicator = ({scrollX, DATA}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 100,
        flexDirection: 'row',
        left: 5,
      }}>
      {DATA.map((item, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const scale = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: ['#fff', '#03f8fc', '#fff'],
        });
        return (
          <Animated.View
            key={index}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: backgroundColor,
              margin: 5,
              transform: [{scale}],
            }}
          />
        );
      })}
    </View>
  );
};

export default function App({navigation, routes}) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [username, setUsername] = React.useState('');
  const [lang, setLang] = React.useState('en');
  const DATA = [
    {
      key: '3571572',
      title: translations.OnBoardingTitle1,
      description: translations.OnBoardingDescription1,
      image: require('../../assets/uwu.png'),
    },
    {
      key: '3571747',
      title: translations.OnBoardingTitle2,
      description: translations.OnBoardingTitle2,
      image: require('../../assets/r2.png'),
    },
    {
      key: '3571680',
      title: translations.OnBoardingTitle3,
      description: translations.OnBoardingDescription3,
      image: require('../../assets/r3.png'),
    },
  ];
  const handleClick = () => {
    navigation.navigate(ROUTES.SCREEN.ASKACCOUNTSCREEN);
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flex: 0.9}}>
          <BackDrop scrollX={scrollX} />
          <FlatList
            data={DATA}
            horizontal
            keyExtractor={item => item.key}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={30}
            bounces={10}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            renderItem={({item, index}) => {
              return (
                <View style={styles.FlatlistItem}>
                  <View style={{position: 'absolute', top: 100, zIndex: 1}}>
                    {index === 0 ? (
                      <Text style={styles.title}>
                        {item.title}, {username ? username : 'Stranger'}
                      </Text>
                    ) : (
                      <Text style={styles.title}>{item.title}</Text>
                    )}
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  <Image source={item.image} style={styles.imageCarousel} />
                </View>
              );
            }}
          />
        </View>
        <Indicator scrollX={scrollX} DATA={DATA} />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handleClick()}>
          <Icon name="login" color="#65a49d" size={20} />
          <Text style={styles.textButton}>Mulai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'flex-start',
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Platform.OS == 'ios' && Platform.Version > 12 ? 10 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlatlistItem: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 19,
    fontSize: 23,
  },
  description: {
    color: '#fff',
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 19,
    fontSize: 21,
  },
  textButton: {
    color: '#65a49d',
    fontWeight: '300',
    fontSize: 20,
    marginLeft: 10,
  },
  imageCarousel: {
    width: width,
    height: height / 2,
    resizeMode: 'stretch',
    position: 'absolute',
    bottom: 30,
  },
});
