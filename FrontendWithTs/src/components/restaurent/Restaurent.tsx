import React from 'react'
import './Restaurent.css'
import { assets, restaurent_list } from '../../assets/assets'


interface RestaurentType {
  name: string;
  image: string;
}

// Define the component
const Restaurent: React.FC = () => {
  return (
    <div className='Restaurent'>
      <div className='Restaurent-heading'>Populars</div>
      <div className='Restaurent-sub-heading'>
        <h3>Popular Restaurants</h3>
        <button>View All {'>'}</button>
      </div>
      <div className='single-restaurent-box'>
        {restaurent_list.map((restaurant: RestaurentType, index: number) => (
          <div key={index}>
            <div className='single-reataurent'>
              <img src={restaurant.image} alt={restaurant.name} className='single-reataurent-img' />
              <div className='name-box'>
                <p>{restaurant.name}</p>
                <div className='favourate'>
                  <img src={assets.favorite} alt="favorite" />
                </div>
              </div>
              <div className='buy-now-box'>
                <button>Order Now</button>
                <div className='review'>
                  <img src={assets.star} alt="star" /> 5
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Restaurent;
