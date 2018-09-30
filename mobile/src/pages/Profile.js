import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, TouchableOpacity, FlatList, Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient, Svg } from 'expo';
import Button from '../components/Button';
import Header from '../components/Header';
import Background from '../components/Background';
import Card from '../components/Card';
import RightHeader from '../components/RightHeader';
import data from './data';
import Adaptabilities from '../components/Adaptabilities';
import { WIDTH } from '../constants';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    width: '30%',
    margin: 3,
    justifyContent: 'space-between',
  },
  statValueContainer: {
    flexDirection: 'row',
  },
  statValue: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 25,
    marginTop: 5,
  },
});

class Profile extends React.Component {
  state = {
    selected: Object.entries(data)[0][1].title,
  };

  render() {
    const { props } = this;
    return (
      <Background>
        <View style={styles.headerContainer}>
          <View>
            <Header prefix={`${props.displayName}'s`} title="Profile" />
            <Button
              title="REQUEST FOR FEEDBACK"
              onPress={() => props.navigation.navigate('RequestFeedback')}
            />
          </View>
          <RightHeader title="My values" items={['Communication', 'Flexible', 'Confident']} />
        </View>

        <View style={styles.stats}>
          {[
            {
              title: 'Current Leaderboard Ranking',
              value: 12,
              up: true,
              backgroundColor: '#C4D600',
            },
            {
              title: 'Hacks Done',
              value: 24,
              up: false,
              backgroundColor: '#43B02A',
            },
            {
              title: 'Feedbacks Received',
              value: 47,
              up: true,
              backgroundColor: '#046A38',
              textColor: 'white',
            },
          ].map(info => (
            <Card key={info.title} style={[styles.stat, { backgroundColor: info.backgroundColor }]}>
              <Text style={{ color: info.textColor }}>{info.title}</Text>
              <View style={styles.statValueContainer}>
                <MaterialCommunityIcons
                  style={[styles.arrow, { color: info.textColor }]}
                  name={info.up ? 'arrow-up' : 'arrow-down'}
                />
                <Text style={[styles.statValue, { color: info.textColor }]}>{info.value}</Text>
              </View>
            </Card>
          ))}
        </View>

        <Adaptabilities
          onPress={title => this.setState({ selected: title })}
          selected={this.state.selected}
        />

        <Button title="SUBMIT A HACK" onPress={() => props.navigation.navigate('SubmitHack')} />
      </Background>
    );
  }
}
export default connect(state => ({ displayName: state.user.displayName }))(Profile);
