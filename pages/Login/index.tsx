import React, { FC, useCallback, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Container, Header, Form, Label, Input, _Link, Button, Error } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';

const Login: FC = () => {
  const { data, error } = useSWR('http://localhost:3095/api/users', fetcher);
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);
  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const regExpPasswordRequired = /^[a-zA-Z0-9!@#$%^*+=-]+$/;
  const regExpEmailRequired = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
  const email = useInput('', [[regExpEmailRequired, setEmailRequiredError]]);
  const password = useInput('', [[regExpPasswordRequired, setPasswordRequiredError]]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (email.value === '') setEmailRequiredError(true);
      else if (password.value === '') setPasswordRequiredError(true);
      else if (!passwordRequiredError && !emailRequiredError)
        // submit here
        setLoginError(false);
      setLoginSuccess(false);
      axios
        .post(
          'http://localhost:3095/api/users/login',
          {
            email: email.value,
            password: password.value,
          },
          { withCredentials: true },
        )
        .then((response) => {
          console.log(response);
          setLoginSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setLoginError(true);
        })
        .finally(() => {});
    },
    [email.value, password.value],
  );

  return (
    <>
      <Container>
        <Header>Slack Log In</Header>
        <Form onSubmit={onSubmit}>
          <Label>Email</Label>
          <Input onChange={email.onChange} value={email.value} type="email" placeholder="name@work-email.com"></Input>
          {emailRequiredError && <Error>Email is required</Error>}
          <Label>Password</Label>
          <Input onChange={password.onChange} value={password.value} type="password"></Input>
          {passwordRequiredError && <Error>Password is required</Error>}
          <Button type="submit">Log In</Button>
        </Form>
        <_Link to="/signup">Don't you have an account?</_Link>
      </Container>
    </>
  );
};

Login.propTypes = {};

export default Login;
