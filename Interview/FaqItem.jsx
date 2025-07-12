import React from 'react'

const FaqItem = ({item, index, showIndex, isOpen, onClick}) => {
  return (
    <div>
        <div>
            <p>{item.question}</p>
            <button onClick={onClick}>{'+'}</button>
            { isOpen && <p>{item.answer}</p>}
        </div>
    </div>
  )
}

export default FaqItem