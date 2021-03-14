import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container, Header, Form, Label, Input, _Link, Button, Error } from './styles';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import useInput from '@hooks/useInput';

const SignUp = ({ history }: RouteComponentProps) => {
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [nicknameRequiredError, setNicknameRequiredError] = useState(false);
  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const regExpRequired = /^[a-zA-Z0-9]+$/;
  const regExpEmailRequired = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
  const regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;

  const email = useInput('', [[regExpEmailRequired, setEmailRequiredError]]);
  const nickname = useInput('', [[regExpRequired, setNicknameRequiredError]]);
  const password = useInput('', [[regExpPassword, setPasswordValidationError]]);
  const passwordConfirm = useInput('', [[password.value, setPasswordMismatchError]]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (email.value === '') setEmailRequiredError(true);
      else if (nickname.value === '') setNicknameRequiredError(true);
      else if (password.value === '') setPasswordValidationError(true);
      else if (passwordConfirm.value === '') setPasswordMismatchError(true);
      else if (!passwordMismatchError && !passwordValidationError && !nicknameRequiredError && !emailRequiredError)
        // submit here
        setSignUpError(false);
      setSignUpSuccess(false);
      axios
        .post(
          'http://localhost:3095/api/users',
          {
            email: email.value,
            nickname: nickname.value,
            password: password.value,
          },
          { withCredentials: true },
        )
        .then((response) => {
          console.log(response);
          setSignUpSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setSignUpError(true);
        })
        .finally(() => {});
    },
    [email.value, nickname.value, password.value, passwordConfirm.value],
  );
  useEffect(() => {
    if (signUpSuccess) {
      history.push('/login');
    }
  }, [signUpSuccess]);
  return (
    <>
      <Container>
        <Header>Slack Sign Up</Header>
        <Form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={email.onChange}
            value={email.value}
            id="email"
            type="email"
            placeholder="name@work-email.com"
          ></Input>
          {emailRequiredError && <Error>Email is required</Error>}
          {signUpError && <Error>This email already taken</Error>}
          <Label htmlFor="nickname">Nickname</Label>
          <Input onChange={nickname.onChange} value={nickname.value} type="text" id="nickname"></Input>
          {nicknameRequiredError && <Error>Nickname is required</Error>}
          <Label htmlFor="password">Password</Label>
          <Input onChange={password.onChange} value={password.value} type="password" id="password"></Input>
          {passwordValidationError && (
            <Error>Must contain upper, lower case letters and special characters, numbers.</Error>
          )}
          <Label htmlFor="password-confirm">Confirm Password</Label>
          <Input
            onChange={passwordConfirm.onChange}
            value={passwordConfirm.value}
            type="password"
            id="password-confirm"
          ></Input>
          {passwordMismatchError && <Error>Password is not confirmed</Error>}
          <Button type="submit">Register</Button>
        </Form>
        <_Link to="/login">Do you have an account?</_Link>
      </Container>
    </>
  );
};

export default SignUp;
