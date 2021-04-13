import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';
import animationData from "../../animations/attendanceService/data";
import SignInButtonGroup from '../ui/SignInButtonGroup';

const useStyles = makeStyles(theme => ({
    detailStoreServiceContainer: {
        overflowX: 'hidden'
    },
    attendanceServiceContainer: {
        overflowX: 'hidden'
    },
    attendanceServiceMainHeading: {
        fontWeight: 500
    },
    attendanceServiceParaContainer: {
        margin: '0em 3em'
    },
    attendanceServicePara: {
        fontSize: '1.6em'
    }


}));

export default function AttendanceService() {
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
        <Grid container direction='row' justify='center' alignItems='center' className={classes.attendanceServiceContainer} spacing={matches?0:4}>
            <Grid item md={6}>
                <Grid container justify='center' alignItems='center' direction='column' spacing={4}>
                    <Grid item>
                        <Typography variant='h3' align='center' className={classes.attendanceServiceMainHeading}>Attendance Management System</Typography>
                    </Grid>
                    <Grid item className={classes.attendanceServiceParaContainer}>
                        <Typography variant='body' align='center' className={classes.attendanceServicePara}>Flenderson Provides An Attendance Management System For Free To Keep Record Of All Employee's Attendance And Generates Monthly and Yearly Reports To Help Organisations Filter Out Employees Based On Their Appearence Percentage. The Reports Are Generated Through Fastexcel And Are Stored In AWS S3 Bucket For Easy Retreival. Event Driven Architecture (SNS, SQS) Is Used To Store And Refresh Individual's Daily Attendance.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SignInButtonGroup />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'70%'} width={'70%'} />
            </Grid>
        </Grid>
    );
}