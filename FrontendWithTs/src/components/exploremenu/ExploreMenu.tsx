import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'
import { CategoryType } from '../../context/StoreContext'

// Define the type for setCategory prop
interface MenuItemType {
  menu_name: string;
  menu_image: string;
}

const Exploremenu: React.FC<CategoryType> = ({ category, setCategory }) => {
  return (
    <div className='exploremenu' id='explore-menu'>
      <h1>Explore Our<span className='menu-span'>Menu</span></h1>
      <p className='explore-menu-text'>
        Dive into a world of flavor with our diverse
        menu selection, where every dish is a culinary
        masterpiece waiting to be savored.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item: MenuItemType, index: number) => {
          return (
            <div
              onClick={() => setCategory(category === item.menu_name ? "All" : item.menu_name)} // Directly pass the string to setCategory
              key={index}
              className="explore-menu-list-item"
            >
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default Exploremenu;
