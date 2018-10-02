import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  ListItem, CheckBox, Text, Left, Body, Right, Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { register } from '../actions';
import Title from '../components/Title';
import PageWithCard from '../components/PageWithCard';
import AddMember from '../components/AddMember';
import DeleteMembers from '../components/DeleteMembers';

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
    const items = Object.entries(this.state.selected)
      .filter(([id, selected]) => selected && props.members[id])
      .map(([id]) => ({ id, label: props.members[id].name }));
    return (
      <PageWithCard
        prefix="Request"
        title="Feedback"
        button={{ title: 'SEND' }}
        rightHeader={{
          title: 'Team Members',
          items,
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
        {items.length && (
          <DeleteMembers
            navigation={props.navigation}
            style={styles.delete}
            ids={items.map(({ id }) => id)}
          />
        )}
      </PageWithCard>
    );
  }
}
export default connect(
  state => ({ members: state.members }),
  { register },
)(RequestFeedback);
