import React from 'react';
import {
  View, StyleSheet, FlatList, Alert,
} from 'react-native';
import {
  ListItem, CheckBox, Text, Left, Body, Right, Icon, Toast, Spinner,
} from 'native-base';
import { connect } from 'react-redux';
import { register } from '../actions';
import Title from '../components/Title';
import PageWithCard from '../components/PageWithCard';
import AddMember from '../components/AddMember';
import DeleteMembers from '../components/DeleteMembers';
import { requestFeedback } from '../actions/api';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  add: {
    marginBottom: 20,
  },
  icon: {
    fontSize: 30,
    color: 'gray',
  },
  delete: {
    alignSelf: 'flex-end',
  },
  spinnerContainer: {
    // blocks click event by taking up all spaces
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
});

class RequestFeedback extends React.Component {
  state = {
    selected: {},
    isWaiting: false,
  };

  render() {
    const { props } = this;
    const selectedIds = Object.entries(this.state.selected)
      .filter(([id, selected]) => selected && props.members[id])
      .map(([id]) => id);
    return (
      <React.Fragment>
        {this.state.isWaiting && (
          <View style={styles.spinnerContainer}>
            <Spinner />
          </View>
        )}
        <PageWithCard
          prefix="Request"
          title="Feedback"
          button={{
            title: 'SEND',
            disabled: selectedIds.length === 0 || this.state.isWaiting,
            onPress: () => {
              this.setState({ isWaiting: true });
              requestFeedback(selectedIds.map(id => props.members[id].email))
                .then(() => {
                  Toast.show({
                    text: `Feedback request sent to ${selectedIds
                      .map(id => props.members[id].name)
                      .join(', ')}.`,
                    type: 'success',
                    duration: 3000,
                  });
                  props.navigation.pop();
                })
                .catch((e) => {
                  this.setState({ isWaiting: false });
                  Alert.alert('Feedback request failed', e.response.data);
                });
            },
          }}
          rightHeader={{
            title: 'Team Members',
            items: selectedIds.map(id => ({ id, label: props.members[id].name })),
          }}
        >
          <View style={styles.headerContainer}>
            <Title>Select Members</Title>
            <AddMember navigation={props.navigation} style={styles.add} />
          </View>
          <FlatList
            data={Object.entries(props.members)}
            keyExtractor={([id]) => id}
            renderItem={({ item: [id, member] }) => (
              <ListItem icon>
                <Left>
                  <Icon name="ios-contact" style={styles.icon} />
                </Left>
                <Body>
                  <Text>{member.name}</Text>
                  <Text note>{member.email}</Text>
                </Body>
                <Right>
                  <CheckBox
                    color="#86BC25"
                    checked={this.state.selected[id]}
                    onPress={() => this.setState(prevState => ({
                      selected: {
                        ...prevState.selected,
                        [id]: !prevState.selected[id],
                      },
                    }))
                    }
                  />
                </Right>
              </ListItem>
            )}
          />
          {selectedIds.length && (
            <DeleteMembers navigation={props.navigation} style={styles.delete} ids={selectedIds} />
          )}
        </PageWithCard>
      </React.Fragment>
    );
  }
}
export default connect(
  state => ({ members: state.members }),
  { register },
)(RequestFeedback);
