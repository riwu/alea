import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput } from 'react-native';
import Button from '../components/Button';
import { register } from '../actions';
import Header from '../components/Header';
import Background from '../components/Background';
import Card from '../components/Card';
import Title from '../components/Title';
import { WIDTH } from '../constants';
import Adaptabilities from '../components/Adaptabilities';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: 'black',
    borderColor: '#86BC25',
    borderWidth: 1,
    marginRight: 8,
  },
  card: {
    width: WIDTH - 40,
    margin: 20,
  },

  input: {
    height: 200,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#D0D0CE',
    marginTop: 20,
    padding: 10,
  },
});

class SubmitHack extends React.Component {
  state = {
    selected: {},
  };

  render() {
    const { props } = this;
    return (
      <Background>
        <Header prefix="Submit your" title="Hack" />
        <View style={styles.buttons}>
          <Button title="BACK" onPress={() => props.navigation.pop()} style={styles.backButton} />
          <Button title="SUBMIT" onPress={() => {}} />
        </View>

        <Card style={styles.card}>
          <Title>Hack Details</Title>
          <Adaptabilities
            onPress={title => this.setState({ selected: title })}
            selected={this.state.selected}
          />
          <TextInput multiline style={styles.input} placeholder="Enter your hack" />
        </Card>
      </Background>
    );
  }
}
export default connect(
  null,
  { register },
)(SubmitHack);
