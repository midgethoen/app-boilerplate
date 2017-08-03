import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import { signOut } from '../../actions';

import logoImg from '../../assets/images/logo_white.png';

export default class Navigation extends PureComponent {

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  handleSignOut = () => {
    this.props.dispatch(signOut());
  }

  getLeftItems() {
    const { user } = this.props;
    if (user) {
      return (
        <LinkContainer to='/projects'>
          <NavItem eventKey={1}>Projects</NavItem>
        </LinkContainer>
      );
    }
    return null;
  }

  getSignOut() {
    const { user } = this.props;
    if (user) {
      return (
        <NavItem eventKey={2} onClick={this.handleSignOut}>Sign out</NavItem>
      );
    }
    return null;
  }

  render() {
    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Link className='navbar-brand' to='/'>
            <img role='presentation' src={logoImg} />
              Certhon docs
              { process.env.NODE_ENV !== 'production' && ' - ONTW' }
          </Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav >
            {this.getLeftItems()}
          </Nav>
          <Nav pullRight>
            <LinkContainer to='/help'>
              <NavItem eventKey={1}>Help</NavItem>
            </LinkContainer>
            <LinkContainer to='/settings'>
              <NavItem eventKey={2}>Settings</NavItem>
            </LinkContainer>
            { this.getSignOut() }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
