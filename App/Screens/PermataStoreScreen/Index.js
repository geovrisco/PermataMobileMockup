import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  NativeModules,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PermataStoreNewCard from '../../Components/PermataStoreNewCard';
import g from '../../Styles/GlobalStyle';
const {height, width} = Dimensions.get('screen');
import ScrollViewContainer from '../../Components/ScrollViewContainer';
import translations from '../../Wordings/index';
export default function Index() {
  const CardData = [
    {
      title: 'PermataME',
      description:
        'Tabungan untuk Gaya Hidup Kekinian dengan Cashback hingga 30%',
      background: require('../../assets/permata_store/background/do_productbg_bebas.png'),
      foreground: require('../../assets/permata_store/foreground/logo_sa_permatame.png'),
      canApply: true,
    },
    {
      title: 'Credit Card Air Asia',
      description:
        'Credit card blablabla air asia untuk penerbangan blablablabla, fitur blablablba, lorem ipsum dulumet sit amit uhu ehe aha uhu yeyeye yayayay yeyeye',
      background: require('../../assets/permata_store/background/do_productbg_black.png'),
      foreground: require('../../assets/permata_store/foreground/logo_cc_airasia.png'),
      canApply: true,
    },
    {
      title: 'PermataME KTA',
      description:
        'Jaga dan TIngkatkan Dana di PermataME Kamu untuk Dapatkan Penawaran Spesial',
      background: require('../../assets/permata_store/background/do_productbg_ktaregular.png'),
      foreground: require('../../assets/permata_store/foreground/logo_mo_ktareguler.png'),
      canApply: false,
    },
  ];
  const [cardIndex, setCardIndex] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addCart = (index, cardData) => {
    setCartItems([...cartItems, cardData]);
    cardIndex[index].inCart = true;
  };
  const deleteCart = (index, cardData) => {
    console.log(index, 'ini index');
    console.log(cartItems);
    let filtered = cartItems.filter(data => data.index !== index);

    setCartItems(filtered);
    cardIndex[index].inCart = false;
    console.log('delete');
  };
  console.log(cartItems);
  return (
    <View style={{flex: 1}}>
      <RowContainer
        style={{
          width: width,
          paddingTop:
            Platform.OS == 'ios' ? NativeModules.StatusBarManager.HEIGHT : 0,
          paddingBottom: 20,
        }}>
        <Text style={[g.textSizeMd]}>PermataStore</Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            paddingTop:
              Platform.OS == 'ios' ? NativeModules.StatusBarManager.HEIGHT : 0,
          }}>
          <Icon name="lock-outline" size={25}></Icon>
        </TouchableOpacity>
      </RowContainer>
      <ScrollViewContainer style={{paddingTop: 0}}>
        <RowContainer style={{justifyContent: 'flex-start', marginBottom: 30}}>
          <Text style={[g.textSizeTitle, {alignSelf: 'flex-start'}]}>
            {translations.PermataStoreNew}
          </Text>
        </RowContainer>
        <RowContainer style={{flexDirection: 'column'}}>
          {CardData.map((card, index) => {
            cardIndex.push({index: index, title: card.title, inCart: false});
            return (
              <PermataStoreNewCard
                data={card}
                key={index}
                index={index}
                cardIndex={cardIndex}
                addCart={addCart}
                deleteCart={deleteCart}
              />
            );
          })}
        </RowContainer>
      </ScrollViewContainer>
    </View>
  );
}

const RowContainer = ({children, style}) => {
  return <View style={[styles.rowContainer, {...style}]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    width: (width * 90) / 100,
    justifyContent: 'center',
  },
});
