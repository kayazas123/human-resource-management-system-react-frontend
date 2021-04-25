import { Grid, makeStyles, TextField, Typography, useMediaQuery, useTheme, Button, Fab, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import GetAppIcon from '@material-ui/icons/GetApp';
import { triggerBase64Download } from 'react-base64-downloader';

const useStyles = makeStyles(theme => ({
    docUploadBox: {
        border: '1px solid black',
        boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.7)',
        padding: '1rem 3rem'
    },
    docUploadHeading: {
        fontWeight: 600
    },
    docUploadButton: {
        fontSize: '1.4rem'
    },
    input: {
        display: "none"
    },
    companyDocBox: {
        border: '1px solid black',
        boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.6)',
        padding: '1rem',
        margin: '1rem'
    },
    downloadIcon: {
        width: '3.5rem',
        height: '3.5rem',
        backgroundColor: '#CC313D',
        borderRadius: '50%',
        padding: '1rem',
        color: 'white'
    }
}));

export default function UpdateCompany(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const axios = require('axios');
    const [fetched, setFetched] = useState(false);
    const [companyDocs, setCompanyDocs] = useState([]);
    const [docName, setDocName] = useState('');
    const [mainState, setMainState] = useState('inital');
    const [imageUploaded, setImageUploaded] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploaded, setUploaded] = useState(0);
    const [encodedString, setEncodedString] = useState('')

    const handleUploadClick = event => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        setMainState('uploaded');
        setSelectedFile(event.target.files[0]);
        setImageUploaded(1);
    };

    const handleDocUpload = () => {
        if (imageUploaded === 1 && docName !== '') {
            setIsSubmitting(true);
            var FormData = require('form-data');
            var fs = require('fs');
            var data = new FormData();
            data.append('file', selectedFile);
            data.append('data', `{"name":"${docName}"}`);

            var config = {
                method: 'post',
                url: 'http://localhost:9090/v1/company-document',
                headers: {
                    'Authentication': 'BEARER ' + props.authentication,
                    'User-Id': props.userId
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setIsSubmitting(false);
                    setDocName('');
                    setSelectedFile(null);
                    setImageUploaded(0);
                    setMainState('inital');
                    setUploaded(uploaded + 1)
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:9090/v1/company-documents',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId
            }
        };

        axios(config)
            .then(function (response) {
                setCompanyDocs(response.data);
                setFetched(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [uploaded]);

    const handleDownload = (key, name) => {
        var config = {
            method: 'put',
            url: 'http://localhost:9090/v1/file',
            headers: {
                'Content-Type': 'text/plain'
            },
            data: key
        };

        axios(config)
            .then(function (response) {
                triggerBase64Download('data:image/png;base64,'+response.data, name);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <Grid container justify='center' alignItems='center' direction='column' spacing={3}>
                <Grid item md={12}>
                    <Grid container direction='column' alignItems='center' justify='center' spacing={3} className={classes.docUploadBox}>
                        <Grid item xs={12}>
                            <Typography variant='h3' align='center' className={classes.docUploadHeading}>UPLOAD COMPANY DOCUMENT</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction='row' justify='center' alignItems='center' spacing={6}>
                                <Grid item md={12}>
                                    <TextField value={docName} onChange={(event) => setDocName(event.target.value)} label='Enter Document Name' />
                                </Grid>
                            </Grid>
                        </Grid>
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
                        <Grid item xs={12}>
                            <Button variant='contained' color='primary' disabled={isSubmitting} onClick={handleDocUpload} className={classes.docUploadButton}>{isSubmitting ? 'UPLOADING' : "UPLOAD"}</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box my={6}>
                {(fetched === true && companyDocs.length === 0) ? <Typography variant='h4' align='center'>NO DOCUMENTS UPLOADED YET</Typography>
                    :
                    <Grid container column='row' justify="space-evenly" alignItems='center'>
                        {companyDocs.map(companyDoc => <Grid item className={classes.docUploadBox} md={3}>
                            <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant='h4'>{companyDoc.name}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <GetAppIcon className={classes.downloadIcon} onClick={() => { handleDownload(companyDoc.documentUrl, companyDoc.name) }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h4' align='center'>UPLOADED ON</Typography>
                                    <Typography variant='h5' align='center'>{new Date(companyDoc.createdAt).toString()}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>)}
                    </Grid>
                }
            </Box>
        </>
    )
}