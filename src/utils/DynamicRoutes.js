import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthState } from '../context/auth'

export default function DynamicRoutes(props) {
    const { user } = useAuthState();
    
    if (props.authenticated && !user){
        return <Redirect to="/login" />
    } else {
        return <Route component={props.component} {...props} />
    }
    
}