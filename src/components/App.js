import React from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import NotLoggedIn from "./NotLoggedIn";
import LoggedIn from "./LoggedIn";

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(['Authentication', 'UserId', 'RefreshToken', 'AccountType']);
  const [loggedIn, isLoggedIn] = useState("FALSE");
  const [code, setcode] = useState('');
  const axios = require('axios');
  

  useEffect(() => {
    if (cookie.Authentication === undefined && cookie.UserId === undefined && cookie.RefreshToken === undefined && cookie.AccountType === undefined) {
      isLoggedIn("FALSE");
    }else{
      isLoggedIn("TRUE");
    }
    const path = window.location.href;
    if (path.includes('code')) {
      setcode(path.substring(path.indexOf('code=') + 5, path.length));
    }
  }, []);

  const exchangeCodeForToken = () => {
    axios.get(`https://flenderson-spring-hrm.herokuapp.com/v1/get-token/${code}`).then(({ data }) => {
      setCookie('Authentication', data.idToken);
      setCookie('RefreshToken', data.refreshToken);
      setCookie('UserId', data.userId);
      setCookie('AccountType', data.accountType);
      isLoggedIn("TRUE");
    })
  };

  return (
    <CookiesProvider>
      {loggedIn === 'FALSE' && code === '' ? <NotLoggedIn /> : loggedIn === 'FALSE' && code != '' ? [exchangeCodeForToken()] : <LoggedIn setCookie={setCookie} authentication={cookie.Authentication} refreshToken={cookie.RefreshToken} userId={cookie.UserId} accountType={cookie.AccountType} />}
    </CookiesProvider>);
}

export default App;
