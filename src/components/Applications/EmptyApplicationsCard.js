import React from "react";
import { Box, Span } from "../../styles";
import DescriptionIcon from "@material-ui/icons/Description";

const EmptyPostCard = () => {
  return (
    <Box
      type="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "70vh", backgroundColor: "#557DA526" }}
    >
      <DescriptionIcon
        style={{
          color: "#A9AFBC",
          fontSize: 100,
        }}
      />
      <Span type="noPost" mt={"19px"}>
        No applications available!
      </Span>
    </Box>
  );
};

export default EmptyPostCard;
