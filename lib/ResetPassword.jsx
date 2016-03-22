import React from 'react';
import Password from './Password.jsx';
import PasswordConfirmation from './PasswordConfirmation.jsx';

export default class ResetPassword extends React.Component {

  constructor() {
    super();
    this.state = {
      password: '',
      passwordConfirmation: '',
      passwordErrors: {},
      passwordConfirmationErrors: {}
    };

    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordConfirmation = this.updatePasswordConfirmation.bind(this);
  }

  updatePassword(password) {
    this.setState({ password: password }, function(){
      this.validatePassword();
      this.validatePasswordConfirmation();
    });
  }

  updatePasswordConfirmation(passwordConfirmation) {
    this.setState({ passwordConfirmation: passwordConfirmation }, function(){
      this.validatePasswordConfirmation();
    });
  }

  validatePassword() {
    this.validateLength();
    this.validateCharacters();
  }

  validatePasswordConfirmation() {
    var errors = this.state.passwordConfirmationErrors;
    var errorKey = 'match_password_and_confirmation';

    if (this.state.password !== this.state.passwordConfirmation) {
      errors[errorKey] = 'Passwords do not match yet.';
    }
    else {
      delete(errors[errorKey]);
    }

    this.setState({ passwordConfirmationError: errors });
  }

  validateLength() {
    var errors = this.state.passwordErrors;
    var errorKey = 'invalid_length';

    if (this.state.password.length < this.props.minLength) {
      errors[errorKey] = 'Must be at least ' + this.props.minLength + ' characters long';
    }
    else {
      delete(errors[errorKey]);
    }

    this.setState({ passwordErrors: errors });
  }

  validateCharacters() {
    var errors = this.state.passwordErrors
      , errorKey = 'missing_characters';

    if (this.props.shouldContainUpperCase && !this.containsUpperCase() ||
      this.props.shouldContainLowerCase && !this.containsLowerCase() ||
      this.props.shouldContainNumber && !this.containsNumber() ||
      this.props.shouldContainSpecialCharacter && !this.containsSpecialCharacter()) {

      errors[errorKey] = this.constructErrorMessage();
    }
    else {
      delete(errors[errorKey]);
    }

    this.setState({ passwordErrors: errors });
  }

  containsNumber() {
    return /[0-9]/g.test(this.state.password);
  }

  containsUpperCase() {
    return /[A-Z]/g.test(this.state.password);
  }

  containsLowerCase() {
    return /[a-z]/g.test(this.state.password);
  }

  containsSpecialCharacter(){
    return /[!@#$%&*+=;,|:<>\?]/g.test(this.state.password)
  }

  constructErrorMessage() {
    var startString = 'Must have at least'
      , errors = [];

    if (this.props.shouldContainUpperCase) {
      errors.push('1 upper case');
    }
    if (this.props.shouldContainLowerCase) {
      errors.push('1 lower case');
    }
    if (this.props.shouldContainNumber) {
      errors.push('1 numeric');
    }
    if (this.props.shouldContainSpecialCharacter) {
      errors.push('1 special character (!, @, *, etc)');
    }

    if (errors.length === 0) {
      return;
    }
    else if (errors.length === 1) {
      return startString + ' ' + errors[0];
    }
    else {
      return startString + ' ' + errors.slice(0, errors.length-1).join(', ') + ' and ' + errors.slice(errors.length-1);
    }
  }

  render() {
    return <div>
      <h3>Reset Password</h3>
      <Password {...this.props} updatePassword={ this.updatePassword } errors= { this.state.passwordErrors } />
      <PasswordConfirmation updatePasswordConfirmation={ this.updatePasswordConfirmation } errors= { this.state.passwordConfirmationErrors } />
    </div>;
  }
}

Password.propTypes = {
  minLength:                        React.PropTypes.number,
  shouldContainUpperCase:           React.PropTypes.bool,
  shouldContainLowerCase:           React.PropTypes.bool,
  shouldContainSpecialCharacter:    React.PropTypes.bool,
  shouldContainNumber:              React.PropTypes.bool
};

Password.defaultProps = {
  minLength:                        null,
  shouldContainUpperCase:           false,
  shouldContainLowerCase:           false,
  shouldContainSpecialCharacter:    false,
  shouldContainNumber:              false
};
