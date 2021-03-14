import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

//code spliting
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

const APP: FC = () => {
  return (
    <div>
      <Switch>
        <Redirect exact path="/" to="login" />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
};

export default APP;
