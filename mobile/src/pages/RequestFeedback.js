import React from 'react';
import {
  View, StyleSheet, FlatList, Alert,
} from 'react-native';
import {
  ListItem, CheckBox, Text, Left, Body, Right, Icon, Toast,
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
});

class RequestFeedback extends React.Component {
  state = {
    selected: {},
  };

  render() {
    const { props } = this;
    const selectedIds = Object.entries(this.state.selected)
      .filter(([id, selected]) => selected && props.members[id])
      .map(([id]) => id);
    return (
      <PageWithCard
        prefix="Request"
        title="Feedback"
        button={{
          title: 'SEND',
          disabled: selectedIds.length === 0,
          onPress: () => {
            requestFeedback(selectedIds.map(id => props.members[id].email))
              .then(() => {
                this.setState({ selected: {} });
                Toast.show({
                  text: 'Feedback requested!',
                  type: 'success',
                  duration: 3000,
                });
              })
              .catch((e) => {
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
    );
  }
}
export default connect(
  state => ({ members: state.members }),
  { register },
)(RequestFeedback);
