import React from 'react';
import PopupWithForm from './PopupWithForm';
import checkmark from '../Images/checkmark.svg';
import fail from '../Images/fail.svg';

function InfoToolTip(props) {
  return (
    <PopupWithForm name='tooltip' isOpen={props.isOpen} onClose={props.onClose} closeButton={true} overlay={true}>
      <img
        className='popup__tooltip-icon'
        src={props.tooltipType === 'success' ? checkmark : fail}
        alt='check mark'
      />
      <h2 className='popup__tooltip-message'>
        {props.tooltipType === 'success'
          ? 'Success! You have now been registered'
          : 'Oops, something went wrong! Please try again.'}
      </h2>
    </PopupWithForm>
  );
}

export default InfoToolTip;