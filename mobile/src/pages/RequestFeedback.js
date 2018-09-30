import React from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';
import Title from '../components/Title';
import PageWithCard from '../components/PageWithCard';

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
        <Title>Add Team Members</Title>
      </PageWithCard>
    );
  }
}
export default connect(
  null,
  { register },
)(RequestFeedback);
