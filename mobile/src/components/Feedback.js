import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  ListItem, CheckBox, Text, Left, Body, Right, Icon,
} from 'native-base';
import { connect } from 'react-redux';
import Title from './Title';
import PageWithCard from './PageWithCard';
import AddMember from './AddMember';
import DeleteMembers from './DeleteMembers';

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

class Feedback extends React.Component {
  state = {
    selected: {},
  };

  render() {
    const { props } = this;
    const selectedIds = Object.entries(this.state.selected)
      .filter(([id, selected]) => selected && props.members[id])
      .map(([id]) => id);
    return (
      <React.Fragment>
        {props.children}
        <PageWithCard
          prefix={props.prefix}
          title="Feedback"
          button={{
            title: props.buttonTitle,
            disabled: selectedIds.length === 0 || props.disabled,
            onPress: () => props.onPress(selectedIds),
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
export default connect(state => ({ members: state.members }))(Feedback);
