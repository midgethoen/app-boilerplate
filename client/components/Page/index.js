import React, { PropTypes } from 'react';

import Navigation from './Navigation';

export default function Page({
  children,
  user,
  dispatch,
}) {
  return (
    <div>
      <Navigation user={user} dispatch={dispatch} />
      <div className='container'>
        { children }
      </div>
    </div>
  );
}

Page.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
};
