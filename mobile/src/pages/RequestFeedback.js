import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Toast } from 'native-base';
import { requestFeedback } from '../actions/api';
import Feedback from '../components/Feedback';
import Spinner from '../components/Spinner';
import handleSessionExpired from '../util/handleSessionExpired';

class RequestFeedback extends React.Component {
  state = {
    isWaiting: false,
  };

  render() {
    const { props } = this;
    return (
      <Feedback
        navigation={props.navigation}
        disabled={this.state.isWaiting}
        prefix="Request"
        buttonTitle="SEND"
        onPress={(selectedIds) => {
          this.setState({ isWaiting: true });
          requestFeedback(selectedIds)
            .then(() => {
              Toast.show({
                text: `Feedback request sent to ${selectedIds
                  .map(id => props.members[id].name)
                  .join(', ')}.`,
                type: 'success',
                duration: 3000,
              });
              props.navigation.pop();
            })
            .catch((e) => {
              if (!handleSessionExpired(e, props)) {
                Alert.alert('Feedback request failed', e.message);
                this.setState({ isWaiting: false });
              }
            });
        }}
      >
        <Spinner animating={this.state.isWaiting} />
      </Feedback>
    );
  }
}

export default connect(state => ({ members: state.members }))(RequestFeedback);
