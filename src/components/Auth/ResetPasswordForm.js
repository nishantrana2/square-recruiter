import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Span, H6, Input, Label } from "../../styles";
import AuthContext from "../../store/auth";

const ResetPasswordForm = () => {
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

  const handleSignup = (params) => {
    setApiErr();
    setApiMessage();
    setIsLoading(true);
    let url = `https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email=${params.email}`;
    fetch(url, {
      method: "GET",
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
        auth.reset(data.data.token);
        history.replace("/new-password");
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
          height: "350px",
          borderRadius: "20px",
          boxShadow: "0px 30px 36px #557DA526",
          backgroundColor: "#ffffff",
          padding: "30px 30px 30px 30px",
        }}
      >
        <>
          <div>
            <H6 m={0}>Forgot your password?</H6>
          </div>
          <Span mt={"20px"}>
            Enter the email associated with your account and we’ll send you
            instructions to reset your password.
          </Span>
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
                />

                {apiMessage && (
                  <Box type="row" flexDirection="row-reverse">
                    <Span type="error">{apiMessage}</Span>
                  </Box>
                )}
              </Box>

              <Box
                type="row"
                justifyContent="center"
                style={{ marginTop: "40px" }}
              >
                <Button type="primary" fontSize={"16px"}>
                  {"login"}
                </Button>
              </Box>
            </form>
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
