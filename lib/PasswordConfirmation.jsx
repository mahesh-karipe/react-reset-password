import React from 'react';

export default class PasswordConfirmation extends React.Component {

  constructor() {
    super();
    this.state = {
      showPasswordConfirmation: false
    }
  }

  handleUpdatePasswordConfirmation(event) {
    this.props.updatePasswordConfirmation(event.target.value)
  }

  handleToggleShowClick() {
    this.setState({
      showPasswordConfirmation: !this.state.showPasswordConfirmation
    });
  }

  passwordType() {
    return this.state.showPasswordConfirmation ? 'text' : 'password';
  }

  showHideText() {
    return this.state.showPasswordConfirmation ? 'Hide' : 'Show'
  }

  render() {
    return <div>
      <input type={ this.passwordType() }
             placeholder="Confirm Password"
             onChange={ this.handleUpdatePasswordConfirmation.bind(this) }></input>
      <button onClick={ this.handleToggleShowClick.bind(this) }>{ this.showHideText() }</button>
    </div>
  }
}

PasswordConfirmation.propTypes = {
  updatePasswordConfirmation:       React.PropTypes.func.isRequired
};
