import { useState } from 'react';

const ConfirmModal = ({ handleConfirm }) => {
  return (
    <div className='confirmModal scale-in-center'>
      <h4>Do you want proceed?</h4>
      <div className='cntBtn'>
        <button className='yesBtn' onClick={() => handleConfirm(true)}>
          Of Course!
        </button>
        <button className='noBtn' onClick={() => handleConfirm(false)}>
          Nope!
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
