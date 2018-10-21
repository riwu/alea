import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Adaptabilities from './Adaptabilities';
import data from '../pages/data';
import { moveHackToEnd } from '../actions';

const dataArr = Object.entries(data);

const styles = StyleSheet.create({
  hacks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 10,
  },
  hack: {
    width: '45%',
    margin: '1%',
    borderRadius: 8,
    padding: 10,
  },
  text: {
    color: 'white',
  },
  close: {
    fontSize: 20,
    color: 'white',
    textAlign: 'right',
  },
});

class Hacks extends React.Component {
  state = {
    selected: 0,
  };

  render() {
    const { props } = this;
    const [id] = dataArr[this.state.selected];
    return (
      <View>
        <Adaptabilities
          onPress={i => this.setState({ selected: i })}
          isSelected={i => this.state.selected === i}
        />
        <View style={styles.hacks}>
          {(props.hacks[id] || []).slice(0, 4).map((hack, index) => (
            <LinearGradient
              colors={['#046A38', '#62B5E5']}
              start={[0, 0]}
              key={hack.id}
              style={styles.hack}
            >
              <MaterialCommunityIcons
                name="close"
                onPress={() => props.moveHackToEnd(id, index)}
                style={styles.close}
              />
              <Text style={styles.text}>{hack.text}</Text>
            </LinearGradient>
          ))}
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({ hacks: state.hacks }),
  { moveHackToEnd },
)(Hacks);
