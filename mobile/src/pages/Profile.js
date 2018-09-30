import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import data from './data';
import Adaptabilities from '../components/Adaptabilities';
import Page from '../components/Page';
import Stats from '../components/Stats';

class Profile extends React.Component {
  state = {
    selected: Object.entries(data)[0][1].title,
  };

  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <Page
          prefix={`${props.displayName}'s`}
          title="Profile"
          button={{
            title: 'REQUEST FOR FEEDBACK',
            onPress: () => props.navigation.navigate('RequestFeedback'),
          }}
          rightHeader={{
            title: 'My values',
            items: ['Communication', 'Flexible', 'Confident'],
          }}
        >
          <Stats />
          <Adaptabilities
            onPress={title => this.setState({ selected: title })}
            isSelected={title => this.state.selected === title}
          />
        </Page>

        <Button title="SUBMIT A HACK" onPress={() => props.navigation.navigate('SubmitHack')} />
      </React.Fragment>
    );
  }
}
export default connect(state => ({ displayName: state.user.displayName }))(Profile);
