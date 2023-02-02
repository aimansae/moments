import { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
    const [signupData, setSignUpdata] = useState({
        username: '',
        password1: '',
        password2: '',

    })

    //destructure to avoid dot notatio to access the data
    const { username, password1, password2 } = signupData;

    // to restore all the errors
    const [errors, setErrors] = useState({})
    // to be redirected to sign in pageXOffset, after registration
    const history = useHistory();


    //change handler to start typing in the fields

    const handleChange = (event) => {
        setSignUpdata({
            ...signupData,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        //so the page doesnt refresh
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signupData)
            history.push('/signin')
        } catch (err) {
            // chaining, check if response is defined, if not no error will show
            setErrors(err.response?.data);
        }



    }
    return (
        <Row className={styles.Row}>
            <Col className="my-auto py-2 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>sign up</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="Username"
                                name='username'
                                value={username}
                                onChange={handleChange} />

                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="password1">
                            <Form.Label

                                className="d-none">Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Password"
                                name='password1'
                                value={password1}
                                onChange={handleChange} />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Form.Group controlId="password2">
                            <Form.Label

                                className="d-none"> Confirm Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Confirm Password"
                                name='password2'
                                value={password2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password2?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                            Sign Up
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert variant="warning" key={idx} className="mt-3">
                                {message}
                                
                            </Alert>
                            ))}
                    </Form>

                </Container>
                <Container className={`mt-3 ${appStyles.Content}`}>
                    <Link className={styles.Link} to="/signin">
                        Already have an account? <span>Sign in</span>
                    </Link>
                </Container>
            </Col>
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={
                        "https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"
                    }
                />
            </Col>
        </Row>
    );
};

export default SignUpForm;