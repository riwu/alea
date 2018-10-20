import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import Button from './Button';
import { deleteMembers } from '../actions';
import handleSessionExpired from '../util/handleSessionExpired';

const DeleteMembers = props => (
  <Button
    title="Delete Selected"
    style={props.style}
    onPress={() => props
      .deleteMembers(props.ids)
      .then(() => Alert.alert('Successfully deleted selected members'))
      .catch((e) => {
        if (!handleSessionExpired(e, props)) {
          Alert.alert('Failed to delete members', e.response.data);
        }
      })
    }
  />
);

export default connect(
  null,
  { deleteMembers },
)(DeleteMembers);
