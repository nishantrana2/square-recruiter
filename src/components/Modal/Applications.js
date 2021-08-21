import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../../store/auth";
import { Box, H6, Span } from "../../styles";
import Divider from "@material-ui/core/Divider";
import ApplicationsCard from "../Applications/ApplicationsCard";
import EmptyApplicationsCard from "../Applications/EmptyApplicationsCard";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 30px 36px #557DA526",
    outline: 0,
    width: "50vw",
    height: "70vh",
    padding: "25px 22px",
  },
}));

export default function Applications({ open, setOpen, id }) {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (id) {
      let url = `https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${id}/candidates`;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: auth.token,
        },
      })
        .then((res) => {
          setIsLoading(false);

          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              // let errorMessage = "Authentication failed!";
              // history.replace("/");
              // auth.logout();
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data.data);
          setApplications(data.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [auth, id]);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <H6 type="apphead">Applicants for this job</H6>
            <Divider style={{ margin: "0px 8px" }} />
            <Span style={{ margin: "11px 0px 10px 8px" }}>
              {" "}
              {`Total ${applications.length} applications`}
            </Span>
            {applications.length === 0 ? (
              <EmptyApplicationsCard />
            ) : (
              <>
                {" "}
                <Box
                  display="grid"
                  gridTemplateColumns={["1fr", " 1fr 1fr", "1fr 1fr"]}
                  gridGap={"30px"}
                  style={{
                    overflowY: "scroll",
                    backgroundColor: "#557DA526",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                >
                  {applications &&
                    applications.map((app) => {
                      return <ApplicationsCard key={app.id} app={app} />;
                    })}
                </Box>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
