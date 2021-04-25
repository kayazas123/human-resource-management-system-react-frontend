import { ThemeProvider } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ManagerDetail from "../dto/ManagerDetail";
import ManagerHomeScreen from "./ManagerHomeScreen";
import NotFound from "./NotFound";
import ManagerHeader from "./ui/ManagerHeader";
import CreateCompany from "./CreateCompany";
import theme from "./ui/theme";
import UpdateManagerProfile from "./UpdateManagerProfile";
import LoggedInContactUs from "./LoggedInContactUs";
import AttendanceReports from "./AttendanceReports";
import PayrollReports from "./PayrollReports";
import UpdateCompany from "./UpdateCompany";
import companyIssues from "./CompanyIssues";
import CompanyIssues from "./CompanyIssues";
import CompanyEmployees from "./CompanyEmployees";
import CompanyEvents from "./CompanyEvents";

export default function ManagerDashboard(props) {
  var axios = require('axios');
  const [managerDetails, setManagerDetails] = useState(null);

  useEffect(() => {
    console.log(props.authentication)
    console.log(props.userId)
    var config = {
      method: 'get',
      url: 'http://localhost:9090/v1/manager/' + props.userId,
      headers: {
        'Authentication': 'BEARER ' + props.authentication,
        'User-Id': props.userId
      }
    };

    axios(config)
      .then(function (response) {
        var data = response.data;
        setManagerDetails(new ManagerDetail(data.emailId, data.firstName, data.lastName, data.middleName, data.description, data.status, data.gender, data.profilePicture, data.dateOfBirth, data.countryId, data.profileCompleted, data.companyCreated));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ManagerHeader {...props} />
        <Switch>
          <Route exact path='/' >
            {(managerDetails != null && !managerDetails.profileCompleted) &&
              <Redirect to='/manager-dashboard/update-profile' />}
            {(managerDetails != null && (managerDetails.profileCompleted && !managerDetails.companyCreated)) &&
              <Redirect to='/manager-dashboard/create-company' />}
            {(managerDetails != null && (managerDetails.profileCompleted && managerDetails.companyCreated)) &&
              <Redirect to='/manager-dashboard' />}
          </Route>
          <Route exact path='/manager-dashboard' render={() => <ManagerHomeScreen {...props} />} />
          <Route exact path='/manager-dashboard/update-profile' render={(renderProps) => <UpdateManagerProfile managerDetails={managerDetails} {...props} {...renderProps} />} />
          <Route exact path='/manager-dashboard/create-company' render={(renderProps) => <CreateCompany managerDetails={managerDetails} {...props} {...renderProps} />} />
          <Route exact path='/manager-dashboard/update-company-details' render={(renderProps) => <UpdateCompany {...renderProps} {...props} managerDetails={managerDetails} />} />
          <Route exact path='/manager-dashboard/company-events' render={(renderProps) => <CompanyEvents {...renderProps} {...props} managerDetails={managerDetails} />}  />
          <Route exact path='/manager-dashboard/company-issues' render={(renderProps) => <CompanyIssues {...renderProps} {...props} managerDetails={managerDetails} />} />
          <Route exact path='/manager-dashboard/company-issue/:issueId' component={() => <h1>View Company Issue By Id</h1>} />
          <Route exact path='/manager-dashboard/company-employees' render={(renderProps) => <CompanyEmployees {...renderProps} {...props} managerDetails={managerDetails} />} />
          <Route exact path='/manager-dashboard/contact-us' render={(renderProps) => <LoggedInContactUs {...renderProps} {...props} managerDetails={managerDetails} />} />
          <Route exact path='/manager-dashboard/attendance-reports' render={(renderProps) => <AttendanceReports {...renderProps} {...props} managerDetails={managerDetails} />} />
          <Route exact path='/manager-dashboard/payroll-reports' render={(renderProps) => <PayrollReports {...renderProps} {...props} managerDetails={managerDetails} />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}