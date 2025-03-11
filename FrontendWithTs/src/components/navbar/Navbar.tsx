import React, { useContext, useState, ChangeEvent } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext, StoreContextType } from '../../context/StoreContext';
import { assets } from '../../assets/assets';


interface NavbarProps {
  setShowLogin: (show: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setShowLogin }) => {
  const [menu, setMenu] = useState<string>('home');
  const [hamburger, setHamburger] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const { getTotalCartAmount, token, setToken, findItem, searchTerm, setSearchTerm } = useContext(StoreContext) as StoreContextType;
  const navigate = useNavigate();

  const toggleClass = () => {
    setToggle(!toggle);
    setHamburger(!hamburger);
  };

  const search = async () => {
    if (searchTerm && searchTerm !== '') {
      findItem(searchTerm); // Only call findItem if searchTerm is not null or empty
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value || '');
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="navbar-logo" />
      </Link>
      <div className={hamburger === false ? 'navbar-menu' : 'hamburger-active'}>
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>
          Menu
        </a>
        <a href="#app-downlode" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>
          Mobile-app
        </a>
        <a href="#footer" onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>
          Contact
        </a>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Find your food"
            onChange={handleSearchChange}
            value={searchTerm || ''}
            required
          />
          {!searchTerm ? (
            <img src={assets.search_icon} alt="Search Icon" />
          ) : (
            <a href="#food-display">
              <img
                src={assets.search_icon}
                alt="Search Icon"
                onClick={search}
              />
            </a>
          )}
        </div>
        <div className="ham-burger" onClick={toggleClass}>
          <div className={toggle === false ? "lines" : "crosslines"}></div>
          <div className={toggle === false ? "lines" : "crosslines"}></div>
          <div className={toggle === false ? "lines" : "crosslines"}></div>
        </div>

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart Icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img className="navbar-profile-image" src={assets.profile_icon} alt="Profile Icon" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders Icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout Icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
