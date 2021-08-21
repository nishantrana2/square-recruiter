import React from "react";
import { Box, Span } from "../../styles";
import Avatar from "@material-ui/core/Avatar";

const ApplicationsCard = ({ app }) => {
  return (
    <Box type="applications">
      <Box
        display="grid"
        gridTemplateColumns={["1fr", " 1fr 3fr", "1fr 3fr"]}
        gridGap={[1]}
        width="100%"
      >
        <Avatar
          style={{
            backgroundColor: "#D9EFFF",
            color: "#303F60",
          }}
        >
          {app.name[0].toUpperCase()}
        </Avatar>
        <Box type="column">
          <Span>{app.name}</Span>
          <Span type="lessOp">{app.email}</Span>
        </Box>
      </Box>

      <Box type="column" mt={4}>
        <Span>{"Skills"}</Span>
        <Span type="lessOp">{app.skills}</Span>
      </Box>
    </Box>
  );
};

export default ApplicationsCard;
