import { useContext, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Button, Span } from "../../styles";
import AuthContext from "../../store/auth";
import Menu from "./Menu";

const MainNavigation = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const isLoggedIn = auth.isLoggedIn;

  const loginHandler = () => {
    history.replace("/auth");
  };

  return (
    <header>
      <Box type="row" px={8} style={{ padding: "0px 70px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          <div>
            <Span type="headOne">My</Span>
            <Span type="headTwo">Jobs</Span>
          </div>
        </Link>
        <Box>
          {!isLoggedIn ? (
            <Box py={"6px"}>
              {" "}
              <Button onClick={loginHandler}>Login/Signup</Button>
            </Box>
          ) : (
            <Menu />
          )}
        </Box>
      </Box>
      <Box
        style={{
          height: "1px",
          margin: " 0px 50px",
          borderBottom: "1px solid #4D618E",
        }}
      >
        &nbsp;
      </Box>
    </header>
  );
};

export default MainNavigation;
