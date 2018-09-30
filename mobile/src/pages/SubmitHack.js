import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput } from 'react-native';
import { register } from '../actions';
import Title from '../components/Title';
import Adaptabilities from '../components/Adaptabilities';
import PageWithCard from '../components/PageWithCard';

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
  };

  render() {
    const { props } = this;
    return (
      <PageWithCard prefix="Submit your" title="Hack" button={{ title: 'SUBMIT' }}>
        <Title>Hack Details</Title>
        <Adaptabilities
          onPress={title => this.setState(prevState => ({
            selected: { ...prevState.selected, [title]: !prevState.selected[title] },
          }))
          }
          isSelected={title => this.state.selected[title]}
        />
        <TextInput multiline style={styles.input} placeholder="Enter your hack" />
      </PageWithCard>
    );
  }
}
export default connect(
  null,
  { register },
)(SubmitHack);
