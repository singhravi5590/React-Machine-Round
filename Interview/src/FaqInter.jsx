import React, { useEffect, useState } from 'react'

const FaqInter = ({index, item}) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        if(index == 0){
            setShow(true);
        }
    }, [])

  return (
    <div className='faq-container'>
        <div className='button-container'>
            <p>{item.question}</p>
            <button onClick={() => setShow((prev) => !prev)}>{"+"}</button>
        </div>
        {show && <div className='answer'>{item.answer}</div>}
    </div>
  )
}

export default FaqInter