import { useState, useEffect, useContext } from "react";
import { Box, Button, Span, H6 } from "../../styles";
import AuthContext from "../../store/auth";
import JobCards from "./Cards/JobCards";
import { useHistory, Link } from "react-router-dom";

const Posts = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [metadata, setMetadata] = useState();
  const [page, setPage] = useState(1);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let url = `https://jobs-api.squareboat.info/api/v1/recruiters/jobs?page=${page}`;
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
            history.replace("/");
            auth.logout();
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (data && data.data) {
          setMetadata(data.data.metadata);
          setPosts(data.data.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [auth, page]);
  console.log("setPosts", posts, metadata, page);

  const pageHandler = (page) => {
    setPage(page);
  };

  return (
    <Box style={{ padding: " 24px 173px " }}>
      <H6 m={0} mb={"10px"} color="white">
        Jobs posted by you
      </H6>
      <JobCards metadata={metadata} posts={posts} pageHandler={pageHandler} />
    </Box>
  );
};

export default Posts;
