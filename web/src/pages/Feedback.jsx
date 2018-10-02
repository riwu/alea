import React from 'react';
import {
  Input, Button, Checkbox, message,
} from 'antd';
import data from './data';
import styles from './Feedback.module.css';

const Feedback = props => (
  <div className={styles.container}>
    <h2>Daniel's Feedback</h2>
    {Object.entries(data[1].traits)
      .slice(0, 6)
      .map(([id, trait]) => (
        <div key={id} className={styles.trait}>
          <Checkbox>{trait}</Checkbox>
        </div>
      ))}
    <Input.TextArea placeholder="Additional Comments" />
    <Checkbox className={styles.anonymous}>Send anonymously</Checkbox>
    <div>
      <Button type="primary" onClick={() => props.history.push('/success')}>
        Submit
      </Button>
    </div>
  </div>
);

export default Feedback;
