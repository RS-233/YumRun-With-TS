import React, { useContext } from 'react';
import './Fooddisplay.css';
import { StoreContext, StoreContextType } from '../../context/StoreContext'; // assuming StoreContextType is exported
import Fooditem from '../fooditem/FoodItem';

// Define types for the food items
interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Define the props for the Fooddisplay component
interface FoodDisplayProps {
  category: string;
}

const Fooddisplay: React.FC<FoodDisplayProps> = ({ category }) => {
  // Use the context with proper type and add a null check
  const { food_list } = useContext(StoreContext) as StoreContextType; 
  console.log(food_list)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top <span>Dishes </span>near you</h2>
      <div className="food-display-list">
        {food_list?.map((item: FoodItem, index: number) => {
          if (category === "All" || category === item.category || category === item.name) {
            return (
              <Fooditem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Fooddisplay;
