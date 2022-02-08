import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Бул логин болдубу деген состояние  

  useEffect(() => {
    const storedLoggedInfo = localStorage.getItem('isLogedIn');

    if(storedLoggedInfo === '1') {
      setIsLoggedIn(true)
    }
  },[])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLogedIn', '1')
    setIsLoggedIn(true);
  };
  
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLogedIn')
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
