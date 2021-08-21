import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme";
import AuthContext from "./store/auth";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";

function App() {
  const auth = useContext(AuthContext);
  console.log(auth);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          {!auth.isLoggedIn && (
            <Route path="/auth">
              <Auth />
            </Route>
          )}
          {!auth.isLoggedIn && (
            <Route path="/signup">
              <Signup />
            </Route>
          )}
          {!auth.isLoggedIn && (
            <Route path="/reset-password">
              <ResetPassword />
            </Route>
          )}
          {auth.isResetToken && (
            <Route path="/new-password">
              <NewPassword />
            </Route>
          )}
          <Route path="/jobs">
            {auth.isLoggedIn && <Jobs />}
            {!auth.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/create">
            {auth.isLoggedIn && <CreateJob />}
            {!auth.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
