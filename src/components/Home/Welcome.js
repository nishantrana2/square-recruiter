import { useContext } from "react";
import { Span, Box, Button, Image } from "../../styles";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth";

const Welcome = () => {
  const auth = useContext(AuthContext);
  return (
    <Box
      display="grid"
      gridTemplateColumns={["1fr", " 1fr 3fr", "1fr 3fr"]}
      gridGap={"127px"}
      style={{ backgroundColor: "#303F60", padding: "0px 190px " }}
    >
      <Box type="column" mt={"160px"}>
        <Box m={2}>
          <Span type="welcome">Welcome to </Span>
        </Box>
        <Box m={2}>
          <Span type="welcome">My</Span>
          <Span type="welcomeBlue">Jobs</Span>
        </Box>

        <Link
          to={auth.isLoggedIn ? "/jobs" : "/auth"}
          style={{ textDecoration: "none" }}
        >
          <Button type="noPost"> Get Started</Button>
        </Link>
      </Box>
      <Box>
        <Image
          src="/welcome.png"
          width="622px"
          height={"395px"}
          style={{ position: "relative", top: "100px", borderRadius: "20px" }}
        ></Image>
      </Box>
    </Box>
  );
};

export default Welcome;
