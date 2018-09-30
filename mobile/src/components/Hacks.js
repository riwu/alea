import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Adaptabilities from './Adaptabilities';
import data from '../pages/data';
import { moveHackToEnd } from '../actions';

const styles = StyleSheet.create({
  hacks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    selected: Object.entries(data)[0][0],
  };

  render() {
    const { props } = this;
    return (
      <View>
        <Adaptabilities
          onPress={id => this.setState({ selected: id })}
          isSelected={id => this.state.selected === id}
        />
        <View style={styles.hacks}>
          {(props.hacks[this.state.selected] || []).slice(0, 4).map(hack => (
            <LinearGradient colors={['#046A38', '#62B5E5']} key={hack} style={styles.hack}>
              <MaterialCommunityIcons
                name="close"
                onPress={() => props.moveHackToEnd(this.state.selected)}
                style={styles.close}
              />
              <Text style={styles.text}>{hack}</Text>
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