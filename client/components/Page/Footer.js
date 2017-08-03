import React, { PropTypes } from 'react';

export default function Page({
  children,
}) {
  return (
    <div id='footer'>
      <div className='container'>
        <div className=' navbar-collapse'>
          <p className='navbar-text'>&COPY; Certhon 2015</p>
        </div>
      </div>
    </div>
  );
}
