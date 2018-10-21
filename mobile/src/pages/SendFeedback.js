import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';
import { Textarea, Toast } from 'native-base';
import { sendFeedback } from '../actions/api';
import data from './data';
import PageWithCard from '../components/PageWithCard';
import AdaptabilitiesSelection from '../components/AdaptabilitiesSelection';
import Spinner from '../components/Spinner';
import handleSessionExpired from '../util/handleSessionExpired';

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
  comments: {
    marginTop: 15,
  },
});

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
                if (!handleSessionExpired(e, props)) {
                  Alert.alert('Failed to send feedback', e.message);
                  this.setState({ isWaiting: false });
                }
              });
          },
        }}
      >
        <Spinner animating={this.state.isWaiting} />
        <AdaptabilitiesSelection
          data={this.state.data}
          selected={this.state.selected}
          onSelect={id => this.setState(prevState => ({
            selected: { ...prevState.selected, [id]: !prevState.selected[id] },
          }))
          }
          ListFooterComponent={(
            <Textarea
              style={styles.comments}
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
