import Welcome from "../components/Home/Welcome";
import WhyUs from "../components/Home/WhyUs";
import Trust from "../components/Home/Trust";
import { Box } from "../styles";

const Home = () => {
  return (
    <Box>
      <Welcome />
      <WhyUs />
      <Trust />
    </Box>
  );
};

export default Home;
