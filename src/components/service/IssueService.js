import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';
import animationData from "../../animations/issueService/data";
import SignInButtonGroup from '../ui/SignInButtonGroup';

const useStyles = makeStyles(theme => ({
    detailStoreServiceContainer: {
        overflowX: 'hidden'
    },
    issueServiceContainer: {
        overflowX: 'hidden'
    },
    issueServiceMainHeading: {
        fontWeight: 500
    },
    issueServiceParaContainer: {
        margin: '0em 3em'
    },
    issueServicePara: {
        fontSize: '1.6em'
    }
}));

export default function IssueService() {
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
        <Grid container direction='row' justify='center' alignItems='center' className={classes.issueServiceContainer} spacing={matches ? 0 : 4}>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
            </Grid>
            <Grid item md={6}>
                <Grid container justify='center' alignItems='center' direction='column' spacing={4}>
                    <Grid item>
                        <Typography variant='h3' align='center' className={classes.issueServiceMainHeading}>Employee Issue Management System</Typography>
                    </Grid>
                    <Grid item className={classes.issueServiceParaContainer}>
                        <Typography variant='body' align='center' className={classes.issueServicePara}>Flenderson Allows Organisations To Automate And Improve The Process Of Employee Issue Resolution. An Employee Can Raise An Issue Through The Console For A Topic Ranging From Leave Request, Salary Increment Request, Complaint, Suggestion etc. The Organisations Maager Will Be Notified Immediately When An Issue Is Raised And Repsond To It Accordingly. All Active Issues Are Visible On The Managers Console.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SignInButtonGroup />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}