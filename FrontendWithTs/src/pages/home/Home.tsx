import React, { useContext } from 'react';
import Header from '../../components/header/Header';
import { StoreContext } from '../../context/StoreContext';
import { CategoryType } from '../../Types/Types';
import Exploremenu from '../../components/exploremenu/ExploreMenu';
import Fooddisplay from '../../components/fooddisplay/FoodDisplay';
import AppDownlode from '../../components/appdownlode/AppDownlode';


const Home: React.FC = () => {
  const { category, setCategory } = useContext(StoreContext) as CategoryType;

  return (
    <div>
      <Header />
      <Exploremenu category={category} setCategory={setCategory} />
      <Fooddisplay category={category} />
      <AppDownlode/>
    </div>
  );
};

export default Home;
