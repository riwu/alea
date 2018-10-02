import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { register } from '../actions';
import Title from '../components/Title';
import PageWithCard from '../components/PageWithCard';
import AddMember from '../components/AddMember';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  add: {
    marginBottom: 20,
  },
});

class RequestFeedback extends React.Component {
  state = {
    selected: [],
  };

  render() {
    const { props } = this;
    return (
      <PageWithCard
        prefix="Request"
        title="Feedback"
        button={{ title: 'SEND' }}
        rightHeader={{
          title: 'Team Members',
          items: this.state.selected,
        }}
      >
        <View style={styles.headerContainer}>
          <Title>Select Team Members</Title>
          <AddMember style={styles.add} />
        </View>
      </PageWithCard>
    );
  }
}
export default connect(
  null,
  { register },
)(RequestFeedback);
