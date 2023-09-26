import Cookies from 'js-cookie';

export const handleLogout = () => {
    // Clear the authentication token and isAuthenticated flag cookies
    console.log("hitt")
    Cookies.remove('authToken');
    Cookies.remove('isAuthenticated');
  
    // Perform any additional logout actions (e.g., redirect to the login page)
    // navigate('/');
  };

  