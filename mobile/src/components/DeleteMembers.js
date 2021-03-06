import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';
import { Toast } from 'native-base';
import ButtonComponent from './Button';
import { deleteMembers } from '../actions';
import handleSessionExpired from '../util/handleSessionExpired';

const styles = StyleSheet.create({
  delete: {
    backgroundColor: 'red',
  },
});

const DeleteMembers = props => (
  <ButtonComponent
    title="Delete Selected"
    style={[styles.delete, props.style]}
    onPress={() => props
      .deleteMembers(props.ids)
      .then(() => Toast.show({
        text: 'Successfully deleted selected members',
        type: 'success',
        duration: 2000,
      }))
      .catch((e) => {
        if (!handleSessionExpired(e, props)) {
          Alert.alert('Failed to delete members', (e.response || {}).data);
        }
      })
    }
  />
);

export default connect(
  null,
  { deleteMembers },
)(DeleteMembers);
