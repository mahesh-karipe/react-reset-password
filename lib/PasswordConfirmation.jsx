import React from 'react';

export default class PasswordConfirmation extends React.Component {

  handleUpdatePasswordConfirmation(event) {
    this.props.updatePasswordConfirmation(event.target.value)
  }

  render() {
    return <div>
      <input type="password"
             placeholder="Confirm Password"
             onChange={ this.handleUpdatePasswordConfirmation.bind(this) }></input>
      <div>
        { Object.keys(this.props.errors).map( errorKey => <li key={errorKey}>{ this.props.errors[errorKey] }</li> ) }
      </div>
    </div>
  }
}

PasswordConfirmation.propTypes = {
  errors:                           React.PropTypes.object,
  updatePasswordConfirmation:       React.PropTypes.func.isRequired
};

PasswordConfirmation.defaultProps = {
  errors: {}
};
