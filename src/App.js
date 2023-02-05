import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/js/bootstrap.bundle";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults'
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";


function App() {
 
  return (

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
      
  );
}

export default App;
