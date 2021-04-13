import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Lottie from "react-lottie";
import { Link } from 'react-router-dom';
import animationData from "../../animations/customServices/data";


const useStyles = makeStyles(theme => ({
    customServiceMainHeading:{
        fontWeight:500
    },
    customServiceParaContainer:{
        margin: '0em 3em'
    },
    customServicePara:{
        fontSize: '1.6em'
    },
    customServiceButton:{
        fontSize:'1.5rem'
    },
    customServiceContainer:{
        overflowX:'hidden'
    }
}));

export default function CustomService() {
    const classes = useStyles();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.customServiceContainer}>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
            </Grid>
            <Grid item md={6}>
                <Grid container justify='center' alignItems='center' direction='column' spacing={4}>
                    <Grid item>
                        <Typography variant='h2' align='center' className={classes.customServiceMainHeading}>Want A Custom Service?</Typography>
                    </Grid>
                    <Grid item className={classes.customServiceParaContainer}>
                        <Typography variant='body' className={classes.customServicePara} align='center'>If You Want A Service Other Than The Free Services That We Already Provide To Better Maintain Your Organisation or Improvements/Enhancements In Our Existing Services, Write To Us With Your Request (Should Be Within Human Resource Management Domain) And We Will Respond Back With An Answer And Our Developers, Here At Flenderson Would Be More Than Happy To Implemet The Additional Service For A Small Charge.</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='primary' className={classes.customServiceButton} size='large' component={Link} to='/contact-us'>Contact Us</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}