import React from 'react'
import doctor from '../../images/Booking.png'
const OverView = () => {
    const style ={
        image: {
            position: 'fixed',
            width: '80%',
            marginLeft: '250px',
          },
        };
  return (
    <div>
        <img src={doctor} alt="Doctor" className="image"  style={style.image}/>
    </div>
  )
}

export default OverView