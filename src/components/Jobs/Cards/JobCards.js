import React from "react";
import { Box } from "../../../styles";
import Card from "./Card/Card";
import EmptyPostCard from "./Card/EmptyPostCard";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      justifyContent: "center",
      margin: "20px",
      marginTop: theme.spacing(2),
    },
  },
}));

const JobCards = ({ metadata, posts, pageHandler }) => {
  console.log("inside", metadata, posts);

  const classes = useStyles();

  const jobPageHandler = (event, page) => {
    pageHandler(page);
  };

  if (posts.length === 0) {
    return <EmptyPostCard />;
  }

  return (
    <Box
      type="column"
      justifyContent="space-between"
      style={{ height: "80vh" }}
    >
      <Box
        display="grid"
        gridTemplateColumns={["1fr", " 1fr 1fr 1fr ", "1fr 1fr 1fr"]}
        gridGap={[2]}
        style={{ overflowY: "scroll" }}
      >
        {posts.map((post) => {
          return <Card key={post.id} post={post} />;
        })}
      </Box>

      {/* pagination */}
      <div className={classes.root}>
        <Pagination
          count={
            metadata &&
            Math.round(metadata.count / metadata.limit) +
              (metadata.count % metadata.limit && 1)
          }
          variant="outlined"
          shape="rounded"
          onChange={jobPageHandler}
        />
      </div>
    </Box>
  );
};

export default JobCards;
