import { Button, Fab, Grid, IconButton, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import GetAppIcon from '@material-ui/icons/GetApp';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

export default function CompanyEvents(props) {
    const classes = useStyles();
    const axios = require('axios');
    const [fetched, setFetched] = useState(false);
    const [companyEvents, setCompanyEvents] = useState([]);
    const [companyEventSize, setCompanyEventSize] = useState(0);
    const [mainState, setMainState] = useState('inital');
    const [imageUploaded, setImageUploaded] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());

    const handleUploadClick = event => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        setMainState('uploaded');
        setSelectedFile(event.target.files[0]);
        setImageUploaded(1);
    };

    const addNewEvent = () => {
        if (heading !== '' && description !== '' && imageUploaded !== 0) {
            setIsSubmitting(true);
            var FormData = require('form-data');
            var data = new FormData();
            data.append('file', selectedFile);
            data.append('data', JSON.stringify({"heading":heading,"description":description, "dueDate": dueDate.toISOString().split("T")[0]}));

            var config = {
                method: 'post',
                url: 'http://localhost:9090/v1/company-event',
                headers: {
                    'Authentication': 'BEARER '+props.authentication,
                    'User-Id': props.userId
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setIsSubmitting(false);
                    setHeading('');
                    setDescription('');
                    setDueDate(new Date());
                    setSelectedFile(null);
                    setMainState('initial');
                    setImageUploaded(0);

                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:9090/v1/company-events',
            headers: {
                'Authentication': 'BEARER ' + props.authentication,
                'User-Id': props.userId
            }
        };

        axios(config)
            .then(function (response) {
                setCompanyEvents(response.data);
                setFetched(true);
                setCompanyEventSize(response.data.length);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    return (
        <>
            <Grid container justify='center' alignItems='center' direction='column' spacing={3}>
                <Grid item md={12}>
                    <Grid container direction='column' alignItems='center' justify='center' spacing={3} className={classes.docUploadBox}>
                        <Grid item xs={12}>
                            <Typography variant='h4' align='center' className={classes.docUploadHeading}>CREATE A NEW EVENT/ANNOUNCEMENT</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={heading} onChange={(event) => setHeading(event.target.value)} label='Enter Event Heading' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField multiline rows='4' value={description} onChange={(event) => setDescription(event.target.value)} label='Enter Event Description' />
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Enter Due Date"
                                    format="MM/dd/yyyy"
                                    value={dueDate}
                                    onChange={(date) => setDueDate(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            {imageUploaded === 0 ?
                                <>
                                    <input
                                        accept=".png"
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
                            <Button variant='contained' color='primary' disabled={isSubmitting} onClick={addNewEvent} className={classes.docUploadButton}>{isSubmitting ? 'UPLOADING' : "UPLOAD"}</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}