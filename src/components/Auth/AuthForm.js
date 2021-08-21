import { useState, useRef, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Span, H6, Input, Label } from "../../styles";
import AuthContext from "../../store/auth";

const AuthForm = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [apiErr, setApiErr] = useState();
  const [apiMessage, setApiMessage] = useState();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSignup = (params) => {
    setApiErr();
    setApiMessage();
    setIsLoading(true);
    let url = "https://jobs-api.squareboat.info/api/v1/auth/login";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...params,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.errors) {
              let newErrArr = {};
              if (data && data.errors) {
                data.errors.forEach((arrayItem) => {
                  newErrArr = { ...newErrArr, ...arrayItem };
                });
                setApiErr(newErrArr);
              }
            } else if (data && data.message) {
              setApiMessage(data.message);
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        auth.login(data.data.token);
        history.replace("/jobs");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box
      style={{
        height: "80vh",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        style={{
          width: "557px",
          height: "460px",
          borderRadius: "20px",
          boxShadow: "0px 30px 36px #557DA526",
          backgroundColor: "#ffffff",
          padding: "30px 30px 30px 30px",
        }}
      >
        <>
          <div>
            <H6 m={0}>Login</H6>
          </div>
          <Box>
            <form onSubmit={handleSubmit(handleSignup)}>
              <Label>Email address</Label>
              <Box>
                <Input
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  {...register("email", {
                    required: "Required",
                  })}
                  border={(apiErr || apiMessage) && "1px solid red"}
                  // type="email"
                />
                {/* {errors.message && errors.message.message} */}
                {apiErr && (
                  <Box type="row" flexDirection="row-reverse">
                    <Span type="error">{apiErr.email}</Span>
                  </Box>
                )}
              </Box>
              <Box type="row" mt={apiErr && apiErr.email && 0}>
                <Label>Password</Label>
                <Link to="/reset-password" style={{ textDecoration: "none" }}>
                  <Span type="link">Forgot your password?</Span>{" "}
                </Link>
              </Box>
              <Box>
                <Input
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="off"
                  {...register("password", {
                    required: "Required",
                  })}
                  type="password"
                  border={(apiErr || apiMessage) && "1px solid red"}
                />
                {/* {errors.message && errors.message.message} */}
                {apiMessage && (
                  <Box type="row" flexDirection="row-reverse">
                    <Span type="error">
                      {"Incorrect email address or password."}
                    </Span>
                  </Box>
                )}
              </Box>

              <Box
                type="row"
                justifyContent="center"
                style={{ marginTop: "40px", marginBottom: "52px" }}
              >
                <Button type="primary" fontSize={"16px"}>
                  {/* {loading ? (
                  <ClipLoader color={"#ffffff"} size={25} />
                ) : (
                  "Sign up"
                )} */}
                  {"login"}
                </Button>
              </Box>
            </form>
          </Box>
          <Box type="row" justifyContent="center" width="100%">
            <Span>
              {"New to MyJobs?  "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Span color="#43AFFF"> Create an account</Span>{" "}
              </Link>
            </Span>
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default AuthForm;
