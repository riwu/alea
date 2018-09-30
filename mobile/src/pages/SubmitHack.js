import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, Alert } from 'react-native';
import { submitHack } from '../actions';
import Title from '../components/Title';
import Adaptabilities from '../components/Adaptabilities';
import PageWithCard from '../components/PageWithCard';
import handleSessionExpired from '../util/handleSessionExpired';

const styles = StyleSheet.create({
  input: {
    height: 200,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#D0D0CE',
    marginTop: 20,
    padding: 10,
  },
});

class SubmitHack extends React.Component {
  state = {
    selected: {},
    text: '',
    isWaiting: false,
  };

  render() {
    const { props } = this;
    const trimmedText = this.state.text.trim();
    const selected = Object.entries(this.state.selected).filter(([, isSelected]) => isSelected);
    return (
      <PageWithCard
        keyboardAvoidingView
        prefix="Submit your"
        title="Hack"
        button={{
          title: 'SUBMIT',
          onPress: () => {
            this.setState({ isWaiting: true });
            props
              .submitHack({
                text: trimmedText,
                categories: selected.map(([id]) => Number(id)),
              })
              .then(() => Alert.alert('Successfully submitted hack', 'Thank you for your contribution!', [
                { text: 'Done', onPress: () => props.navigation.pop() },
              ]))
              .catch((e) => {
                if (!handleSessionExpired(e, props)) {
                  Alert.alert('Failed to submit hack', 'Please check your Internet connection.');
                  this.setState({ isWaiting: false });
                }
              });
          },
          disabled: !trimmedText || !selected.length || this.state.isWaiting,
        }}
      >
        <Title>Hack Details</Title>
        <Adaptabilities
          onPress={id => this.setState(prevState => ({
            selected: { ...prevState.selected, [id]: !prevState.selected[id] },
          }))
          }
          isSelected={id => this.state.selected[id]}
        />
        <TextInput
          multiline
          style={styles.input}
          placeholder="Enter your hack"
          onChangeText={text => this.setState({ text })}
          blurOnSubmit
        />
      </PageWithCard>
    );
  }
}
export default connect(
  null,
  { submitHack },
)(SubmitHack);
