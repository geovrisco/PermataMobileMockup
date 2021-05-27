import React, {useRef} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import g from '../Styles/GlobalStyle';
const {height, width} = Dimensions.get('screen');

export default function PermataStoreNewCard({
  data,
  index,
  cardIndex,
  addCart,
  deleteCart,
}) {
  const [buttonText, setButtonText] = useState('Apply Now');
  const view = useRef(null);
  const scaling = {
    0: {
      scale: 1,
    },
    0.5: {
      scale: 0.9,
    },
    1: {
      scale: 1,
    },
  };
  const animateScale = () => {
    view.current.animate(scaling, 1000);
  };

  const handleOnPress = () => {
    // console.log(cardIndex, 'cardIndexs');
    if (cardIndex[index].inCart == true) {
      setButtonText('Apply Now');
      deleteCart(index);
    } else {
      addCart(index, cardIndex[index]);
      setButtonText('Hapus');
    }
  };
  return (
    <Animatable.View ref={view}>
      <TouchableOpacity onPressIn={animateScale}>
        <ImageBackground
          style={styles.background}
          source={data.background}
          imageStyle={styles.imageBg}>
          <Text
            style={[
              g.textSizeTitle,
              {color: '#fff', position: 'absolute', top: 10, left: 15},
              g.textBold,
            ]}>
            {data.title}
          </Text>
          <Image style={styles.imageStyle} source={data.foreground} />
          <View style={styles.description}>
            <Text style={{width: '69%', color: '#fff'}}>
              {data.description}
            </Text>
            {data.canApply ? (
              <TouchableOpacity style={styles.button} onPress={handleOnPress}>
                <Text style={(g.textSizeMd, g.textBold)}>{buttonText}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button}>
                <Text style={(g.textSizeMd, g.textBold)}>More Info</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: (width * 90) / 100,
    height: height / 1.75,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#fff',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 30,
  },
  description: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    bottom: 0,
    height: '22%',
  },
  imageBg: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  imageStyle: {
    width: width / 2,
    height: height / 5,
    resizeMode: 'cover',
  },
});
