import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { addMember } from '../actions';
import Button from './Button';
import { NameInput, EmailInput } from './TextInputs';
import isValidEmail from '../util/isValidEmail';

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    padding: 20,
  },
  cancel: {
    backgroundColor: 'white',
  },
  cancelText: {
    color: '#86BC25',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

class AddMember extends React.Component {
  state = {
    modalVisible: false,
    name: '',
    email: '',
  };

  toggleModal = () => {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
  };

  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <Modal isVisible={this.state.modalVisible}>
          <View style={styles.modalView}>
            <NameInput onChangeText={name => this.setState({ name })} />
            <EmailInput onChangeText={email => this.setState({ email })} />
            <View style={styles.buttons}>
              <Button
                onPress={this.toggleModal}
                title="Cancel"
                style={styles.cancel}
                textStyle={styles.cancelText}
              />
              <Button
                onPress={() => {
                  const [email, name] = ['email', 'name'].map(key => this.state[key].trim());

                  if (!isValidEmail(email)) {
                    Alert.alert('Invalid email address');
                    return;
                  }

                  props
                    .addMember({ name, email }) // allow empty name
                    .then(() => this.toggleModal())
                    .catch(e => Alert.alert('Failed to add member', e.message));
                }}
                title="Add"
              />
            </View>
          </View>
        </Modal>
        <Button onPress={this.toggleModal} style={props.style} title="Add new" />
      </React.Fragment>
    );
  }
}
export default connect(
  null,
  { addMember },
)(AddMember);
