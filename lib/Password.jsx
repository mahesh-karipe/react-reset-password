import React from 'react';

export default class Password extends React.Component {

  constructor() {
    super();
    this.state = {
      showPassword: false
    }
  }

  handlePasswordChange(event) {
    this.props.updatePassword(event.target.value);
  }

  handleOnFocus(event) {
    this.props.updatePassword(event.target.value || '');
  }

  handleToggleShowClick() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  passwordType() {
    return this.state.showPassword ? 'text' : 'password';
  }

  showHideText() {
    return this.state.showPasswordConfirmation ? 'Hide' : 'Show'
  }

  render() {
    return <div>
      <input type={ this.passwordType() }
             placeholder="New Password"
             onFocus={ this.handleOnFocus.bind(this) }
             onChange={ this.handlePasswordChange.bind(this) }></input>
      <button title='Show' onClick={ this.handleToggleShowClick.bind(this) }>{ this.showHideText() }</button>
    </div>
  }
}

Password.propTypes = {
  updatePassword:     React.PropTypes.func.isRequired
};
