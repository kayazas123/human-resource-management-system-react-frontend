import { Box, Grid, Typography } from "@material-ui/core";
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
    }
}));

export default function EmployeeHomeScreen(props) {
    const classes = useStyles();
    const axios = require('axios');
    const [company, setCompany] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [image, setImage] = useState('');

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

    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.homeScreenContainer} spacing={4}>
            <Grid item md={4} className={classes.homeScreenCompanyContainer}>
                {companyDetails !== null && <Grid container direction='column' justify='center' alignItems='center' spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant='h3' align='center'>Company Details</Typography>
                    </Grid>
                    {image !== '' && <Grid item xs={12}><img className={classes.companyLogo} src={`data:image/png;base64,${image}`} /> </Grid>}
                    <Grid item xs={12}>
                        <Typography variant='h5'>{'COMPANY NAME: ' + companyDetails.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5'>{'CREATED ON: ' + new Date(companyDetails.createdAt)}</Typography>
                    </Grid>
                </Grid>}
            </Grid>
            <Grid item md={6}>
                <Grid container direction='row' justify='center' alignItems='center' spacing={4} className={classes.homeScreenBoxContainer}>
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard'>
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
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard'>
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
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard'>
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
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard'>
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
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard'>
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
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard'>
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
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard'>
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
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard'>
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
                    <Grid item md={3} className={classes.homeScreenBox} component={Link} to='/manager-dashboard'>
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
                </Grid>
            </Grid>
        </Grid>
    );
}