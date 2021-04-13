import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';
import animationData from "../../animations/detailStoreService/data";
import SignInButtonGroup from '../ui/SignInButtonGroup';


const useStyles = makeStyles(theme => ({
    detailStoreServiceContainer: {
        overflowX: 'hidden'
    },
    detailStoreServiceMainHeading: {
        fontWeight: 500
    },
    detailStoreServiceParaContainer: {
        margin: '0em 3em'
    },
    detailStoreServicePara: {
        fontSize: '1.6em'
    }

}));

export default function DetailStoreService() {
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
        <Grid container direction='row' justify='center' alignItems='center' className={classes.detailStoreServiceContainer} spacing={matches ? 0 : 4}>
            <Grid item md={6}>
                <Grid container justify='center' alignItems='center' direction='column' spacing={4}>
                    <Grid item>
                        <Typography variant='h3' align='center' className={classes.detailStoreServiceMainHeading}>Details Storage System</Typography>
                    </Grid>
                    <Grid item className={classes.detailStoreServiceParaContainer}>
                        <Typography variant='body' align='center' className={classes.detailStoreServicePara}>Flenderson Allows Organisations To Store Personal/Social/Salary/Team Data Of Employees and Company. The Textual Data Is Stored In A RDBMS(PostgreSQL) Database And Is Easily Reteivable Through Hibernate. Binary Data Which Includes Individuals Profile Picture/Resume or Company Documents And Generated Reports (pdfs, docs, xls) Can Also Be Stored, Binary Data Is Stored In An AWS S3 Bucket. </Typography>
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