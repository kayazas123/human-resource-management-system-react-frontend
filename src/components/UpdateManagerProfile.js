import 'date-fns';
import { Box, Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../animations/updateProfileAnimation/data";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    descriptionBox: {
        width: '25em'
    },
    submitButton: {
        fontSize: '1.3rem'
    }

}));

export default function UpdateManagerProfile(props) {
    var axios = require('axios');
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const { managerDetails } = props;
    const [firstName, setFirstName] = useState(managerDetails.firstName);
    const [middleName, setMiddleName] = useState(managerDetails.middleName);
    const [lastName, setLastName] = useState(managerDetails.lastName);
    const [description, setDescription] = useState(managerDetails.description);
    const [status, setStatus] = useState(managerDetails.status);
    const [gender, setGender] = useState(managerDetails.gender);
    const [country, setCountry] = useState(managerDetails.countryId)
    const [countries, setCountries] = useState([]);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(managerDetails.dateOfBirth))
    const [isSubmitting, setIsSubmitting] = useState(false);


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://flenderson-spring-hrm.herokuapp.com/v1/countries',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setCountries(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    const areDetailsFilled = () => {
        if ((firstName === null || firstName.length === 0))
            return false;
        return true;
    }

    const submitDetailsForUpdation = () => {
        if (areDetailsFilled) {
            setIsSubmitting(true);
            var data = JSON.stringify({ "managerId": props.userId, "firstName": firstName, "middleName": middleName, "lastName": lastName, "description": description, "status": status, "gender": gender, "dateOfBirth": dateOfBirth, "countryId": country });

            var config = {
                method: 'put',
                url: 'http://localhost:9090/v1/manager-details',
                headers: {
                    'Authentication': 'BEARER ' + props.authentication,
                    'User-Id': props.userId,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then((response) => {
                    if (response.status===200){
                        setIsSubmitting(false);
                        if (managerDetails.companyCreated){
                            props.history.push('/manager-dashboard')
                        }else{
                            props.history.push('/manager-dashboard/create-company');
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.contactUsContainer} spacing={matches ? 0 : 4}>
            <Grid item md={6}>
                <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
            </Grid>
            <Grid item md={4}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                    <Box mb={3}>
                        <Grid item xs={12}>
                            <Typography align='center' variant="h4">{'Hello ' + managerDetails.firstName + ','}</Typography>
                            <Typography align='center' variant="h4">{(managerDetails.gender === null ? 'Complete ' : 'Update ') + 'Your Profile Details'}</Typography>
                        </Grid>
                    </Box>
                    <Grid item xs={12} alignContent='center'>
                        <Grid container direction='row' justify='center' alignItems='center' spacing={2}>
                            <Grid item xs={4}>
                                <TextField id="full-name" label="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="email" label="Middle Name" value={middleName} onChange={(event) => setMiddleName(event.target.value)} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="email" label="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} alignContent='center'>
                        <FormControl className={classes.descriptionBox}>
                            <InputLabel id="issue-type">Gender</InputLabel>
                            <Select
                                labelId="issue-type"
                                id="issue-type-select"
                                value={gender}
                                onChange={(event) => setGender(event.target.value)}
                            >
                                <MenuItem value={'MALE'}>MALE</MenuItem>
                                <MenuItem value={'FEMALE'}>FEMALE</MenuItem>
                                <MenuItem value={'OTHER'}>OTHER</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                value={dateOfBirth}
                                onChange={(date) => setDateOfBirth(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} alignContent='center'>
                        <FormControl className={classes.descriptionBox}>
                            <InputLabel id="issue-type">Country</InputLabel>
                            <Select
                                labelId="issue-type"
                                id="issue-type-select"
                                value={country}
                                onChange={(event) => setCountry(event.target.value)}
                            >
                                {countries.map(country => <MenuItem value={country.id}>{country.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} alignContent='center'>
                        <TextField multiline rows={3} label='Status' className={classes.descriptionBox} value={description} onChange={(event) => setDescription(event.target.value)}></TextField>
                    </Grid>
                    <Grid item xs={12} alignContent='center'>
                        <TextField multiline rows={5} label='Description' className={classes.descriptionBox} value={status} onChange={(event) => setStatus(event.target.value)}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' color='primary' size='large' className={classes.submitButton} onClick={submitDetailsForUpdation} disabled={isSubmitting}>{isSubmitting?'UPDATING...':'SUBMIT'}</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}