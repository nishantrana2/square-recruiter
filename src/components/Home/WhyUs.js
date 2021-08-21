import React from "react";
import { Box, Span } from "../../styles";

function WhyUs() {
  return (
    <Box
      type="column"
      style={{
        padding: "142px 190px",
        backgroundColor: "#EDF6FF",
        paddingBottom: 0,
      }}
    >
      <Span type="whyus"> Why Us</Span>

      <Box
        display="grid"
        gridTemplateColumns={["1fr", " 1fr 1fr 1fr", "1fr 1fr 1fr"]}
        gridGap={"30px"}
      >
        <Box type="whyus" mt={"40px"}>
          <Span type="whyusOne">Get more </Span>
          <Span type="whyusOne" mb={"29px"}>
            visibility
          </Span>
          <Span type="location">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </Span>
        </Box>
        <Box type="whyus" mt={"40px"}>
          <Span type="whyusOne">Organize your </Span>
          <Span type="whyusOne" mb={"29px"}>
            candidates
          </Span>
          <Span type="location">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </Span>
        </Box>
        <Box type="whyus" mt={"40px"}>
          <Span type="whyusOne">Verify their </Span>
          <Span type="whyusOne" mb={"29px"}>
            abilities
          </Span>
          <Span type="location">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </Span>
        </Box>
      </Box>
    </Box>
  );
}

export default WhyUs;
