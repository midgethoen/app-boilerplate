import React from 'react';
import logoImg from '../assets/images/logo_green.png';

export default function Spinner() {
  return (
    <div className='spinner' >
      <img role='presentation' src={logoImg} />
    </div>
  );
}
