import React from "react";
import { Box, Button, Span, H6 } from "../../../../styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Applications from "../../../Modal/Applications";

const Card = ({ post }) => {
  const [open, setOpen] = React.useState(false);
  const [jobId, setJobId] = React.useState(false);

  const openHandler = (id) => {
    setJobId(id);
    setOpen(true);
  };

  return (
    <Box type="card">
      <Span type="cardTitle">{post.title}</Span>
      <Span type="cardDesc" className={"description"} height="30px">
        {post.description}
      </Span>

      <Box
        display="grid"
        gridTemplateColumns={["1fr", null, "1fr 2fr "]}
        gridGap={[0]}
      >
        <Box type="location">
          <LocationOnIcon style={{ color: "#43AFFF" }} />
          <Span type="location"> {post.location}</Span>
        </Box>
        <Box type="view" onClick={() => openHandler(post.id)}>
          View applications
        </Box>
      </Box>
      <Applications open={open} setOpen={setOpen} id={jobId} />
    </Box>
  );
};

export default Card;
