import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import EmployeeHeader from "./ui/EmployeeHeader";
import theme from "./ui/theme";

export default function EmployeeDashboard(props) {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <EmployeeHeader />
                <Switch>
                    <Route exact path='/' >
                        <Redirect to='/employee-dashboard' />
                    </Route>
                    <Route exact path='/employee-dashboard' component={() => <h1>Hello Emp</h1>} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}