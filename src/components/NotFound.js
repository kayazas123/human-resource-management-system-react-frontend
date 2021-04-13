import { Grid } from "@material-ui/core";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../animations/notFoundAnimation/data";


export default function NotFound() {

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
            <Grid direction='row' justify='center' alignItems='center' container>
                <Grid item>
                    <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
                </Grid>
            </Grid>
        </>
    );
}