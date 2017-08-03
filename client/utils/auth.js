/* eslint react/no-multi-comp: 0 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

const mapStateToProps = ({ user }) => ({
  isAuthenticated: !!user,
});

export function requireAuthentication(WrappedComponent) {
  class AuthenticatedComponent extends React.Component {

    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
    }

    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        this.props.dispatch(replace('/login'));
      }
    }

    render() {
      const component = this.props.isAuthenticated === true ? <WrappedComponent {...this.props} /> : null;
      return (
        <div> { component } </div>
      );
    }
  }

  AuthenticatedComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
