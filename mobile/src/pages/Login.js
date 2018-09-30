import React from 'react';
import { connect } from 'react-redux';
import Authentication from './Authentication';

const Login = props => (
  <Authentication prefix="Sign in to your" title="Hogan Report" onSubmit={() => {}} />
);

export default connect(null)(Login);
