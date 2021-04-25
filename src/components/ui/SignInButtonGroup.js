import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
    btn:{
        fontSize:'1.3rem'
    },
    btnContainer:{
        overflowX:'hidden'
    }
}));

export default function SignInButtonGroup() {
    const classes = useStyles();
    const [employeeSignInLink, setEmployeeSignInLink] = useState('');
    const [managerSignInLink, setManagerSignInLink] = useState('');
    const axios = require('axios');

    useEffect(()=>{
        axios.get('http://localhost:9090/v1/get-keycloak-url/manager').then(({data})=>{
            setManagerSignInLink(data);
        });
        axios.get('http://localhost:9090/v1/get-keycloak-url/employee').then(({data})=>{
            setEmployeeSignInLink(data);
        });

    })

    return (
        <Grid container spacing={1} justify='center' alignItems='center' className={classes.btnContainer}>
            <Grid item sm={6}>
                <Button variant='outlined' color='primary' size='large' className={classes.btn} type='button' href={managerSignInLink}>
                    Manager&nbsp;Sign&nbsp;In
                                    </Button>
            </Grid>
            <Grid item sm={6}>
                <Button variant='contained' color='primary' size='large' className={classes.btn} type='button' href={employeeSignInLink}>
                    Employee&nbsp;Sign&nbsp;In
                                    </Button>
            </Grid>
        </Grid>
    );
}