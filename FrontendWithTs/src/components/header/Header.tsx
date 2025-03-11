
import './Header.css'
import { assets } from '../../assets/assets'
import Restaurent from '../restaurent/Restaurent'

const Header: React.FC = () => {
  return (
      <div className="header-content">
        <div className="header-content-top">
          <div className="header-content-top-left">
            <h1>Healthy <span className='red-color-heading'>Eating is an</span><br /><span className='orange-color-heading'>Important</span> Part <br />of <span className='green-color-heading'>Lifestyle</span></h1>
            <div className='header-content-top-left-sub-heading'>
              <p>We prepare delicious Food <br /> for you we are always</p>
            </div>
            <div className='explore-menu-button'>Explore Now</div>
          </div>
          <div className="header-content-top-left-after">
            <h1>Healthy <span className='red-color-heading'>Eating is an</span><span className='orange-color-heading'> Important</span> </h1><h1>Part of <span className='green-color-heading'>Lifestyle</span></h1>
            <div className='header-content-top-left-sub-heading'>
              <p>We prepare delicious Food <br /> for you we are always</p>
            </div>
            <div className='explore-menu-button'>Explore Now</div>
          </div>
          <div className="header-content-top-right">
            
            <img src={assets.header_img} alt="" /></div>
        </div>
        <Restaurent />
      </div>
  )
}


export default Header
