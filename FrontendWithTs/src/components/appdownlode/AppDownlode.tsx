import React from 'react'
import './AppDownlode.css'
import { assets } from '../../assets/assets'

// You can define the type of the component's props if needed, but since you don't have any props here, it's optional.
const AppDownlode: React.FC = () => {
  return (
    <div className='app-downlode' id='app-downlode'>
      <p>For Better Experience Download <br />Foodies App</p>
      <div className="app-downlode-platform">
        <img src={assets.play_store} alt="Play Store" />
        <img src={assets.app_store} alt="App Store" />
      </div>
    </div>
  )
}

export default AppDownlode
