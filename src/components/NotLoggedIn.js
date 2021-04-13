import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AboutUs from "./AboutUs";
import Developer from "./Developer";
import Home from "./Home";
import NotFound from "./NotFound";
import AttendanceService from "./service/AttendanceService";
import CustomService from "./service/CustomService";
import DetailStoreService from "./service/DetailStoreService";
import EventService from "./service/EventService";
import IssueService from "./service/IssueService";
import PayrollService from "./service/PayrollService";
import ContactUs from "./ContactUs";
import Header from "./ui/Header";
import theme from "./ui/theme";

export default function NotLoggedIn() {

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/services' component={() => <div>Services</div>} />
                    <Route exact path='/services-attendance-management-module' component={AttendanceService} />
                    <Route exact path='/services-payroll-management-module' component={PayrollService} />
                    <Route exact path='/services-employee-details-store-module' component={DetailStoreService} />
                    <Route exact path='/services-employee-issue-resolver-module' component={IssueService} />
                    <Route exact path='/services-company-event-notifcation-module' component={EventService} />
                    <Route exact path='/services-custom' component={CustomService} />
                    <Route exact path='/developer' component={Developer} />
                    <Route exact path='/about-us' component={AboutUs} />
                    <Route exact path='/contact-us' component={ContactUs} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};