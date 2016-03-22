import React from 'react';

export default class Password extends React.Component {

  handlePasswordChange(event) {
    this.props.updatePassword(event.target.value);
  }

  render() {
    return <div>
      <input type="password"
             placeholder="New Password"
             onChange={ this.handlePasswordChange.bind(this) }></input>
      <div>
        { Object.keys(this.props.errors).map( errorKey => <li key={errorKey}>{ this.props.errors[errorKey] }</li> ) }
      </div>
    </div>
  }
}

Password.propTypes = {
  errors:             React.PropTypes.object,
  updatePassword:     React.PropTypes.func.isRequired
};

Password.defaultProps = {
  errors: {}
};
