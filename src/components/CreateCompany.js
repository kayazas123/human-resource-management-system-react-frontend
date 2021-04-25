import { Button, Fab, Grid, makeStyles, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../animations/createCompanyAnimation/data";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";


const useStyles = makeStyles(theme => ({
    descriptionBox: {
        width: '25em'
    },
    submitButton: {
        fontSize: '1.4rem',
        width: '8rem'
    },
    createCompanyHeading: {
        fontWeight: 600
    },
    button: {
        color: 'rgb(0,0,255,0.6)',
        margin: 10
    },
    input: {
        display: "none"
    },
    uploadFileAgain: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: '18px'
    },
    createCompanyContainer: {
        border: '2px solid black',
        boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.7)',
        padding: '4em 3em'
    }

}));

export default function CreateCompany(props) {
    var axios = require('axios');
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const { managerDetails } = props;
    const [mainState, setMainState] = useState('inital');
    const [imageUploaded, setImageUploaded] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [companyName, setCompanyName] = useState('');

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const handleUploadClick = event => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        setMainState('uploaded');
        setSelectedFile(event.target.files[0]);
        setImageUploaded(1);
    };

    const handleCompanyCreationSubmission = () => {
        if (companyName !== '' && imageUploaded === 1) {
            setIsSubmitting(true);
            var FormData = require('form-data');
            var fs = require('fs');
            var data = new FormData();
            data.append('file', selectedFile);
            data.append('data', `{"name":"${companyName}"}`);

            var config = {
                method: 'post',
                url: 'http://localhost:9090/v1/company',
                headers: {
                    'Authentication': 'BEARER '+props.authentication,
                    'User-Id': props.userId
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setIsSubmitting(false);
                    props.history.push('/manager-dashboard');
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.contactUsContainer} spacing={matches ? 0 : 4}>
            <Grid item className={classes.createCompanyContainer}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant='h3' className={classes.createCompanyHeading}>
                            Create/Register Your Company
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction='row' justify='center' alignItems='center' spacing={3}>
                            <Grid item xs={12}>
                                {imageUploaded === 0 ?
                                    <>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={handleUploadClick}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Fab component="span" className={classes.button}>
                                                <AddPhotoAlternateIcon />
                                            </Fab>
                                        </label></> : <IconButton aria-label="delete" color="primary" className={classes.uploadFileAgain} onClick={() => { setImageUploaded(0); setMainState('initial'); setSelectedFile(null) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction='row' justify='center' alignItems='center' spacing={3}>
                            <Grid item>
                                <TextField label='Company Name' variant='outlined' value={companyName} onChange={(event) => { setCompanyName(event.target.value) }} />
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary' className={classes.submitButton} disabled={isSubmitting} onClick={handleCompanyCreationSubmission}>{isSubmitting ? 'CREATING' : 'CREATE'}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
            </Grid>
        </Grid>
    );
}