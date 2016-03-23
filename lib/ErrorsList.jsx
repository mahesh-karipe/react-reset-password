import React from 'react';

export default class ErrorsList extends React.Component {

  render() {
    return <div>
      <ul>
        { Object.keys(this.props.errors).map( errorKey => <li className={ this.props.errors[errorKey] ? 'error': '' }
                                                                 key={errorKey}>{ this.props.allErrors[errorKey] }</li> )}
      </ul>
    </div>
  }
}

ErrorsList.propTypes = {
  errors:       React.PropTypes.object,
  allErrors:    React.PropTypes.object
};

ErrorsList.defaultProps = {
  errors: {},
  allErrors: {}
};
