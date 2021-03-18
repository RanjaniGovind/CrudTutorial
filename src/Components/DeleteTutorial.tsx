import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import axios from 'axios';


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

const DeleteTutorial: React.FC<{ row: IValues, onDelete: () => void }> = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   const handleDelete = () => {
       debugger;
    axios.delete('https://localhost:44374/api/Tutorial/DeleteTutorial?id='+row.id);
    props.onDelete();
}
 

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Delete 
      </Button>
      <Dialog
        open={open}
         TransitionComponent={Transition} 
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-description">{"Delete Tutorial List"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Are u sure abt deleting this tutorial List.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Disagree
          </Button>
          <Button onClick={(_)=>{handleClose(); handleDelete();}} color="primary" variant="contained" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeleteTutorial