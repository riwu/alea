import React from 'react';
import { StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import Card from './Card';
import Title from './Title';

const styles = StyleSheet.create({
  title: {
    marginBottom: 0,
  },
});

const data = [
  {
    title: 'Overall Adaptability',
    values: [
      { x: 'Mar 18', y: 25 },
      { x: 'Apr 18', y: 33 },
      { x: 'May 18', y: 47 },
      { x: 'Jun 18', y: 41 },
    ],
  },
  {
    title: 'Personal Adaptability',
    values: [
      { x: 'Mar 18', y: 12 },
      { x: 'Apr 18', y: 24 },
      { x: 'May 18', y: 4 },
      { x: 'Jun 18', y: 6 },
    ],
  },
  {
    title: 'Interpersonal Adaptability',
    values: [
      { x: 'Mar 18', y: 16 },
      { x: 'Apr 18', y: 3 },
      { x: 'May 18', y: 4 },
      { x: 'Jun 18', y: 7 },
    ],
  },
  {
    title: 'Collective Adaptability',
    values: [
      { x: 'Mar 18', y: 12 },
      { x: 'Apr 18', y: 3 },
      { x: 'May 18', y: 6 },
      { x: 'Jun 18', y: 4 },
    ],
  },
  {
    title: 'Contextual Adaptability',
    values: [
      { x: 'Mar 18', y: 6 },
      { x: 'Apr 18', y: 7 },
      { x: 'May 18', y: 9 },
      { x: 'Jun 18', y: 11 },
    ],
  },
];

class Graph extends React.Component {
  static defaultProps = {
    data,
  };

  state = {
    index: 0,
  };

  render() {
    const { props } = this;
    return (
      <Card style={props.style}>
        <Title style={styles.title}>{props.data[this.state.index].title}</Title>
        <VictoryChart theme={VictoryTheme.material} height={200}>
          <VictoryLine
            style={{
              data: { stroke: '#86BC25' },
            }}
            data={props.data[this.state.index].values}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPress: () => this.setState(prevState => ({
                    index: (prevState.index + 1) % data.length,
                  })),
                },
              },
            ]}
          />
        </VictoryChart>
      </Card>
    );
  }
}

export default Graph;
