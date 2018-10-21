import React from 'react';
import { connect } from 'react-redux';
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
    marginLeft: '2.5%',
    justifyContent: 'space-between',
  },
  statValueContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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

const Stats = props => (
  <View style={[styles.stats, props.style]}>
    {[
      {
        title: 'Current Leaderboard Ranking',
        value: props.rank.adaptability,
        up: true,
        backgroundColor: '#C4D600',
      },
      {
        title: 'Hacks Done',
        value: Object.values(props.hacks).reduce(
          (acc, hacks) => acc + hacks.filter(hack => hack.userId === props.userId).length,
          0,
        ),
        up: false,
        backgroundColor: '#43B02A',
        valueColor: '#DA291C',
      },
      {
        title: 'Insights Received',
        value: Object.keys(props.feedback).length,
        up: true,
        backgroundColor: '#046A38',
        titleColor: 'white',
        valueColor: 'white',
      },
    ].map(info => (
      <Card key={info.title} style={[styles.stat, { backgroundColor: info.backgroundColor }]}>
        <Text style={{ color: info.titleColor }}>{info.title}</Text>
        <View style={styles.statValueContainer}>
          <MaterialCommunityIcons
            style={[styles.arrow, { color: info.valueColor }]}
            name={info.up ? 'arrow-up' : 'arrow-down'}
          />
          <Text style={[styles.statValue, { color: info.valueColor }]}>{info.value}</Text>
        </View>
      </Card>
    ))}
  </View>
);

export default connect(state => ({
  userId: state.user.id,
  feedback: state.feedback,
  hacks: state.hacks,
  rank: state.rank,
  adaptabilities: state.user.adaptabilities,
}))(Stats);
