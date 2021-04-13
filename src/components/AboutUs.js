import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../animations/documentsAnimation/data";


const useStyles = makeStyles(theme => ({
    aboutUsHeading: {
        fontWeight: 700
    },
    aboutUsParagraphContainer: {
        margin: '2em 3em'
    },
    aboutUsParagraph: {
        fontSize: '1.6em'
    }
}));


export default function AboutUs() {
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
        <>
            <Grid container direction='row' justify='center' alignItems="center">
                <Grid item xs={12} md={6}>
                    <Grid container direction='column' spacing={4} justify='center' alignItems='center'>
                        <Grid item>
                            <Typography variant='h1' align='center' className={classes.aboutUsHeading}>
                                About Us
                            </Typography>
                        </Grid>
                        <Grid item className={classes.aboutUsParagraphContainer}>
                            <Typography variant='body' className={classes.aboutUsParagraph}>
                                First Of All... We Are The Best, Secondly We Aim To Automate The Human Resource Management Operations That An Organisation Is Required To Perform On A Consistent Bases Such As Employee Onboarding, Employee Details Storage, Attendance Management, Payroll Management, Employee Issue Resolvation etc. All You Need Is To Create A FREE Manager Account And Register Your Organisation, After Which You Can Invite The Employees To Join Through A Unique Company Code And Avail The Services.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Lottie options={defaultOptions} height={'70%'} width={'70%'} />
                </Grid>
            </Grid>
        </>
    );

};