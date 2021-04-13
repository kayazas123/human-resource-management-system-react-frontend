import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import animationData from "../animations/developerAnimation/data";

const useStyles = makeStyles(theme => ({
    devName: {
        fontWeight: 700
    },
    devPara: {
        fontSize: '1.6em'
    },
    devParaContainer:{
        margin: '0em 3em'
    },
    devContainer:{
        overflowX:'hidden'
    },
    emailButton:{
        backgroundColor:'red',
        fontSize:'1.3rem'
    },
    githubButtom:{
        backgroundColor:'black',
        fontSize:'1.3rem'
    },
    linkedinButton:{
        backgroundColor:'blue',
        fontSize:'1.3rem'
    }
}));

export default function Developer() {
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
        <Grid direction='row' justify='center' alignItems='center' container className={classes.devContainer}>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
            </Grid>
            <Grid item md={6}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                    <Grid item>
                        <Typography variant='h2' className={classes.devName} align='center'>HARDIK SINGH BEHL</Typography>
                    </Grid>
                    <Grid item className={classes.devParaContainer}>
                        <Typography variant='body' className={classes.devPara} align='center'>This Application Is Created Using Java Spring Boot, PostgreSQL, Hibernate, Redis, TestContainer, Keycloak, AWS (S3, SNS, SQS), React.js, Material-UI, Brain, Eyes, Hands And Boredom.</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="large" className={classes.emailButton} startIcon={<EmailIcon />} type='button' href='mailto:hardik.behl7444@gmail.com?subject=Hardik Singh Behl Is The Greatest' target='_blank'>
                            GMAIL
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="large" className={classes.githubButtom} startIcon={<GitHubIcon />} type='button' href='https://github.com/hardikSinghBehl' target='_blank'>
                            GITHUB
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="large" className={classes.linkedinButton} startIcon={<LinkedInIcon />} type='button' href='https://www.linkedin.com/in/hardiksinghbehl/' target='_blank'>
                            LINKEDIN
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

}