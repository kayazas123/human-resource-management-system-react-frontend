import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';
import animationData from "../../animations/payrollService/data";
import SignInButtonGroup from '../ui/SignInButtonGroup';

const useStyles = makeStyles(theme => ({
    detailStoreServiceContainer: {
        overflowX: 'hidden'
    },
    payrollServiceContainer: {
        overflowX: 'hidden'
    },
    payrollServiceMainHeading: {
        fontWeight: 500
    },
    payrollServiceParaContainer: {
        margin: '0em 3em'
    },
    payrollServicePara: {
        fontSize: '1.6em'
    }
}));

export default function PayrollService() {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.detailStoreServiceContainer} spacing={matches?0:4}>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
            </Grid>
            <Grid item md={6}>
                <Grid container justify='center' alignItems='center' direction='column' spacing={4}>
                    <Grid item>
                        <Typography variant='h3' align='center' className={classes.payrollServiceMainHeading}>Payroll Management System</Typography>
                    </Grid>
                    <Grid item className={classes.payrollServiceParaContainer}>
                        <Typography variant='body' align='center' className={classes.payrollServicePara}>Flenderson Also Provides A Built In Payroll Management System, Because Why Not?. Salary Details Of Employees Can Be Stored Which Includes The Month's Bonus and Penalty Values. The Base Salary Can Be Modified By An Organisations Manager, A Monthly Payroll Report Is Sent Through The Mail With Relevant Payroll Circulation Details Of The Month. This Is Achieved By Maintainnig A Seperate Table FOr Recording Monthly Payroll Details And Another Table That Acts Like A DataWarehouse, Keeping Records Of Each Month's Payroll Details For Individual Employees.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SignInButtonGroup />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}