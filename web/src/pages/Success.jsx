import React from 'react';
import { Icon } from 'antd';
import styles from './Success.module.css';

const Success = () => (
  <div className={styles.container}>
    <Icon className={styles.success} type="check-circle" theme="filled" />
    <h1>Successfully submitted feedback for Daniel</h1>
    <h2>Thank you for your feedback!</h2>
  </div>
);

export default Success;
