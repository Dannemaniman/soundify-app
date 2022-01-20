import React from 'react';
import { Route, Navigate } from "react-router-dom";


const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Navigate to='/login' />
      )} />
)

export default GuardedRoute;