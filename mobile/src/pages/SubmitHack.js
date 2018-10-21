import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';
import { Textarea, Toast } from 'native-base';
import { submitHack } from '../actions';
import Title from '../components/Title';
import Adaptabilities from '../components/Adaptabilities';
import PageWithCard from '../components/PageWithCard';
import handleSessionExpired from '../util/handleSessionExpired';

const styles = StyleSheet.create({
  input: {
    borderRadius: 2,
    marginTop: 20,
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
              .then(() => {
                Toast.show({
                  text: 'Successfully submitted hack!',
                  type: 'success',
                  duration: 3000,
                });
                props.navigation.pop();
              })
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
        <Textarea
          rowSpan={5}
          bordered
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
