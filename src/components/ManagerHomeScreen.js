import { Box, Button, Grid, Snackbar, TextField, Typography } from "@material-ui/core";
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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Alert from "@material-ui/lab/Alert";

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
    inviteHeading: {
        fontWeight: 600
    },
    inviteButton: {
        fontSize: '1.4rem'
    },
    alert: {
        fontSize: '1.5rem',
        backgroundColor: 'green',
        color: 'white'
    }
}));

export default function ManagerHomeScreen(props) {
    const classes = useStyles();
    const axios = require('axios');
    const [company, setCompany] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [image, setImage] = useState('');
    const [open, setOpen] = React.useState(false);
    const [inviteName, setInviteName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);

    const handleAlertClose = () => {
        setSuccessAlertOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
    }, [])

    const sendInvitation = () => {
        if (inviteName !== '' && inviteEmail !== '') {
            setIsSubmitting(true);
            var data = JSON.stringify({ "name": inviteName, "emailId": inviteEmail });

            var config = {
                method: 'post',
                url: 'http://localhost:9090/v1/company-invite',
                headers: {
                    'Authentication': 'BEARER ' + props.authentication,
                    'User-Id': props.userId,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setIsSubmitting(false);
                    setInviteEmail('');
                    setInviteName('');
                    setOpen(false);
                    setSuccessAlertOpen(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <>
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
                            <Typography variant='h5'>{'COMPANY CODE: ' + companyDetails.companyCode}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h5' align='center'>CREATED ON:</Typography>
                            <Typography variant='h5' align='center'>{new Date(companyDetails.createdAt).toString()}</Typography>
                        </Grid>
                    </Grid>}
                </Grid>
                <Grid item md={6}>
                    <Grid container direction='row' justify='center' alignItems='center' spacing={4} className={classes.homeScreenBoxContainer}>
                        <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard/contact-us'>
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
                        <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard/update-profile'>
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
                        <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard/update-company-details'>
                            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                                <Grid item xs={12}>
                                    <BusinessIcon className={classes.icon} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h5' className={classes.homeScreenBoxText}>
                                        Update Company
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard/company-events'>
                            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                                <Grid item xs={12}>
                                    <EventIcon className={classes.icon} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h5' className={classes.homeScreenBoxText}>
                                        Company Events
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard/company-issues'>
                            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                                <Grid item xs={12}>
                                    <BugReportIcon className={classes.icon} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h5' className={classes.homeScreenBoxText}>
                                        View Issues
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard/attendance-reports'>
                            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                                <Grid item xs={12}>
                                    <BookIcon className={classes.icon} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h5' className={classes.homeScreenBoxText}>
                                        Turnout Reports
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard/payroll-reports'>
                            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                                <Grid item xs={12}>
                                    <MonetizationOnIcon className={classes.icon} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h5' className={classes.homeScreenBoxText}>
                                        Payroll Reports
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard/company-employees'>
                            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                                <Grid item xs={12}>
                                    <PeopleAltIcon className={classes.icon} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h5' className={classes.homeScreenBoxText}>
                                        View Employees
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} className={classes.homeScreenBox} type="button" onClick={handleOpen}>
                            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                                <Grid item xs={12}>
                                    <EmailIcon className={classes.icon} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h5' className={classes.homeScreenBoxText}>
                                        Invite
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.paper}>
                                    <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography variant='h4' className={classes.inviteHeading}>
                                                Invite Employees To Join
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField label="Enter Name" variant="outlined" value={inviteName} onChange={(event) => setInviteName(event.target.value)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField label="Enter Email" variant="outlined" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant='contained' disabled={isSubmitting} color='primary' className={classes.inviteButton} onClick={sendInvitation}>{isSubmitting ? "SENDING" : "SEND INVITE"}</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Fade>
                        </Modal>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={successAlertOpen} autoHideDuration={5000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success" className={classes.alert}>
                    Invitaion Sent Successfully!
                                </Alert>
            </Snackbar>
        </>
    );
}