import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
    const currentUser = useCurrentUser()

    const addPostIcon = (
    //for add post icons
    <NavLink 
        className = { styles.NavLink }
        activeClassName = { styles.Active }
        to = "/posts/create" 
    >
        <i className="far fa-plus-square"></i>Add post
    </NavLink>
    )

    const loggedInIcons = <>{currentUser?.username}</>
    const loggedOutIcons =(
    <>
    <NavLink 
        className = { styles.NavLink }
        activeClassName = { styles.Active }
        to = "/signin" 
    >
        <i className="fas fa-sign-in-alt"></i>Sign in
    </NavLink >
    < NavLink 
        className = { styles.NavLink }
        activeClassName = { styles.Active }
        to = "signup">
        <i className="fas fa-user-plus"></i>Sign up
    </NavLink >
    </>
)

    return (
        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <Container>
                <NavLink to="/"> {/* wrap here */}
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45" />
                    </Navbar.Brand>
                </NavLink> {/* closed wrap here */}
                {currentUser && addPostIcon}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        {/* wrap here */}
                        {/* to remove active from others*/}
                        <NavLink exact
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            to="/">
                            <i className="fas fa-home"></i>Home
                        </NavLink> {/*FONT AVESOME*/}
                        {currentUser? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
