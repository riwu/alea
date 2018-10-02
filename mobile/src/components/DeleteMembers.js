import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import Button from './Button';
import { deleteMembers } from '../actions';

const DeleteMembers = props => (
  <Button
    title="Delete Selected"
    style={props.style}
    onPress={() => props
      .deleteMembers(props.ids)
      .then(() => Alert.alert('Successfully deleted selected members'))
      .catch(e => Alert.alert('Failed to delete members', e.message))
    }
  />
);

export default connect(
  null,
  { deleteMembers },
)(DeleteMembers);
