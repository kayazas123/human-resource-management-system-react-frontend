import { ThemeProvider } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import EmployeeDetail from "../dto/EmployeeDetail";
import EmployeeHeader from "./ui/EmployeeHeader";
import theme from "./ui/theme";
import UpdateEmployeeProfile from "./UpdateEmployeeProfile";
import NotApproved from "./NotApproved";
import JoinCompany from "./JoinCompany";
import EmployeeHomeScreen from "./EmployeeHomeScreen";

export default function EmployeeDashboard(props) {
    var axios = require('axios');
    const [employeeDetails, setEmployeeDetails] = useState(null);

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:9090/v1/employee/' + props.userId,
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId
            }
        };

        axios(config)
            .then(function (response) {
                var data = response.data;
                setEmployeeDetails(new EmployeeDetail(data.emailId, data.firstName, data.lastName, data.middleName, data.description, data.status, data.gender, data.profilePicture, data.dateOfBirth, data.countryId, data.profileCompleted, data.companyStatus));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <EmployeeHeader {...props} />
                <Switch>
                    <Route exact path='/' >
                        {(employeeDetails != null && !employeeDetails.profileCompleted) &&
                            <Redirect to='/employee-dashboard/update-profile' />}
                        {(employeeDetails != null && (employeeDetails.profileCompleted && !employeeDetails.companyStatus === 1)) &&
                            <Redirect to='/employee-dashboard/join-company' />}
                        {(employeeDetails != null && (employeeDetails.profileCompleted && employeeDetails.companyStatus === 1)) &&
                            <Redirect to='/employee-dashboard' />}

                    </Route>
                    <Route exact path='/employee-dashboard' render={()=><EmployeeHomeScreen {...props}/>}/>
                    <Route exact path='/employee-dashboard/update-profile' render={(renderProps) => <UpdateEmployeeProfile employeeDetails={employeeDetails} {...props} {...renderProps} />} />
                    <Route exact path='/employee-dashboard/join-company' render={(renderProps) => <JoinCompany {...renderProps} employeeDetails={employeeDetails} {...props} />} />
                    <Route exact path='/employee-dashboard/not-approved' render={() => <NotApproved {...props} employeeDetails={employeeDetails} />} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}