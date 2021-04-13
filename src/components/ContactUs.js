import { Box, Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Snackbar, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../animations/contactUsAnimation/data";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    contactUsContainer: {
        overflowX: 'hidden'
    },
    contactUsForm: {
        border: '2px solid black',
        boxShadow: '6px 6px 6px 6px rgba(0,0,0,0.7)',
        padding: '0em 2.5em',
        [theme.breakpoints.down('sm')]: {
            padding: '0em 0.2em',
            width: '21em'
        }
    },
    contactUsFormHeading: {
        fontWeight: 500
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '15em'
    },
    contactUsFormTextArea: {
        width: '30em',
        [theme.breakpoints.down('sm')]: {
            width: '18em'
        }
    },
    contactUsFormSubmitButton: {
        fontSize: '1.6rem'
    },
    alert: {
        fontSize:'1.5rem'
    }
}));

export default function ContactUs() {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [issueType, setIssueType] = useState("");
    const axios = require('axios');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, isSubmitting] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setIssueType(event.target.value);
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleAlertClose = () => {
        setOpen(false);
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const checkValueValidity = () => {
        if (fullName === '' || email === '' || message === '' || issueType === '')
            return false;
        return true
    }

    const submitContactUsHandler = () => {
        if (checkValueValidity()) {
            isSubmitting(true);
            var data = JSON.stringify({ "raisedByName": fullName, "raisedByEmail": email, "raisedByAccountType": "NOT REGISTERED", "description": message, "ticketIssue": issueType });
            var config = {
                method: 'post',
                url: 'https://flenderson-spring-hrm.herokuapp.com/v1/support-ticket',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setFullName('');
                    setEmail('');
                    setMessage('');
                    setIssueType('');
                    isSubmitting(false)
                    setOpen(true)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.contactUsContainer} spacing={matches ? 0 : 4}>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'90%'} width={'90%'} />
            </Grid>
            <Grid item md={4}>
                <Grid container direction='column' justify='center' alignItems='center' className={classes.contactUsForm} spacing={3}>
                    <Grid item>
                        <Box mt={3}>
                            <Typography variant='h3' align='center' className={classes.contactUsFormHeading}>Contact Us</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="issue-type">Issue Type</InputLabel>
                            <Select
                                labelId="issue-type"
                                id="issue-type-select"
                                value={issueType}
                                onChange={handleChange}
                            >
                                <MenuItem value={'NEED HELP'}>NEED HELP</MenuItem>
                                <MenuItem value={'COMPLAINT'}>COMPLAINT</MenuItem>
                                <MenuItem value={'SUGGESTION'}>SUGGESTION</MenuItem>
                                <MenuItem value={'CAREER'}>CAREER</MenuItem>
                                <MenuItem value={'INQUIRY'}>INQUIRY</MenuItem>
                                <MenuItem value={'OTHER'}>OTHER</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Grid container direction='row' justify='center' alignItems='center' spacing={3}>
                            <Grid item xs={6}>
                                <TextField id="full-name" label="Enter Full Name" value={fullName} onChange={handleFullNameChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="email" label="Enter Email" value={email} onChange={handleEmailChange} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box my={4}>
                        <Grid item>
                            <TextField
                                multiline
                                rows={6}
                                rowsMax={12}
                                variant='outlined'
                                label='Enter Message'
                                className={classes.contactUsFormTextArea}
                                value={message} onChange={handleMessageChange}
                            />
                        </Grid>
                    </Box>
                    <Box mb={4}>
                        <Grid item>
                            <Button variant='contained' color='primary' className={classes.contactUsFormSubmitButton} onClick={submitContactUsHandler} disabled={submitting}>
                                {submitting ? "SUBMITTING" : "SUBMIT"}
                            </Button>
                            <Snackbar open={open} autoHideDuration={5000} onClose={handleAlertClose}>
                                <Alert onClose={handleAlertClose} severity="success" className={classes.alert}>
                                    Message Sent Successfully!
                                </Alert>
                            </Snackbar>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}