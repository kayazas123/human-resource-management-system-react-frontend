import { Button, Grid, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../animations/danceAnimation/data";


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
    },
    noIssueContainer: {
        border: '1px rgba(255,0,0,0.7) solid',
        boxShadow: '3px 3px 3px 3px rgba(0,0,0,0.7)',
        paddingTop: '2rem',
        paddingBottom: '2rem'
    }
}));

export default function CompanyIssues(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const axios = require('axios');
    const [fetched, setFetched] = useState(false);
    const [companyIssues, setCompanyIssues] = useState([]);

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
            url: 'http://localhost:9090/v1/company-issue',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId
            }
        };

        axios(config)
            .then(function (response) {
                setCompanyIssues(response.data);
                setFetched(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])


    const noIssues = (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.noReportsContainer} spacing={matches ? 0 : 4}>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'85%'} width={'85%'} />
            </Grid>
            <Grid item md={5}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={3} className={classes.noIssueContainer}>
                    <Grid item xs={12}>
                        <Typography variant='h2' className={classes.noReportsHeading} align='center'>No Active Issues</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.noReportDetailsContainer}>
                        <Typography variant='h4' align='center'>Employees Of Your Company Have Not Raised Any New Issues</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' color='primary' className={classes.goBack} onClick={() => { props.history.push('/manager-dashboard') }}>GO BACK</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    const issues = (
        <h1></h1>
    );

    return (
        <>
        {(fetched===true && companyIssues.length===0)?noIssues:issues}
        </>
    );
}