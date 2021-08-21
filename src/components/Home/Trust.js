import React from "react";
import { Box, Image, Span } from "../../styles";

function Trust() {
  return (
    <Box
      type="column"
      style={{
        padding: "80px 190px",
        backgroundColor: "#EDF6FF",
        paddingBottom: "40px",
      }}
    >
      <Span type="whyus">companies who trust us</Span>

      <Box
        display="grid"
        gridTemplateColumns={["1fr", " 1fr 1fr 1fr", "1fr 1fr 1fr 1fr 1fr"]}
        gridGap={"112px"}
        mt={"40px"}
      >
        <Box alignItems="center" type="column">
          <Image src="/solaytic.png" height="40px" width="125px" />
        </Box>
        <Box alignItems="center" type="column">
          <Image src="/kanba.png" height="40px" width="125px" />
        </Box>
        <Box alignItems="center" type="column">
          <Image src="/lightAI.png" height="40px" width="125px" />
        </Box>
        <Box alignItems="center" type="column">
          <Image src="/ztos.png" height="40px" width="125px" />
        </Box>
        <Box alignItems="center" type="column">
          <Image src="/kanba.png" height="40px" width="125px" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-evenly" my={"55px"}>
        <Box alignItems="center" type="column">
          <Image src="/goldline.png" height="40px" width="125px" />
        </Box>
        <Box alignItems="center" type="column">
          <Image src="/ideaa.png" height="40px" width="125px" />
        </Box>
        <Box alignItems="center" type="column">
          <Image src="/liva.png" height="40px" width="125px" />
        </Box>
        <Box alignItems="center" type="column">
          <Image src="/velocity.png" height="40px" width="125px" />
        </Box>
      </Box>
    </Box>
  );
}

export default Trust;
