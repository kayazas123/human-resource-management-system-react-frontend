import { Backdrop, Box, Button, Fade, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import EventIcon from '@material-ui/icons/Event';
import BugReportIcon from '@material-ui/icons/BugReport';
import BookIcon from '@material-ui/icons/Book';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
    homeScreenContainer: {
        overflowX: 'hidden',
        height: '75vh'
    },
    companyLogo: {
        width: '10rem',
        height: '10rem'
    },
    homeScreenCompanyContainer: {
        border: '1px solid black',
        padding: '2em 4em',
        boxShadow: '4px 4px 4px 4px rgba(0,0,0,0.6)'
    },
    homeScreenBox: {
        border: '1px solid black',
        boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.6)',
        margin: '1rem',
        textDecoration: 'none'
    },
    homeScreenBoxContainer: {
        margin: '2em 3em'
    },
    icon: {
        width: '3rem',
        height: '3rem',
        color: 'darkRed'
    },
    homeScreenBoxText: {
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '1.6rem',
        color: 'black'
    },
    docsButton: {
        fontSize: '1.4rem',
        padding: '0.5em 1em'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    issueHeading: {
        fontWeight: 500
    }
}));

export default function EmployeeHomeScreen(props) {
    const classes = useStyles();
    const axios = require('axios');
    const [company, setCompany] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [image, setImage] = useState('');
    const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
    const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
    const [issueModalOpen, setIssueModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [issueType, setIssueType] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAttendanceModalOpen = () => {
        setAttendanceModalOpen(true);
    };

    const handleAttendanceModalClose = () => {
        setAttendanceModalOpen(false);
    };

    const handleIssueModalOpen = () => {
        setIssueModalOpen(true);
    };

    const handleIssueModalClose = () => {
        setIssueModalOpen(false);
    };

    const handlePresent = () => {
        var data = JSON.stringify({ "present": true });

        var config = {
            method: 'post',
            url: 'http://localhost:9090/v1/daily-attendance',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setAttendanceModalOpen(false);
                setIsAttendanceMarked(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleAbsent = () => {
        var data = JSON.stringify({ "present": false });

        var config = {
            method: 'post',
            url: 'http://localhost:9090/v1/daily-attendance',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setAttendanceModalOpen(false);
                setIsAttendanceMarked(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const submitIssue = () => {
        if (issueType != null && title != '' && description != '') {
            setIsSubmitting(true);
            var data = JSON.stringify({ "title": title, "description": description, "issueType": issueType });

            var config = {
                method: 'post',
                url: 'http://localhost:9090/v1/employee-issue',
                headers: {
                    'Authentication': 'BEARER '+props.authentication,
                    'User-Id': props.userId,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setIsSubmitting(false);
                    setTitle('');
                    setDescription('');
                    setIssueType(null);
                    setIssueModalOpen(false);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:9090/v1/company',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId
            }
        };

        axios(config)
            .then(({ data }) => {
                setCompanyDetails(data);
                var config = {
                    method: 'put',
                    url: 'http://localhost:9090/v1/file',
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    data: data.logoUrl
                };

                axios(config)
                    .then(function (response) {
                        setImage(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });

        var config = {
            method: 'get',
            url: 'http://localhost:9090/v1/daily-attendance',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setIsAttendanceMarked(response.data.marked)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [isAttendanceMarked])

    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.homeScreenContainer} spacing={4}>
            <Grid item md={4} className={classes.homeScreenCompanyContainer}>
                {companyDetails !== null && <Grid container direction='column' justify='center' alignItems='center' spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant='h3' align='center'>Company Details</Typography>
                    </Grid>
                    {image !== '' ? <Grid item xs={12}><img className={classes.companyLogo} src={`data:image/png;base64,${image}`} /> </Grid> : <Grid item xs={12}><img className={classes.companyLogo} src='https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' /></Grid>}
                    <Grid item xs={12}>
                        <Typography variant='h5'>{'COMPANY NAME: ' + companyDetails.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align='center' variant='h5'>{'CREATED ON: ' + new Date(companyDetails.createdAt)}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' color='primary' className={classes.docsButton}> VIEW COMPANY DOCS</Button>
                    </Grid>
                </Grid>}
            </Grid>
            <Grid item md={6}>
                <Grid container direction='row' justify='center' alignItems='center' spacing={4} className={classes.homeScreenBoxContainer}>
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/employee-dashboard/contact-us'>
                        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                            <Grid item xs={12}>
                                <ChatBubbleIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h5' className={classes.homeScreenBoxText}>
                                    Contact Us
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/employee-dashboard/update-profile'>
                        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                            <Grid item xs={12}>
                                <AccountCircleIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h5' className={classes.homeScreenBoxText}>
                                    Update Profile
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/employee-dashboard/company-events'>
                        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                            <Grid item xs={12}>
                                <EventIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h5' className={classes.homeScreenBoxText}>
                                    View Events
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className={classes.homeScreenBox} onClick={handleIssueModalOpen}>
                        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                            <Grid item xs={12}>
                                <BugReportIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h5' className={classes.homeScreenBoxText}>
                                    New Issue
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className={classes.homeScreenBox} onClick={() => !isAttendanceMarked && handleAttendanceModalOpen()}>
                        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                            <Grid item xs={12}>
                                <BookIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h5' className={classes.homeScreenBoxText}>
                                    {isAttendanceMarked ? 'Marked' : "Mark Attendance"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={attendanceModalOpen}
                        onClose={handleAttendanceModalClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={attendanceModalOpen}>
                            <div className={classes.paper}>
                                <Grid container direction='column' alignItems='center' justify='center' spacing={4}>
                                    <Grid item xs={12}>
                                        <Typography variant='h4'>Mark Today's Attendance</Typography>
                                        <Typography variant='body'>{new Date().toString()}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container direction='row' justify='center' alignItems='center' spacing={3}>
                                            <Grid item md={6}>
                                                <Button variant='contained' color='primary' size='large' onClick={handlePresent}>
                                                    PRESENT
                                                </Button>
                                            </Grid>
                                            <Grid item md={6}>
                                                <Button variant='contained' color='primary' size='large' onClick={handleAbsent}>
                                                    ABSENT
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Fade>
                    </Modal>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={issueModalOpen}
                        onClose={handleIssueModalClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={issueModalOpen}>
                            <div className={classes.paper}>
                                <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant='h3' className={classes.issueHeading}>
                                            RAISE NEW ISSUE
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">Issue Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={issueType}
                                                onChange={(event) => setIssueType(event.target.value)}
                                            >
                                                <MenuItem value={1}>COMPLAINT</MenuItem>
                                                <MenuItem value={2}>HELP</MenuItem>
                                                <MenuItem value={3}>SUGGESTION</MenuItem>
                                                <MenuItem value={4}>SALARY ISSUE</MenuItem>
                                                <MenuItem value={5}>LEAVE REQUEST</MenuItem>
                                                <MenuItem value={6}>OTHER</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant='outlined' label='Enter Title' value={title} onChange={(event) => setTitle(event.target.value)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField multiline rows={5} variant='outlined' label='Enter Description' value={description} onChange={(event) => setDescription(event.target.value)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button disabled={isSubmitting} variant='contained' color='primary' size='large' onClick={submitIssue}>{isSubmitting ? 'SUBMITTING' : 'SUBMIT'}</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Fade>
                    </Modal>
                </Grid>
            </Grid>
        </Grid>
    );
}