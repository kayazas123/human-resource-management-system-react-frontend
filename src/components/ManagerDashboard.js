import { ThemeProvider } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ManagerDetail from "../dto/ManagerDetail";
import NotFound from "./NotFound";
import ManagerHeader from "./ui/ManagerHeader";
import theme from "./ui/theme";

export default function ManagerDashboard(props) {
    var axios = require('axios');
    const [managerDetails, setManagerDetails] = useState(null);

    useEffect(() => {
      console.log(props.userId)
        var config = {
            method: 'get',
            url: 'https://flenderson-spring-hrm.herokuapp.com/v1/manager/bc89162f-0ab6-4063-b858-4dda8fd179a7',
            headers: { 
              'Authentication': 'BEARER eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3ZVo4OVhsYl8zSnV6ZG9RblhFdVpVRE1aaWprZWIyNVlTeHBTeDJnV2ZJIn0.eyJleHAiOjE2MTgzMzIyMjEsImlhdCI6MTYxODMzMTkyMSwiYXV0aF90aW1lIjoxNjE4MzMxODkxLCJqdGkiOiI1ZDhjYjZiZS00YTMwLTRhMWUtYmYwZC1hNjNkYWFiYzEzMDIiLCJpc3MiOiJodHRwczovL2hlaW1kYWxsLWtleWNsb2FrLmhlcm9rdWFwcC5jb20vYXV0aC9yZWFsbXMvRmxlbmRlcnNvbiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI0YTBiOTA0Ni1lYjUwLTQzNzQtYTNhOS05ZmE0NzkxNzc1ZjgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJDUE94TW9Zb2ExN1dISjhZRFI5eTVtVnRjY0h5RVZiNHZiIiwic2Vzc2lvbl9zdGF0ZSI6IjNlYzcwMzdkLTYzZDItNDYxMS04ODZmLTliOTNjNDZlMDgwOCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBtYW5hZ2VyIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSGFyZGlrIFNpbmdoIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGFyZGlrYmVobDVAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IkhhcmRpayIsImZhbWlseV9uYW1lIjoiU2luZ2giLCJlbWFpbCI6ImhhcmRpa2JlaGw1QGdtYWlsLmNvbSJ9.V0-5Z_5DW2p7-XsK0IcNO8TPk1qBggf6_xY1bf-QRfYQfylUYZxGAgHkHTPt2JKYlPBF-mHiRzZ_zU-W49NXMvnhYuzha99grVzdT-3nUxTyIoxXopbUsklciZZ6lLk9y3lhG-ICBE4o-KzhyWrVV6rLlfthHt4eJxSrzP_6RveCU5Ipqx41F6ALUWF1gHMcNB98w9IDHJI73KvIW6eoc3RA8prfwrct07XaevRb801E3TR0lJe2QgmQaC7KsmfXrYnoffiNawFsd6xHP32FAcbb4uRhtNecJyot-xVdguzyYe6UJjQLQ0gc62Om9x7dnrQ3YODadM73_Bqd-9wW3g', 
              'User-Id': 'bc89162f-0ab6-4063-b858-4dda8fd179a7'
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    })

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <ManagerHeader />
                <Switch>
                    <Route exact path='/' >
                        <Redirect to='/manager-dashboard' />
                    </Route>
                    <Route exact path='/manager-dashboard' component={() => <h1>{managerDetails}</h1>} />
                    <Route exact path='/manager-dashboard/update-profile' component={() => <h1>Update Profile</h1>} />
                    <Route exact path='/manager-dashboard/update-company-details' component={() => <h1>Update Company Details (Docs)</h1>} />
                    <Route exact path='/manager-dashboard/create-new-event' component={() => <h1>Create Company Event</h1>} />
                    <Route exact path='/manager-dashboard/company-events' component={() => <h1>View Company Events</h1>} />
                    <Route exact path='/manager-dashboard/company-issues' component={() => <h1>View Company Issues</h1>} />
                    <Route exact path='/manager-dashboard/company-issue/:issueId' component={() => <h1>View Company Issue By Id</h1>} />
                    <Route exact path='/manager-dashboard/employees' component={() => <h1>View Employees</h1>} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}