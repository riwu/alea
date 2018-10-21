import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo';
import { WIDTH } from '../constants';

const styles = StyleSheet.create({
  traitContainer: {
    width: WIDTH / 2 - 40,
    margin: 5,
    padding: 10,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'hidden',

    flexGrow: 1,
  },
  traitTextStyle: {
    fontSize: 16,
  },
});

const LinearGradientView = props => (
  <LinearGradient colors={['#86BC25', '#C4D600']} style={props.style}>
    {props.children}
  </LinearGradient>
);

const AdaptabilitiesSelection = props => (
  <FlatList
    numColumns={2}
    keyExtractor={([id]) => id}
    data={props.data}
    renderItem={({ item: [id, trait] }) => {
      const Component = props.selected[id] ? LinearGradientView : View;
      return (
        <TouchableOpacity onPress={() => props.onSelect(id)}>
          <Component style={styles.traitContainer}>
            <Text style={styles.traitTextStyle}>{trait}</Text>
          </Component>
        </TouchableOpacity>
      );
    }}
    {...props}
  />
);

export default AdaptabilitiesSelection;
