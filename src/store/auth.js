import React, { useState, useCallback } from "react";

const Auth = React.createContext({
  token: "",
  resetToken: "",
  isLoggedIn: false,
  isResetToken: false,
  login: (token) => {},
  logout: () => {},
  reset: (token) => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");

  return {
    token: storedToken,
  };
};
const retrieveStoredResetToken = () => {
  const storedToken = localStorage.getItem("resetToken");

  return {
    resetToken: storedToken,
  };
};

export const AuthProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const resetTokenData = retrieveStoredResetToken();

  let initialToken, initialResetToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  if (resetTokenData) {
    initialResetToken = resetTokenData.resetToken;
  }

  const [token, setToken] = useState(initialToken);
  const [resetToken, setResetToken] = useState(initialResetToken);

  const userIsLoggedIn = !!token;
  const userResetToken = !!resetToken;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setResetToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("resetToken");
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const resetHandler = (token) => {
    setResetToken(token);
    localStorage.setItem("resetToken", token);
  };

  const value = {
    token: token,
    resetToken: resetToken,
    isLoggedIn: userIsLoggedIn,
    isResetToken: userResetToken,
    login: loginHandler,
    logout: logoutHandler,
    reset: resetHandler,
  };

  return <Auth.Provider value={value}>{props.children}</Auth.Provider>;
};

export default Auth;
