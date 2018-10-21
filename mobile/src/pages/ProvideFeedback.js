import React from 'react';
import Feedback from '../components/Feedback';

const ProvideFeedback = props => (
  <Feedback
    {...props}
    prefix="Provide"
    buttonTitle="NEXT"
    onPress={selectedIds => props.navigation.navigate('SendFeedback', { selectedIds })}
  />
);

export default ProvideFeedback;
