import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, TouchableOpacity, FlatList, Alert,
} from 'react-native';
import { LinearGradient } from 'expo';
import { updateUser } from '../actions';
import Title from '../components/Title';
import data from './data';
import { WIDTH } from '../constants';
import PageWithCard from '../components/PageWithCard';
import handleSessionExpired from '../util/handleSessionExpired';

const dataArr = Object.entries(data);

const styles = StyleSheet.create({
  traitContainer: {
    width: WIDTH / 2 - 55,
    margin: 5,
    padding: 10,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'hidden',

    flexGrow: 1,
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
      <PageWithCard
        prefix="Customize your"
        title="Profile"
        backAction={
          this.state.index === 0
            ? null
            : () => this.setState(prevState => ({ index: prevState.index - 1 }))
        }
        button={{
          title: 'NEXT',
          onPress: () => {
            if (this.state.index < dataArr.length - 1) {
              this.setState(prevState => ({ index: prevState.index + 1 }));
            } else {
              props
                .updateUser({
                  adaptabilities: Object.entries(this.state.selected)
                    .filter(([, isSelected]) => isSelected)
                    .map(([id]) => Number(id)),
                })
                .then(() => props.navigation.navigate('Profile'))
                .catch((e) => {
                  if (!handleSessionExpired(e, props)) {
                    Alert.alert(
                      'Failed to update profile',
                      'Please check your Internet connection.',
                    );
                  }
                });
            }
          },
        }}
      >
        <Title>{dataArr[this.state.index][1].title}</Title>
        <FlatList
          numColumns={2}
          keyExtractor={([id]) => id}
          data={Object.entries(dataArr[this.state.index][1].traits)}
          renderItem={({ item: [id, trait] }) => {
            const Component = this.state.selected[id] ? LinearGradientView : View;
            return (
              <TouchableOpacity
                onPress={() => this.setState(prevState => ({
                  selected: { ...prevState.selected, [id]: !prevState.selected[id] },
                }))
                }
              >
                <Component style={styles.traitContainer}>
                  <Text style={styles.traitTextStyle}>{trait}</Text>
                </Component>
              </TouchableOpacity>
            );
          }}
        />
      </PageWithCard>
    );
  }
}
export default connect(
  null,
  { updateUser },
)(CustomizeProfile);
