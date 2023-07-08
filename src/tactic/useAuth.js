// useAuth.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsUserAuthenticated(!!token);
  }, []);

  const checkAuthentication = () => {
    if (!isUserAuthenticated) {
      navigate('/authentication/sign-in'); // Redirect to login page
      return false;
    }
    return true;
  };

  return { isUserAuthenticated, checkAuthentication };
};

export default useAuth;
