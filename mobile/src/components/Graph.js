import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import Swiper from 'react-native-swiper';
import subMonths from 'date-fns/sub_months';
import format from 'date-fns/format';
import Card from './Card';
import Title from './Title';
import data from '../pages/data';
import { WIDTH } from '../constants';

const dataMap = Object.entries(data).reduce((acc, [id, { traits }]) => {
  Object.keys(traits).forEach((traitId) => {
    acc[traitId] = id;
  });
  return acc;
}, {});

const styles = StyleSheet.create({
  title: {
    paddingBottom: 0,
  },
});

const graphData = [
  {
    id: 0,
    title: 'Overall Adaptability',
  },
  {
    id: 1,
    title: 'Personal Adaptability',
  },
  {
    id: 2,
    title: 'Interpersonal Adaptability',
  },
  {
    id: 3,
    title: 'Collective Adaptability',
  },
  {
    id: 4,
    title: 'Contextual Adaptability',
  },
];

const date = new Date();

const Graph = (props) => {
  const self = props.adaptabilities.map(id => id);
  const feedback = Object.values(props.feedback).reduce((acc, { adaptabilities }) => {
    acc.push(...adaptabilities.map(id => id));
    return acc;
  }, []);
  const computeScore = arr => arr.reduce((acc, id) => {
    acc[dataMap[id]] = (acc[dataMap[id]] || 0) + 1;
    acc[0] = (acc[0] || 0) + 1;
    return acc;
  }, {});

  const score = computeScore(self.concat(feedback));
  const selfScore = computeScore(self);

  return (
    <Swiper loadMinimal height="auto" activeDotColor="#86BC25">
      {graphData.map(info => (
        <Card key={info.id}>
          <Title style={styles.title}>{info.title}</Title>
          <VictoryChart
            theme={VictoryTheme.material}
            height={200}
            width={WIDTH - 40}
            padding={{
              top: 10,
              bottom: 65,
              left: 35,
              right: 30,
            }}
          >
            <VictoryLine
              style={{
                data: { stroke: '#86BC25' },
              }}
              data={[
                {
                  x: format(subMonths(date, 1), 'MMM YY'),
                  y: selfScore[info.id],
                },
                {
                  x: format(date, 'MMM YY'),
                  y: score[info.id],
                },
              ]}
            />
          </VictoryChart>
        </Card>
      ))}
    </Swiper>
  );
};

export default connect(state => ({
  feedback: state.feedback,
  adaptabilities: state.user.adaptabilities,
}))(Graph);
