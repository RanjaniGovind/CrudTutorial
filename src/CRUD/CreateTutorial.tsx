import React, { useState } from 'react';
import axios from 'axios';
import { TextField, useTheme } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        design: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);
export interface IValues {
    title: string,
    description: string,
}
const CreateTutorial: React.FC<{ onSave: () => void }> = (props) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const classes = useStyles();

    var defaultValues: IValues = {
        title: "",
        description: "",
    }

    const [values, setValues] = useState(defaultValues)


    const handleChange = (event: any) => {
        const name = event.target.name;
        setValues({
            ...values,
            [name]: event.target.value,
        });
    };
    const handleSubmit = () => {
        axios.post('https://localhost:44374/Api/Tutorial/postTutorial', values);
        props.onSave();
    }
    const classes = useStyles();
    return (
        <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Tutorial
        </Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"Add Tutorial"}</DialogTitle>
            <div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    defaultValue={values.title}
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="Description"
                    defaultValue={values.description}
                    onChange={handleChange}
                />
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        close
                    </Button>
                    <Button onClick={(_) => { handleClose(); handleSubmit(); }} color="primary" autoFocus>
                        save
                    </Button>
                </DialogActions> 
            </div>
        </Dialog>
        </div>
    );
}
export default CreateTutorial