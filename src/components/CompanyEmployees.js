import { Backdrop, Box, Button, Fade, Grid, makeStyles, Modal, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles(theme => ({
    employeeListContainer: {
        border: '1px solid black',
        boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.6)',
        padding: '1rem 2rem'
    },
    mainContainer: {
        overflowX: 'hidden'
    },
    employeeBox: {
        border: '1px solid black',
        boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.6)',
        padding: '1rem 2rem'
    },
    email: {
        fontWeight: 700
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid black',
        boxShadow: '4px 4px 4px 4px rgba(0,0,0,0.8)',
        padding: theme.spacing(2, 4, 3),
    }
}));

export default function CompanyEmployees(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const axios = require('axios');
    const [fetchedEmployees, setFetchecEmployees] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [approvedEmployees, setApprovedEmployees] = useState([]);
    const [unApprovedEmployees, setUnApprovedEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isRemoving, setIsRemoving] = useState(false);
    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const [change, setChange] = useState(1);
    const [acceptModalOpen, setAcceptModalOpen] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);
    const [monthlySalary, setMonthlySalary] = useState(0);

    useEffect(() => {
        var config = {
            method: 'GET',
            url: 'http://localhost:9090/v1/company-employees',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId
            }
        };

        axios(config)
            .then(function (response) {
                setEmployees(response.data);
                setFetchecEmployees(true);
                setApprovedEmployees(response.data.filter(emp => emp.companyStatus === 3));
                setUnApprovedEmployees(response.data.filter(emp => emp.companyStatus === 2));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [change]);

    const removeEmployeeConfirmation = (employee) => {
        setSelectedEmployee(employee);
        setRemoveModalOpen(true);
    }

    const acceptEmployeeConfirmation = (employee) => {
        setSelectedEmployee(employee);
        setAcceptModalOpen(true);
    }

    const removeEmployee = () => {
        setIsRemoving(true);
        var data = JSON.stringify({ "employeeId": selectedEmployee.id });

        var config = {
            method: 'post',
            url: 'http://localhost:9090/v1/reject-join-request',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setIsRemoving(false);
                setRemoveModalOpen(false);
                setSelectedEmployee(null);
                setChange(change + 1);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const acceptEmployee = () => {
        setIsAccepting(true);
        var data = JSON.stringify({ "employeeId": selectedEmployee.id, "monthlySalary": monthlySalary });

        var config = {
            method: 'post',
            url: 'http://localhost:9090/v1/accept-join-request',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setIsAccepting(false);
                setAcceptModalOpen(false);
                setSelectedEmployee(null);
                setChange(change + 1);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <>
            <Grid container direction='row' justify='center' alignItems='center' spacing={4} className={classes.mainContainer}>
                <Grid item md={4} xs={10}>
                    <Grid container direction='column' justify='center' alignItems='center' spacing={3} className={classes.employeeListContainer}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>
                                Approved Employees
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container column='row' justify="space-evenly" alignItems='center'>
                                {(fetchedEmployees === true && approvedEmployees.length !== 0) ? (approvedEmployees.map(emp => <Grid item className={classes.employeeBox} md={12}>
                                    <Grid container direction='column' justify='center' alignItems='center' spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant='body' className={classes.email}>{emp.emailId}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='body'>{emp.firstName + " " + emp.lastName}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='body' className={classes.email}>{emp.gender}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='body'>{emp.masterCountry.name}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>)) : <Typography variant='h5'>No Employees Present</Typography>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={4} xs={10}>
                    <Grid container direction='column' justify='center' alignItems='center' spacing={3} className={classes.employeeListContainer}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>
                                UnApproved Employees
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container column='row' justify="space-evenly" alignItems='center'>
                                {(fetchedEmployees === true && unApprovedEmployees.length !== 0) ? (unApprovedEmployees.map(emp => <Grid item className={classes.employeeBox} md={12}>
                                    <Grid container direction='column' justify='center' alignItems='center' spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant='body' className={classes.email}>{emp.emailId}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='body'>{emp.firstName + " " + emp.lastName}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='body' className={classes.email}>{emp.gender}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='body'>{emp.masterCountry.name}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container justify='center' alignItems='center' spacing={2}>
                                                <Grid item xs={6}>
                                                    <Button variant='contained' color='primary' size='small' onClick={() => acceptEmployeeConfirmation(emp)}>Approve</Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button variant='outlined' color='primary' size='small' onClick={() => removeEmployeeConfirmation(emp)}>Reject</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            className={classes.modal}
                                            open={removeModalOpen}
                                            onClose={() => setRemoveModalOpen(false)}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <Fade in={removeModalOpen}>
                                                <div className={classes.paper}>
                                                    <Box py={2} px={3}>
                                                        <Grid container direction='column' justify='center' alignItems='center' spacing={4}>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h4'>Are You Sure?</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h5'>{'This Action Will Reject ' + (selectedEmployee !== null && selectedEmployee.emailId)}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Grid container justify='center' alignItems='center'>
                                                                    <Grid item xs={6}>
                                                                        <Button variant="contained" color="primary" size="large" disabled={isRemoving} onClick={removeEmployee}>
                                                                            {isRemoving ? 'WAIT' : "YES"}
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <Button variant="outlined" color="primary" size="large" onClick={() => setRemoveModalOpen(false)}>
                                                                            CANCEL
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </div>
                                            </Fade>
                                        </Modal>
                                        <Modal
                                            aria-labelledby="transition-modal"
                                            aria-describedby="transition-modal"
                                            className={classes.modal}
                                            open={acceptModalOpen}
                                            onClose={() => setAcceptModalOpen(false)}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <Fade in={acceptModalOpen}>
                                                <div className={classes.paper}>
                                                    <Box py={2} px={3}>
                                                        <Grid container direction='column' justify='center' alignItems='center' spacing={4}>
                                                            <Grid item xs={12}>
                                                                <Typography variant='h4'>Fill The Below Details To Confirm Acceptance</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField label='Enter Monthly Salary' value={monthlySalary} onChange={(event) => setMonthlySalary(event.target.value)} />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Grid container justify='center' alignItems='center' spacing={2}>
                                                                    <Grid item xs={6}>
                                                                        <Button variant="contained" color="primary" size="large" disabled={isAccepting} onClick={acceptEmployee}>
                                                                            {isAccepting ? 'WAIT' : "ACCEPT"}
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <Button variant="outlined" color="primary" size="large" onClick={() => setAcceptModalOpen(false)}>
                                                                            CANCEL
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </div>
                                            </Fade>
                                        </Modal>
                                    </Grid>
                                </Grid>)) : <Typography variant='h5'>No Employees Present</Typography>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}