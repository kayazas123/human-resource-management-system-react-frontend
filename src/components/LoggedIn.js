import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import EmployeeDashboard from "./EmployeeDashboard";
import ManagerDashboard from "./ManagerDashboard";

export default function LoggedIn(props) {
    const authentication = props.authentication;
    const refreshToken = props.refreshToken;
    const accountType = props.accountType;
    const userId = props.userId;
    const setCookie = props.setCookie;
    const axios = require('axios');
    const [refreshTokenTimer, setRefreshTokenTimer] = useState('NOT STARTED');

    useEffect(() => {
        if (refreshTokenTimer !== 'STOP') {
            setRefreshTokenTimer(setInterval(() => {
                axios.get(`https://flenderson-spring-hrm.herokuapp.com/v1/refresh-token/${refreshToken}`).then(({ data }) => {
                    setCookie("Authentication", data.access_token);
                })
            }, 300000));
        }
    }, [])

    return (
        <>
            {accountType === 'MANAGER' ? <ManagerDashboard {...props} setRefreshTokenTimer={setRefreshTokenTimer} /> : <EmployeeDashboard  {...props} setRefreshTokenTimer={setRefreshTokenTimer} />}
        </>
    );
};