import styles from "./App.module.css";

import NavBar from "./components/NavBar";
import "bootstrap/dist/js/bootstrap.bundle";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults'
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

//useContext

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

function App() {
  //create useState hook first:
  const [currentUser, setCurrentUSer] = useState(null)

  const handleMount = async () => {
    try {
      const { data } = await axios.get('dj-rest-auth/user/')
      setCurrentUSer(data)

    } catch (err) {
      console.log(err)

    }
  }
  // to run the code when the component mounts
  useEffect(() => {
    handleMount()

  }, [])
  return (
    //to pass the context with value
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home Page</h1>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              {/*for invalid url*/}
              <Route render={() => <p>Page not found</p>} />
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
