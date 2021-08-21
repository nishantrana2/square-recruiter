import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BreadcrumbsM from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import { Box } from "../../styles";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: "white",
    fontSize: "12px",
    fontWeight: "500px",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 15,
    color: "white",
  },
}));

const Breadcrumbs = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <Box style={{ paddingLeft: "173px", paddingTop: "12px" }}>
      <BreadcrumbsM aria-label="breadcrumb" style={{ color: "white" }}>
        <Link color="inherit" href="/jobs" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Home
        </Link>
        {location.pathname === "/create" && (
          <Link color="inherit" className={classes.link}>
            Post a Job
          </Link>
        )}
      </BreadcrumbsM>
    </Box>
  );
};

export default Breadcrumbs;
