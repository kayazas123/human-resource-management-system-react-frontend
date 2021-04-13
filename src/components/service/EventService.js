import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';
import animationData from "../../animations/eventService/data";
import SignInButtonGroup from '../ui/SignInButtonGroup';

const useStyles = makeStyles(theme => ({
    detailStoreServiceContainer: {
        overflowX: 'hidden'
    },
    eventServiceContainer: {
        overflowX: 'hidden'
    },
    eventServiceMainHeading: {
        fontWeight: 500
    },
    eventServiceParaContainer: {
        margin: '0em 3em'
    },
    eventServicePara: {
        fontSize: '1.6em'
    }

}));

export default function EventService() {
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
        <Grid container direction='row' justify='center' alignItems='center' className={classes.eventServiceContainer} spacing={matches ? 0 : 4}>
            <Grid item md={6}>
                <Grid container justify='center' alignItems='center' direction='column' spacing={4}>
                    <Grid item>
                        <Typography variant='h3' align='center' className={classes.eventServiceMainHeading}>Event Notification System</Typography>
                    </Grid>
                    <Grid item className={classes.eventServiceParaContainer}>
                        <Typography variant='body' align='center' className={classes.eventServicePara}>Flenderson Provides A Systematic And Professional Approach Of Informing/Notifying Employees Of An Event/Announcement Relating To An Organisation. The Event Can Be Created By The Manager Thorugh His Portal And All Employees Will Be Notified Through Email (Java Mail API, Freemarker) For The Same. An Expiry Date Can Also Be Logged And Events Will Invalidate Accordingly (Spring Schedulers, Cron Expressions).</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SignInButtonGroup />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
            </Grid>
        </Grid>
    );
}