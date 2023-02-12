import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import {useRedirect} from '../../hooks/useRedirect';
import { setTokenTimestamp } from "../../utils/utils";


function SignInForm() {
    const setCurrentUSer = useSetCurrentUser()
    useRedirect('loggedIn')
    
    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    // destructure signInData
    const { username, password } = signInData
    // to redirect the user to the home page after successfully logging in.
    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post('/dj-rest-auth/login/', signInData)
            setCurrentUSer(data.user)
            setTokenTimestamp(data); // to extract expiry date for token
            history.goBack()
        } catch (err) {
            setErrors(err.response?.data)

        }

    }


    return (
        <Row className={styles.Row}>
            <Col className="my-auto p-0 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>sign in</h1>
                    {/* Add your form here */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="Enter username"
                                name='username'
                                vale={username}
                                onChange={handleChange} />

                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert variant='warning' key={idx}>{message}</Alert>))}

                        <Form.Group controlId="password">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Password"
                                name='password'
                                vale={password}
                                onChange={handleChange} />
                        </Form.Group>
                        {errors.password?.map((message, idx) => (
                            <Alert key={idx}>{message}</Alert>
                        ))}
                        <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                            Sign In
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                        ))}
                    </Form>

                </Container>
                <Container className={`mt-3 ${appStyles.Content}`}>
                    <Link className={styles.Link} to="/signup">
                        Don't have an account? <span>Sign up now!</span>
                    </Link>
                </Container>
            </Col>
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
                />
            </Col>
        </Row>
    );
}


export default SignInForm;