import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';
import { Textarea, Toast } from 'native-base';
import { Svg } from 'expo';
import { sendFeedback } from '../actions/api';
import PageWithCard from '../components/PageWithCard';
import AdaptabilitiesSelection from '../components/AdaptabilitiesSelection';
import Title from '../components/Title';
import Spinner from '../components/Spinner';
import handleSessionExpired from '../util/handleSessionExpired';
import data from './data';
import Adaptabilities from '../components/Adaptabilities';

const dataArr = Object.entries(data);

const styles = StyleSheet.create({
  adaptabilities: {
    paddingBottom: 10,
  },
});

class SendFeedback extends React.Component {
  state = {
    categoryIndex: 0,
    memberIndex: 0,
    selected: {},
    isWaiting: false,
  };

  render() {
    const { props } = this;
    const { selectedIds } = props.navigation.state.params;
    const member = props.members[selectedIds[this.state.memberIndex]];
    const commentIndex = dataArr.length;
    const isAtSelection = this.state.categoryIndex !== commentIndex;
    return (
      <PageWithCard
        keyboardAvoidingView
        prefix="How is"
        title={`${member.name} doing?`}
        button={{
          title: 'SUBMIT',
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
        }}
      >
        <Spinner animating={this.state.isWaiting} />
        <Adaptabilities
          style={styles.adaptabilities}
          onPress={categoryIndex => this.setState({ categoryIndex })}
          isSelected={categoryIndex => this.state.categoryIndex === categoryIndex}
          extraData={{
            [Number(dataArr[dataArr.length - 1][0]) + 1]: {
              title: 'Comments',
              Icon: ({ fill }) => (
                <Svg width={56} height={56}>
                  <Svg.G transform="translate(16,38) scale(0.1,-0.1)">
                    <Svg.Path
                      fill={fill}
                      d="M53 240 c-17 -10 -37 -28 -42 -39 -16 -29 -13 -88 4 -115 14 -21 14
                        -24 0 -36 -8 -7 -15 -21 -15 -31 0 -23 43 -25 80 -4 14 8 38 14 53 15 92 1
                        155 94 113 168 -33 60 -129 81 -193 42z m148 -39 c38 -38 38 -74 0 -112 -22
                        -21 -39 -29 -66 -29 -20 0 -45 -5 -56 -10 -16 -9 -19 -7 -19 13 0 14 -7 30
                        -15 37 -27 22 -19 75 16 104 44 37 101 36 140 -3z"
                    />
                  </Svg.G>
                </Svg>
              ),
            },
          }}
        />

        {isAtSelection ? (
          <AdaptabilitiesSelection
            index={this.state.categoryIndex}
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
              onChangeText={(text) => {
                this.comments = text;
              }}
              rowSpan={5}
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
