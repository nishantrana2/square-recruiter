import React from "react";
import { Box, Button, Span, H6 } from "../../../../styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useHistory, Link } from "react-router-dom";

const EmptyPostCard = () => {
  const history = useHistory();

  const postDirectHandler = () => {
    history.replace("/create");
  };

  return (
    <Box
      type="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "70vh" }}
    >
      <FileCopyIcon
        style={{
          color: "#A9AFBC",
          fontSize: 100,
        }}
      />
      <Span type="noPost" mt={"19px"}>
        Your posted jobs will show here!
      </Span>
      <Button type="noPost" onClick={postDirectHandler}>
        {" "}
        Post a Job
      </Button>
    </Box>
  );
};

export default EmptyPostCard;
