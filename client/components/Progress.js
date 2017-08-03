import React, { PropTypes } from 'react';
import filesize from 'filesize';
import { ProgressBar } from 'react-bootstrap';

export default function Progress({ loaded, total }) {
  let textualProgress;
  if (loaded && total) {
    `${filesize(loaded)} / ${filesize(total)}`;
  }
  let progress = (loaded / total) * 100;
  let undetermined = false;
  if (progress === 0) {
    progress = 100;
    undetermined = true;
  }
  return (
    <div key='downloadProgress' className='download-progress'>
      <span>{textualProgress}</span>
      <ProgressBar now={progress} striped={undetermined} active={undetermined} />
    </div>
  );
}
Progress.propTypes = {
  loaded: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
Progress.defaultProps = {
  loaded: 0,
  total: Infinity,
};
