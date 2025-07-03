import React from 'react'

const Modal = ({close, handleOfferAccepted}) => {

    function handleOutSideClick(e){
        if(e.target.className === 'modal'){
            close();
        }
    }

  return (
    <div className='modal' onClick={handleOutSideClick}>
        <div className='modal-content'>
            <button onClick={close} className='close-btn'>X</button>
            <div className='content'>
                Click the button below to accept our amazing offer
            </div>
            <button onClick={handleOfferAccepted} className='accept-btn'>Accept Offer</button>
        </div>
    </div>
  )
}

export default Modal