import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Span, H6, Input, Label } from "../../styles";
import AuthContext from "../../store/auth";

const NewPasswordForm = () => {
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

  useEffect(() => {
    let url = `https://jobs-api.squareboat.info/api/v1/auth/resetpassword/${auth.resetToken}`;
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
            history.replace("/");
            auth.logout();
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [auth]);

  const handleSignup = (params) => {
    setApiErr();
    setApiMessage();
    setIsLoading(true);
    let url = "https://jobs-api.squareboat.info/api/v1/auth/resetpassword";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...params,
        token: auth.resetToken,
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
        localStorage.removeItem("resetToken");
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
          height: "430px",
          borderRadius: "20px",
          boxShadow: "0px 30px 36px #557DA526",
          backgroundColor: "#ffffff",
          padding: "30px 30px 30px 30px",
        }}
      >
        <>
          <div>
            <H6 m={0}>Reset Your Password</H6>
          </div>
          <Span mt={"20px"}>Enter your new password below.</Span>
          <Box>
            <form onSubmit={handleSubmit(handleSignup)}>
              <Label>New password</Label>
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
              <Label mt={apiErr && apiErr.password && 0}>
                Confirm new password
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
                  {/* {loading ? (
                  <ClipLoader color={"#ffffff"} size={25} />
                ) : (
                  "Sign up"
                )} */}
                  {"Resets"}
                </Button>
              </Box>
            </form>
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default NewPasswordForm;
