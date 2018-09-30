import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './Card';

const styles = StyleSheet.create({
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

const Stats = () => (
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
);

export default Stats;
