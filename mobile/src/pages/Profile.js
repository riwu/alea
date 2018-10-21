import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Page from '../components/Page';
import Stats from '../components/Stats';
import Hacks from '../components/Hacks';
import Graph from '../components/Graph';

const styles = StyleSheet.create({
  container: {
    // margin: 20,
  },
  stats: {
    marginVertical: 30,
  },
  submitButton: {
    marginVertical: 20,
    backgroundColor: 'rgba(134, 188, 37, 0.25)',
  },
  submitText: {
    color: '#86BC25',
  },
});

const Profile = props => (
  <Page
    ratio={1}
    prefix={`${props.displayName}'s`}
    title="Profile"
    buttons={[
      {
        title: 'How am\nI doing',
        onPress: () => props.navigation.navigate('RequestFeedback'),
      },
      {
        title: 'How are\nothers doing',
        onPress: () => props.navigation.navigate('ProvideFeedback'),
      },
    ]}
  >
    <ScrollView contentContainerStyle={styles.container}>
      <Graph />
      <Stats style={styles.stats} />
      <Hacks />
      <Button
        style={styles.submitButton}
        textStyle={styles.submitText}
        title="SUBMIT A HACK"
        onPress={() => props.navigation.navigate('SubmitHack')}
      />
    </ScrollView>
  </Page>
);

export default connect(state => ({ displayName: state.user.displayName }))(Profile);
