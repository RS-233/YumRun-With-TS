import React, { useContext, useEffect, useCallback } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

interface StoreContextType {
  url: string;
}

const Verify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext) as StoreContextType; // Type assertion for context
  const navigate = useNavigate();

  const verifyPayment = useCallback(async () => {  // Wrap it in useCallback to ensure it's stable across renders
    if (success && orderId) {
      try {
        const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error('Error verifying payment', error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [success, orderId, url, navigate]);  // Add necessary dependencies for the callback

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);  // Now the function is stable and added to the dependency array

  return (
    <div className='verify'>
        ghvhgv
      <div className="spinner"></div>      
    </div>
  );
}

export default Verify;
