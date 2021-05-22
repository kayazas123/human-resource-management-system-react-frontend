import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
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
        paddingBottom: '2rem',
    },
    eventCountHeading: {
        fontWeight: 600
    },
    eventBox:{
        border:'1px solid black',
        boxShadow:'2px 2px 2px 2px rgba(0,0,0,0.5)',
        width:'10rem',
        padding:'1rem'
    }
}));

export default function CompanyEvents(props) {
    const classes = useStyles();
    const axios = require('axios');
    const [fetched, setFetched] = useState(false);
    const [companyEvents, setCompanyEvents] = useState([]);

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:9090/v1/company-events',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId
            }
        };

        axios(config)
            .then(function (response) {
                setCompanyEvents(response.data);
                setFetched(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const eventList = (
        <Grid container direction='column' justify='center' alignItems='center' spacing={4}>
            <Grid item xs={12}>
                <Typography variant='h3' align='center' className={classes.eventCountHeading}>
                    {companyEvents.length + ' Company Event(s)'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction='row' justify='space-evenly' alignItems='center' spacing={6}>
                    {companyEvents.map(companyEvent => <Grid item md={4}>
                        <Grid container justify='center' direction='column' alignItems='center' spacing={1} className={classes.eventBox}>
                            <Grid item xs={12}>
                                <Typography variant='h4' align='center'>
                                    {companyEvent.heading}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h5' align='center'>
                                    {companyEvent.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body' align='center'>
                                    {companyEvent.createdAt}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>)}
                </Grid>
            </Grid>
        </Grid>
    );

    const noEvents = (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.noReportsContainer}>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'85%'} width={'85%'} />
            </Grid>
            <Grid item md={5}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={3} className={classes.noIssueContainer}>
                    <Grid item xs={12}>
                        <Typography variant='h2' className={classes.noReportsHeading} align='center'>No Active Events</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.noReportDetailsContainer}>
                        <Typography variant='h4' align='center'>There Are No Compnay Events Created By Your Manager At The Moment</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' color='primary' className={classes.goBack} onClick={() => { props.history.push('/employee-dashboard') }}>GO BACK</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <>
            {fetched === true ? (companyEvents.length !== 0 ? eventList : noEvents) : <h1></h1>}
        </>
    );
}