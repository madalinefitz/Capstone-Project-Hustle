import React, { useState, useEffect } from "react";
// import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "react-native-dotenv";
import SInfo from "react-native-sensitive-info";
import Auth0 from "react-native-auth0";
import jwtDecode from "jwt-decode";

const auth0 = new Auth0({
  domain: "dev-6qvvsf1wfznxkbnk.us.auth0.com",
  clientId: "50REEqcc71aXHEM4C1HVIG0lLdBBpyQP",
});

const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);


  const getUserData = async id => {
      const idToken = id ? id : await SInfo.getItem('idToken', {});
      const {first_name, exp} = jwtDecode(idToken);

      if (exp < Date.now() / 1000) {
        throw new Error('ID token expired!');
      }

      return {
        first_name,
      };
    };

  useEffect(() => {
  (async () => {
      try {
      const user_data = await getUserData();
      if (user_data) {
          setLoggedIn(true);
          setUserData(user_data);
      }
      } catch (err) {
      setLoggedIn(false);
      }
  })();
  }, []);

useEffect(() => {
    (async () => {
      try {
        if (loggedIn) {
          const user_data = await getUserData();
          if (user_data) {
            setLoggedIn(true);
            setUserData(user_data);
          }
        }
      } catch (err) {
        alert('Error logging in');
      }
    })();
  }, [loggedIn]);

  const login = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid email profile',
      });
      await SInfo.setItem('idToken', credentials.idToken, {});
      const user_data = await getUserData(credentials.idToken);
      setLoggedIn(true);
      setUserData(user_data);
    } catch (err) {
      alert('Error logging in');
    }
  };

  const logout = async () => {
    try {
      await auth0.webAuth.clearSession({});
      await SInfo.deleteItem('idToken', {});
      setLoggedIn(false);
      setUserData(null);
    } catch (err) {
      alert('Error logging in');
    }
    const value = {
      loading,
      loggedIn,
      login,
      logout,
      userData,
    };
  
    return (
      <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    );
  };
}
  

export { AuthContext, AuthContextProvider };

