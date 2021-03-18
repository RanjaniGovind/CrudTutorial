import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import axios from 'axios';
import { TextField }  from '@material-ui/core';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IValues {
    id: number,
    title: string,
    description: string,
}

const EditTutorial: React.FC<{ row: IValues, onEdit: (row:IValues) => void }> = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    
const handleClickOpen = () => {
    (async () => {
      await axios.get<IValues>('https://localhost:44374/api/Tutorial?id=' + row.id).then((r)=>{
        setValues(r.data);
      })
    })()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   var defaultValues: IValues = {
    id: 0,
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

  const handleEdit = () => {
    axios.put('https://localhost:44374/api/Tutorial/PutTutorial?id='+row.id, values).then((r)=>{
      props.onEdit(values);
    })
  }
 
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit 
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="Conformation Message">{"Edit Tutorial List"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ckeck once before clicking the Agree button.
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary" variant="contained">
            Disagree
          </Button>
          <Button onClick={(_) => { handleClose(); handleEdit(); }} color="primary" variant="contained" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EditTutorial