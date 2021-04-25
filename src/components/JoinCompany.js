import { Box, Button, Grid, makeStyles, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import animationData from "../animations/joinCompanyAnimation/data";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

const useStyles = makeStyles(theme => ({
    joinCompanyContainer: {
        overflowX: 'hidden'
    },
    joinCompanyForm: {
        border: '1px black solid',
        boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.7)',
        padding: '2em 4em'
    },
    joinCompanyButton: {
        fontSize: '1.3rem',
    },
    joinCompanyHeading: {
        fontWeight: 500
    }
}));

export default function JoinCompany(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const axios = require('axios');
    const { employeeDetails } = props;
    const [companyName, setCompanyName] = useState('');
    const [companyCode, setCompanyCode] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const joinCompanySubmittion = () => {
        if (companyCode !== '' && companyName !== '') {
            setSubmitting(true);
            var data = JSON.stringify({ "companyName": companyName, "companyCode": companyCode });

            var config = {
                method: 'post',
                url: 'http://localhost:9090/v1/join-company',
                headers: {
                    'Authentication': 'BEARER ' + props.authentication,
                    'User-Id': props.userId,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setSubmitting(false)
                    props.history.push('/employee-dashboard/not-approved');
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

    }

    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.joinCompanyContainer} spacing={matches ? 0 : 4}>
            <Grid item md={6}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant='h3' className={classes.joinCompanyHeading}>Join Your Company</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={companyName} label='Enter Company Name' onChange={(event) => { setCompanyName(event.target.value) }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={companyCode} label='Enter Company Code' onChange={(event) => { setCompanyCode(event.target.value) }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' color='primary' onClick={joinCompanySubmittion} className={classes.joinCompanyButton} disabled={submitting}>{submitting ? 'SENDING' : 'SEND REQUEST'}</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
            </Grid>
        </Grid>
    );
}