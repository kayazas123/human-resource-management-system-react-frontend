import { Box, Button, Grid, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import animationData from "../animations/emptyAnimation/data";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

const useStyles = makeStyles(theme => ({
    noReportsContainer: {
        overflow: 'hidden',
    },
    noReportsHeading: {
        fontWeight: 600
    },
    goBack: {
        fontSize: '1.7rem',
    },
    noReportDetails: {
        fontSize: '1.5rem',
        fontWeight: 400
    },
    noReportDetailsContainer: {
        margin: '0px 4rem'
    }
}));

export default function AttendanceReports(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const axios = require('axios');
    const [fetched, setFetched] = useState(false);
    const [reports, setReports] = useState([]);
    const { managerDetails } = props;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:9090/v1/company-reports/1',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId
            }
        };

        axios(config)
            .then(function (response) {
                setReports(response.data);
                setFetched(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    const noReports = (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.noReportsContainer} spacing={matches ? 0 : 4}>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'85%'} width={'85%'} />
            </Grid>
            <Grid item md={6}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant='h2' className={classes.noReportsHeading} align='center'>No Reports Available</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.noReportDetailsContainer}>
                        <Typography variant='body' className={classes.noReportDetails} align='center'>Attendance Reports For Your Workforce Are Generated At The Beginning Of Each Month (For The Month Before).</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.noReportDetailsContainer}>
                        <Typography variant='body' className={classes.noReportDetails} align='center'>The Reports Are Generated in .xls Format (Excel Sheet) And Are Stored In AWS S3 Bucket. FastExcel Was Used To Generate Excel Sheets, You Can View The Mentioned Library On Github </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.noReportDetailsContainer}>
                        <Typography variant='body' className={classes.noReportDetails} align='center'>Combination Of Spring Schedulers And Cron Expressions Were Used At The Backend To Trigger Report Generation Task (Job) Automatically WIthout Human Intervention</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' color='primary' className={classes.goBack} onClick={() => { props.history.push('/manager-dashboard') }}>GO BACK</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <>
            {(fetched === true && reports.length === 0) ? noReports : <></>}
        </>
    )
}