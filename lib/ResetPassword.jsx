import React from 'react';
import Password from './Password.jsx';
import PasswordConfirmation from './PasswordConfirmation.jsx';

export default class ResetPassword extends React.Component {

  render() {
    return <div>
      <h3>Reset Password</h3>
      <Password {...this.props} />
      <PasswordConfirmation />
    </div>;
  }
}
