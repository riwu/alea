import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';
import { Textarea, Toast } from 'native-base';
import { sendFeedback } from '../actions/api';
import PageWithCard from '../components/PageWithCard';
import AdaptabilitiesSelection from '../components/AdaptabilitiesSelection';
import Title from '../components/Title';
import Spinner from '../components/Spinner';
import handleSessionExpired from '../util/handleSessionExpired';
import data from './data';

const dataArr = Object.entries(data);

const styles = StyleSheet.create({
  comments: {
    marginTop: 15,
  },
});

class SendFeedback extends React.Component {
  state = {
    index: 0,
    memberIndex: 0,
    selected: {},
    isWaiting: false,
  };

  render() {
    const { props } = this;
    const { selectedIds } = props.navigation.state.params;
    const member = props.members[selectedIds[this.state.memberIndex]];
    const isAtSelection = this.state.index < dataArr.length;
    return (
      <PageWithCard
        keyboardAvoidingView
        prefix="How is"
        title={`${member.name} doing?`}
        backAction={
          this.state.index === 0
            ? null
            : () => this.setState(prevState => ({ index: prevState.index - 1 }))
        }
        button={
          isAtSelection
            ? {
              title: 'NEXT',
              onPress: () => this.setState(prevState => ({ index: prevState.index + 1 })),
            }
            : {
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
                    if (this.state.memberIndex < selectedIds.length - 1) {
                      this.setState(prevState => ({
                        memberIndex: prevState.memberIndex + 1,
                        selected: {},
                        index: 0,
                        isWaiting: false,
                      }));
                      this.comments = '';
                    } else {
                      props.navigation.pop();
                    }
                    Toast.show({
                      text: `Insight sent to ${member.name}`,
                      type: 'success',
                      duration: 2000,
                    });
                  })
                  .catch((e) => {
                    if (!handleSessionExpired(e, props)) {
                      Alert.alert('Failed to send insight', e.message);
                      this.setState({ isWaiting: false });
                    }
                  });
              },
            }
        }
      >
        <Spinner animating={this.state.isWaiting} />
        {isAtSelection ? (
          <AdaptabilitiesSelection
            index={this.state.index}
            selected={this.state.selected}
            onSelect={id => this.setState(prevState => ({
              selected: { ...prevState.selected, [id]: !prevState.selected[id] },
            }))
            }
          />
        ) : (
          <React.Fragment>
            <Title>Comments</Title>
            <Textarea
              style={styles.comments}
              onChangeText={(text) => {
                this.comments = text;
              }}
              rowSpan={8}
              bordered
              placeholder="Enter your comments"
              blurOnSubmit
            />
          </React.Fragment>
        )}
      </PageWithCard>
    );
  }
}
export default connect(state => ({ members: state.members }))(SendFeedback);
