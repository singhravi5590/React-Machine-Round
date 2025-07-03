import React, { useState } from 'react'
import './App.css'
import Modal from './Modal';

const App = () => {

  const [isShow, setIsShow] = useState(false)
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);

  function handleOfferAccepted(){
    setIsOfferAccepted(true);
    setIsShow(false);
  }

  function handleIsopenModal(){
    setIsShow(true);
  }

  function handleClose(){
    setIsShow(false);
  }

  return (
    <div>
      <div className='show-offer'>
        { !isOfferAccepted ? (<button onClick={handleIsopenModal} className='offer-btn'>Show Offer</button>) : (<div style={{fontSize : '20px', fontWeight : 'bolder'}}> Offer Accepted </div>)}
      </div>
      {
        isShow && <Modal close={handleClose} handleOfferAccepted={handleOfferAccepted} />
      }
    </div>
  )
}

export default App