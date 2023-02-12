import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";


test ('renders NavBar', () =>{
    render(<Router>
        <NavBar/>
    </Router>
    )
    //screen.debug()  as cosole.log to see everything

    // to check if signin button is there
    const signInLink = screen.getByRole('link', {name: 'Sign in'})
    expect(signInLink).toBeInTheDocument()

    

})

// to check link to user profile in avatar is rendered
test ('renders link to user profile for a logged in user', async () =>{
    render(<Router>
        <CurrentUserProvider>
        <NavBar/>
        </CurrentUserProvider>
    </Router>
    )
    //screen.debug()  as cosole.log to see everything
    
    const profileAvatar = await screen.findByText('Profile')
    expect(profileAvatar).toBeInTheDocument()

})
// to check signup and signin link appear
test("renders Sign in and Sign up buttons again on log out", async () => {
    render(
      <Router>
        <CurrentUserProvider>
          <NavBar />
        </CurrentUserProvider>
      </Router>
    );
  
    const signOutLink = await screen.findByRole("link", { name: "Sign out" });
    fireEvent.click(signOutLink);
  
    // const signInLink = await screen.findByRole("link", { name: "Sign in" });
    const signUpLink = await screen.findByRole("link", { name: "Sign up" });
  
    expect(signInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });
