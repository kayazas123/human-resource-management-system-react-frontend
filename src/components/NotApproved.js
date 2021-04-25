import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import animationData from "../animations/waitingAnimation/data";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

const useStyles = makeStyles(theme => ({
    notApprovedContainer: {
        overflowX: 'hidden'
    },
    notApprovedHeading: {
        fontWeight: 500
    },
    textContainer: {
        margin: '0em 4em'
    }
}));

export default function NotApproved(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const axios = require('axios');
    const [companyDetails, setCompanyDetails] = useState(null);
    const { employeeDetails } = props;

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:9090/v1/company',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId
            }
        };

        axios(config)
            .then(function (response) {
                setCompanyDetails(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },[])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.notApprovedContainer} spacing={matches ? 0 : 4}>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
            </Grid>
            <Grid item md={6}>
                {companyDetails!==null &&<Grid container direction='column' justify='center' alignItems='center' spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant='h2' className={classes.notApprovedHeading}>{'Hang Tight ' + employeeDetails.firstName}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.textContainer}>
                        <Typography variant='h4' align='center' className={classes.notApprovedHeading}>{'Your Request To Join ' + companyDetails.name + ' Was Sent Successfully!'}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.textContainer}>
                        <Typography variant='h4' align='center' className={classes.notApprovedHeading}>You'll Get Access To Your Employee Dashboard When Your Request Is Approved</Typography>
                    </Grid>
                </Grid>}
            </Grid>
        </Grid>
    );
}