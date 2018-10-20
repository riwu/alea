import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, TouchableOpacity, FlatList,
} from 'react-native';
import { Textarea, Toast } from 'native-base';
import { LinearGradient } from 'expo';
import { sendFeedback } from '../actions/api';
import data from './data';
import { WIDTH } from '../constants';
import PageWithCard from '../components/PageWithCard';
import handleError from '../util/handleError';
import Spinner from '../components/Spinner';

const allTraits = Object.values(data).reduce((acc, { traits }) => {
  acc.push(...Object.entries(traits));
  return acc;
}, []);

const getRandomTraits = () => {
  const indexes = new Set();
  while (indexes.size < 6) {
    indexes.add(Math.floor(Math.random() * allTraits.length));
  }

  return [...indexes].map(i => allTraits[i]);
};

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

class SendFeedback extends React.Component {
  state = {
    index: 0,
    selected: {},
    data: getRandomTraits(),
    isWaiting: false,
  };

  render() {
    const { props } = this;
    const { selectedIds } = props.navigation.state.params;
    const member = props.members[selectedIds[this.state.index]];
    return (
      <PageWithCard
        keyboardAvoidingView
        prefix="How is"
        title={`${member.name} doing?`}
        button={{
          title: 'SEND',
          disabled: this.state.isWaiting,
          onPress: () => {
            this.setState({ isWaiting: true });
            sendFeedback({
              email: member.email,
              adaptabilities: Object.entries(this.state.selected)
                .filter(([, isSelected]) => isSelected)
                .map(([id]) => Number(id)),
              comments: (this.comments || '').trim(),
            })
              .then(() => {
                if (this.state.index < selectedIds.length - 1) {
                  this.setState(prevState => ({
                    index: prevState.index + 1,
                    data: getRandomTraits(),
                    selected: {},
                    isWaiting: false,
                  }));
                  this.comments = '';
                } else {
                  props.navigation.pop();
                }
                Toast.show({
                  text: `Feedback sent to ${member.name}`,
                  type: 'success',
                  duration: 2000,
                });
              })
              .catch((e) => {
                this.setState({ isWaiting: false });
                handleError(e);
              });
          },
        }}
      >
        <Spinner animating={this.state.isWaiting} />
        <FlatList
          numColumns={2}
          keyExtractor={([id]) => id}
          data={this.state.data}
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
          ListFooterComponent={(
            <Textarea
              onChangeText={(text) => {
                this.comments = text;
              }}
              rowSpan={3}
              bordered
              placeholder="Additional Comments"
            />
)}
        />
      </PageWithCard>
    );
  }
}
export default connect(state => ({ members: state.members }))(SendFeedback);
