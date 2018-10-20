import React from 'react';
import {
  Input, Button, Checkbox, notification, Spin,
} from 'antd';
import data from './data';
import styles from './Feedback.module.css';
import { getFeedbackTokenInfo, postFeedback } from '../actions/api';

notification.config({ duration: 0 });

const allTraits = Object.values(data).reduce((acc, { traits }) => {
  acc.push(...Object.entries(traits));
  return acc;
}, []);

const indexes = new Set();
while (indexes.size < 6) {
  indexes.add(Math.floor(Math.random() * allTraits.length));
}

const randomTraits = [...indexes].map(i => allTraits[i]);

class Feedback extends React.Component {
  selectedTraits = {};

  state = {
    requesterName: '',
    requesterEmail: '',
    teamMemberEmail: '',
    teamMemberName: '',
    disabled: !window.location.search,
    waiting: false,
  };

  componentDidMount() {
    if (window.location.search) {
      getFeedbackTokenInfo(window.location.search)
        .then(info => this.setState(info))
        .catch((e) => {
          this.setState({ disabled: true });
          const notFound = ((e || {}).response || {}).status === 404;
          notification.error({
            message: notFound ? 'Link is invalid or has been used/expired' : e.message,
            ...(!notFound && { description: e.response.data }),
          });
        });
    } else {
      notification.error({
        message: 'Token missing in URL',
        description: 'Please click on the link in the email with token present',
      });
    }
  }

  render() {
    const { props } = this;
    const {
      requesterName, requesterEmail, teamMemberEmail, teamMemberName,
    } = this.state;
    return (
      <div className={styles.container}>
        <h2>{`Hi ${teamMemberName} (${teamMemberEmail}),`}</h2>
        <h2>{`${requesterName} (${requesterEmail}) has requested your feedback!`}</h2>
        <Spin size="large" spinning={this.state.waiting}>
          {randomTraits.map(([id, trait]) => (
            <div key={id} className={styles.trait}>
              <Checkbox
                onChange={(e) => {
                  this.selectedTraits[id] = e.target.checked;
                }}
              >
                {trait}
              </Checkbox>
            </div>
          ))}
          <Input.TextArea
            placeholder="Additional Comments"
            onChange={(e) => {
              this.comments = e.target.value;
            }}
          />
          <Checkbox className={styles.anonymous}>Send anonymously</Checkbox>
          <div>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ waiting: true });
                postFeedback(
                  window.location.search,
                  Object.entries(this.selectedTraits)
                    .filter(([, trait]) => trait)
                    .map(([id]) => Number(id)),
                  this.comments,
                )
                  .then(() => props.history.push('/success'))
                  .catch((e) => {
                    this.setState({ waiting: false });
                    notification.error({
                      message: e.message,
                      description: e.response.data,
                    });
                  });
              }}
              disabled={this.state.disabled}
            >
              Submit
            </Button>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Feedback;
