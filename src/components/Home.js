import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../animations/scaleAnimation/data";
import SignInButtonGroup from "./ui/SignInButtonGroup";

const useStyles = makeStyles(theme => ({
    homeBox: {
        [theme.breakpoints.up("md")]: {
            overflow:'hidden'
        }
    },
    mainHeading:{
        fontWeight:400,
        fontFamily:'Oswald'
    },
    btn:{
        fontSize:'1.3rem'
    }
}));

export default function Home() {
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
        <Box my="auto" className={classes.homeBox}>
            <Grid container direction='row' justify='center' alignItems="center" spacing={8}>
                <Grid xs={12} md={6} item>
                    <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
                </Grid>
                <Grid xs={12} md={6} item>
                    <Grid container direction='column' justify='center' alignItems='center' spacing={6}>
                        <Grid item xs={12}>
                            <Typography variant='h2' className={classes.mainHeading}>Human Resource Management Made Easier</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SignInButtonGroup/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};