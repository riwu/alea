import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo';
import { WIDTH } from '../constants';
import data from '../pages/data';
import Title from './Title';

const dataArr = Object.entries(data);

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
  <React.Fragment>
    {props.showTitle && <Title>{dataArr[props.index][1].title}</Title>}
    <FlatList
      numColumns={2}
      keyExtractor={([id]) => id}
      data={Object.entries(dataArr[props.index][1].traits)}
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
  </React.Fragment>
);

export default AdaptabilitiesSelection;
