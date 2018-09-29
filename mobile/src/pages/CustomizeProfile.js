import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, TouchableOpacity, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo';
import Button from '../components/Button';
import { register } from '../actions';
import Header from '../components/Header';
import Background from '../components/Background';
import Card from '../components/Card';
import Title from '../components/Title';
import data from './data';
import { WIDTH } from '../constants';

const dataArr = Object.entries(data);

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
  trailContainer: {
    width: WIDTH / 2 - 50,
    height: WIDTH / 2 - 80,
    margin: 5,
    padding: 10,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'hidden',
  },
  traitTextStyle: {
    fontSize: 16,
  },
});

const LinearGradientView = props => (
  <LinearGradient colors={['#86BC25', '#C4D600']} style={props.style}>
    {props.children}
  </LinearGradient>
);

class CustomizeProfile extends React.Component {
  state = {
    index: 0,
    selected: {},
  };

  render() {
    const { props } = this;
    return (
      <Background>
        <Header prefix="Customize your" title="Profile" />
        <View style={styles.buttons}>
          <Button title="BACK" onPress={() => props.navigation.pop()} style={styles.backButton} />
          <Button
            title="NEXT"
            onPress={() => {
              if (this.state.index < dataArr.length - 1) {
                this.setState(prevState => ({ index: prevState.index + 1 }));
              } else {
                props.navigation.navigate('Profile');
              }
            }}
          />
        </View>

        <Card style={styles.card}>
          <Title>{dataArr[this.state.index][1].title}</Title>
          <FlatList
            numColumns={2}
            keyExtractor={([id]) => id}
            data={Object.entries(dataArr[this.state.index][1].traits)}
            renderItem={({ item: [id, trait] }) => {
              const Component = this.state.selected[id] ? LinearGradientView : View;
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => this.setState(prevState => ({
                    selected: { ...prevState.selected, [id]: !prevState.selected[id] },
                  }))
                  }
                >
                  <Component style={styles.trailContainer}>
                    <Text style={styles.traitTextStyle}>{trait}</Text>
                  </Component>
                </TouchableOpacity>
              );
            }}
          />
        </Card>
      </Background>
    );
  }
}
export default connect(
  null,
  { register },
)(CustomizeProfile);
