import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { updateUser } from '../actions';
import Title from '../components/Title';
import data from './data';
import PageWithCard from '../components/PageWithCard';
import AdaptabilitiesSelection from '../components/AdaptabilitiesSelection';
import handleSessionExpired from '../util/handleSessionExpired';

const dataArr = Object.entries(data);

class CustomizeProfile extends React.Component {
  state = {
    index: 0,
    selected: {},
  };

  render() {
    const { props } = this;
    return (
      <PageWithCard
        prefix="Customize your"
        title="Profile"
        backAction={
          this.state.index === 0
            ? null
            : () => this.setState(prevState => ({ index: prevState.index - 1 }))
        }
        button={{
          title: 'NEXT',
          onPress: () => {
            if (this.state.index < dataArr.length - 1) {
              this.setState(prevState => ({ index: prevState.index + 1 }));
            } else {
              props
                .updateUser({
                  adaptabilities: Object.entries(this.state.selected)
                    .filter(([, isSelected]) => isSelected)
                    .map(([id]) => Number(id)),
                })
                .then(() => props.navigation.navigate('Profile'))
                .catch((e) => {
                  if (!handleSessionExpired(e, props)) {
                    Alert.alert(
                      'Failed to update profile',
                      'Please check your Internet connection.',
                    );
                  }
                });
            }
          },
        }}
      >
        <Title>{dataArr[this.state.index][1].title}</Title>
        <AdaptabilitiesSelection
          data={Object.entries(dataArr[this.state.index][1].traits)}
          selected={this.state.selected}
          onSelect={id => this.setState(prevState => ({
            selected: { ...prevState.selected, [id]: !prevState.selected[id] },
          }))
          }
        />
      </PageWithCard>
    );
  }
}
export default connect(
  null,
  { updateUser },
)(CustomizeProfile);
