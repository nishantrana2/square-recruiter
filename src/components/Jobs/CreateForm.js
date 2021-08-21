import { useState, useRef, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Span, H6, Input, Label, Textarea } from "../../styles";
import AuthContext from "../../store/auth";

const CreateForm = () => {
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
    let url = "https://jobs-api.squareboat.info/api/v1/jobs/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...params,
      }),
      headers: {
        Authorization: auth.token,
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
        history.replace("/jobs");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  console.log(apiErr, apiMessage);
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
          height: "500px",
          borderRadius: "20px",
          boxShadow: "0px 30px 36px #557DA526",
          backgroundColor: "#ffffff",
          padding: "30px 30px 30px 30px",
        }}
      >
        <>
          <div>
            <H6 m={0}>Post a Job</H6>
          </div>
          <Box>
            <form onSubmit={handleSubmit(handleSignup)}>
              <Label>Job title*</Label>
              <Box>
                <Input
                  name="title"
                  placeholder="Enter job title"
                  autoComplete="off"
                  {...register("title", {
                    required: "Required",
                  })}
                  border={(apiErr || apiMessage) && "1px solid red"}
                  // type="email"
                />
                {/* {errors.message && errors.message.message} */}
                {apiErr && (
                  <Box type="row" flexDirection="row-reverse">
                    <Span type="error">{apiErr.title}</Span>
                  </Box>
                )}
              </Box>

              <Label mt={apiErr && apiErr.title && 0}>Description*</Label>

              <Box>
                <Textarea
                  name="description"
                  placeholder="Enter job description"
                  autoComplete="off"
                  {...register("description", {
                    required: "Required",
                  })}
                  border={(apiErr || apiMessage) && "1px solid red"}
                />
                {apiErr && (
                  <Box type="row" flexDirection="row-reverse">
                    <Span type="error">{apiErr.description}</Span>
                  </Box>
                )}

                <Label mt={apiErr && apiErr.description && 0}>Location*</Label>

                <Box>
                  <Input
                    name="location"
                    placeholder="Enter location"
                    autoComplete="off"
                    {...register("location", {
                      required: "Required",
                    })}
                    border={(apiErr || apiMessage) && "1px solid red"}
                  />
                  {apiErr && (
                    <Box type="row" flexDirection="row-reverse">
                      <Span type="error">{apiErr.location}</Span>
                    </Box>
                  )}
                </Box>
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
                  {"Post"}
                </Button>
              </Box>
            </form>
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default CreateForm;
