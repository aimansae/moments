import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/js/bootstrap.bundle";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults'
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";


function App() {

  const currentUser = useCurrentUser();
  //defailt to empty string
  const profile_id = currentUser?.profile_id || '';

  return (

    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <PostsPage message='No results' />} />
          <Route exact path="/feed" render={() => <PostsPage
            message='No results adjust or follow a user'
            filter={`owner__followed__owner__profile=${profile_id}&`} />} />
          <Route exact path="/liked" render={() => <PostsPage
            message='No results adjust or like a post'
            filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} />} />

          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />

          {/*for invalid url*/}
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;
