import React from 'react';

export default class Password extends React.Component {

  constructor(){
    super();
    this.state = {
      errors: {},
      password: ''
    };
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value }, function() {
      this.validateLength();
      this.validateCharacters();
    });
  }

  validateLength() {
    var errors = this.state.errors;
    var errorKey = 'invalid_length';

    if (this.state.password.length < this.props.minLength) {
      errors[errorKey] = 'Must be at least ' + this.props.minLength + ' characters long';
    }
    else {
      delete(errors[errorKey]);
    }

    this.setState({ errors: errors });
  }

  validateCharacters() {
    console.log('validate Characters called');
    var errors = this.state.errors
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

    this.setState({ errors: errors });
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
      <input type="password" placeholder="New Password" onChange={ this.handlePasswordChange.bind(this) }></input>
      <div>
        { Object.keys(this.state.errors).map( errorKey => <li key={errorKey}>{ this.state.errors[errorKey] }</li> ) }
      </div>
    </div>
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
