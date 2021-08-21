import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Span, H6, Input, Label } from "../../styles";
import AuthContext from "../../store/auth";
import PersonIcon from "@material-ui/icons/Person";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

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
    let url = "https://jobs-api.squareboat.info/api/v1/auth/register";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...params,
        userRole: 0,
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
            let newErrArr = {};
            if (data && data.errors) {
              data.errors.forEach((arrayItem) => {
                newErrArr = { ...newErrArr, ...arrayItem };
              });
              setApiErr(newErrArr);
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
        console.log(data);
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
          height: "730px",
          marginTop: "24.5px",
          borderRadius: "20px",
          boxShadow: "0px 30px 36px #557DA526",
          backgroundColor: "#ffffff",
          padding: "30px 30px 30px 30px",
        }}
      >
        <>
          <div>
            <H6 m={0}>Signup</H6>
          </div>
          <Box>
            <form onSubmit={handleSubmit(handleSignup)}>
              <Label>I am*</Label>
              <Box
                display="grid"
                gridTemplateColumns={["1fr", null, "1fr 1fr 1fr 1fr"]}
                gridGap={["20px"]}
              >
                <Box type="icon">
                  <PersonIcon
                    style={{
                      color: "ffffff",
                      marginRight: "10px",
                      fontSize: 24,
                    }}
                  />
                  <Span color="white">Recruiter</Span>
                </Box>
                <Box
                  type="icon"
                  style={{
                    background: "#E8E8E833",
                    border: "1px solid #C6C6C6",
                  }}
                >
                  <PeopleAltIcon
                    style={{
                      color: "#43AFFF",
                      marginRight: "10px",
                      fontSize: 24,
                    }}
                  />
                  <Span color="#303F60">Candidate</Span>
                </Box>
              </Box>
              <Label>Full name*</Label>
              <Box>
                <Input
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="off"
                  {...register("name", {
                    required: "Required",
                  })}
                  border={(apiErr || apiMessage) && "1px solid red"}
                />

                {apiErr && (
                  <Box type="row" flexDirection="row-reverse">
                    <Span type="error">{apiErr.name}</Span>
                  </Box>
                )}
              </Box>
              <Label mt={apiErr && apiErr.name && 0}>Email address*</Label>
              <Box>
                <Input
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  {...register("email", {
                    required: "Required",
                  })}
                  border={(apiErr || apiMessage) && "1px solid red"}
                />

                {apiErr && (
                  <Box type="row" flexDirection="row-reverse">
                    <Span type="error">{apiErr.email}</Span>
                  </Box>
                )}
              </Box>
              <Box
                display="grid"
                gridTemplateColumns={["1fr", null, "1fr 1fr"]}
                gridGap={["21px"]}
              >
                <Box>
                  <Label mt={apiErr && apiErr.email && 0}>
                    Create Password*
                  </Label>
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
                    {apiErr && (
                      <Box type="row" flexDirection="row-reverse">
                        <Span type="error">{apiErr.password}</Span>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Label mt={apiErr && apiErr.email && 0}>
                    Confirm Password*
                  </Label>
                  <Box>
                    <Input
                      name="confirmPassword"
                      placeholder="Enter your password"
                      autoComplete="off"
                      {...register("confirmPassword", {
                        required: "Required",
                      })}
                      type="password"
                      border={(apiErr || apiMessage) && "1px solid red"}
                    />
                    {/* {errors.message && errors.message.message} */}
                    {apiErr && (
                      <Box type="row" flexDirection="row-reverse">
                        <Span type="error">{apiErr.confirmPassword}</Span>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <Label
                mt={apiErr && (apiErr.password || apiErr.confirmPassword) && 0}
              >
                Skills
              </Label>
              <Box>
                <Input
                  name="skills"
                  placeholder="Enter comma separated skills"
                  autoComplete="off"
                  {...register("skills", {
                    required: "Required",
                  })}
                  border={(apiErr || apiMessage) && "1px solid red"}
                />

                {apiErr && (
                  <Box type="row" flexDirection="row-reverse">
                    <Span type="error">{apiErr.skills}</Span>
                  </Box>
                )}
              </Box>
              {apiMessage && (
                <Box type="row" flexDirection="row-reverse">
                  <Span type="error">{apiMessage}</Span>
                </Box>
              )}
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
                  {"Signup"}
                </Button>
              </Box>
            </form>
          </Box>
          <Box type="row" justifyContent="center" width="100%">
            <Span>
              {"Have an account?  "}
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <Span color="#43AFFF"> Login</Span>{" "}
              </Link>
            </Span>
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default AuthForm;
