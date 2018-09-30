import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Page from '../components/Page';
import Stats from '../components/Stats';
import Hacks from '../components/Hacks';

const styles = StyleSheet.create({
  stats: {
    marginVertical: 20,
  },
  submitButton: {
    marginVertical: 20,
    backgroundColor: 'rgba(134, 188, 37, 0.25)',
  },
  submitText: {
    color: '#86BC25',
  },
  hacks: {
    backgroundColor: 'black',
  },
});

const Profile = props => (
  <Page
    prefix={`${props.displayName}'s`}
    title="Profile"
    button={{
      title: 'REQUEST FOR\nFEEDBACK',
      onPress: () => props.navigation.navigate('RequestFeedback'),
    }}
    rightHeader={{
      title: 'My values',
      items: ['Communication', 'Flexible', 'Confident'],
    }}
  >
    <ScrollView>
      <Stats style={styles.stats} />
      <View style={styles.hacks}>
        <Hacks />
        <Button
          style={styles.submitButton}
          textStyle={styles.submitText}
          title="SUBMIT A HACK"
          onPress={() => props.navigation.navigate('SubmitHack')}
        />
      </View>
    </ScrollView>
  </Page>
);

export default connect(state => ({ displayName: state.user.displayName }))(Profile);
