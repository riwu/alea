import React from 'react';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import Button from '../components/Button';
import background from '../../assets/background.png';
import tki from '../../assets/tki.png';
import mbti from '../../assets/mbti.png';
import disc from '../../assets/disc.png';
import hogan from '../../assets/hogan.png';
import Logo from '../../assets/Logo';
import Background from '../components/Background';
import { WIDTH, HEIGHT } from '../constants';

const BACKGROUND_RATIO = 0.667;
const LOGO_SCALE = WIDTH / 360;
const LOGO_PADDING = WIDTH / 20;
const LOGO_SIZE = 24;
const BUTTON_HEIGHT = 80;
const LOGO_SPACE = LOGO_SIZE * LOGO_SCALE + LOGO_PADDING * 2;
const IMAGE_HEIGHT = Math.min(WIDTH, HEIGHT * BACKGROUND_RATIO - LOGO_SPACE);

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEIGHT * (1 - BACKGROUND_RATIO),
  },
  title: {
    padding: LOGO_PADDING,
  },
  image: {
    backgroundColor: 'black',
    width: WIDTH,
    height: IMAGE_HEIGHT,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: HEIGHT * BACKGROUND_RATIO - IMAGE_HEIGHT - LOGO_SPACE - BUTTON_HEIGHT / 2,
  },
  button: {
    marginHorizontal: WIDTH / 60,
    height: BUTTON_HEIGHT,
    width: WIDTH / 2 - (WIDTH / 60) * 3,
  },
  loginButton: {
    backgroundColor: 'white',
  },
  loginText: {
    color: 'black',
  },

  logos: {
    flexDirection: 'row',
  },
  logo: {
    width: WIDTH / 4,
    height: WIDTH / 4,
  },

  termsContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  termsText: {
    color: '#BBBCBC',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

const Home = props => (
  <Background ratio={BACKGROUND_RATIO}>
    <View style={styles.title}>
      <Logo scale={LOGO_SCALE} />
    </View>
    <Image source={background} style={styles.image} />

    <View style={styles.footer}>
      <View style={styles.buttons}>
        <Button
          title="LOG IN"
          style={[styles.button, styles.loginButton]}
          textStyle={styles.loginText}
        />
        <Button
          title="SIGN UP"
          style={styles.button}
          onPress={() => props.navigation.navigate('Register')}
        />
      </View>

      <View style={styles.logos}>
        {[tki, mbti, disc, hogan].map(src => (
          <Image source={src} key={src} style={styles.logo} />
        ))}
      </View>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>By using this application you agree with our</Text>
        <Text style={styles.termsText}>
          <Text style={styles.underline}>Terms and Conditions</Text>
          {' '}
|
          {' '}
          <Text style={styles.underline}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  </Background>
);

Home.navigationOptions = {
  header: null,
};

export default Home;
