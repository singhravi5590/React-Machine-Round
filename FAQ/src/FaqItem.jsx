import React, { useEffect, useState } from 'react'
import './App.css'

const FaqItem = ({faq, index, isOpen, onClick}) => {
  return (
    <div className='faq-box'>
        <div className='que' onClick={onClick} >
            <button className={isOpen ? 'arrow' : ''}>{' > '}</button>
            <div>{faq.question}</div>
        </div>
        { isOpen && <div className='ans'>{faq.answer}</div>}
    </div>
  )
}

export default FaqItem