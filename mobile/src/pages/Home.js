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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    backgroundColor: 'black',
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
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
  <View style={styles.container}>
    <Image source={background} style={styles.logo} />
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
        <Image source={src} key={src} />
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
);

export default Home;
