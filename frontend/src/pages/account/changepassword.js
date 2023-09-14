import * as React from 'react';
import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Select, MenuItem, InputLabel,Box,Paper, SvgIcon , Stack} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import axios from "axios";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import {toast} from 'react-hot-toast'
import { usersurl } from '../../components/url';

export default function ChangePass({userdata}) {
  const [open, setOpen] = React.useState(false);
 
  const {user} = useAuthContext(); 
  const [data, setdata] = React.useState(userdata)
  const [newpass, setnewpass] = React.useState({currpass:'' , newpass:'' , confirmpass:''})

  
 
    
  const handleChange = useCallback(
    (event) => {
      setnewpass((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
 
 const handleSubmit = () => {
    
  if (
    !newpass.currpass ||
    !newpass.newpass ||
    !newpass.confirmpass 
  ) {
    toast.error('Please fill in all required fields');
    return;
  }
  if (
    data.password !== newpass.currpass 
  ) {
    toast.error('Please type correct current password');
    return;
  }
  if (
    newpass.newpass !==
    newpass.confirmpass  
  ) {
    toast.error('passwords dont match');
    return;
  }else{
    data.password = newpass.newpass;
  }
 
  axios
	.put(
		usersurl +
		data._id,
		data,{headers: {'Authorization': 'Bearer ' + user['token']},}
	)
	.then((res) => {
		if (res.status === 200) {
      toast.success("Password successfully changed");
      //window.location.reload();
		handleClose();
		} else Promise.reject();
	})
	.catch((err) => toast.error("Something went wrong"));
    
    
  
  
};

  const handleClickOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
  
    setOpen(false);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
            Change Password
          </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All fields are required.
          </DialogContentText>
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
          <TextField
          required
            autoFocus
            margin="dense"
            id="curr"
            name='currpass'
            label="Current Password"
            type="text"
            fullWidth
            variant="standard"
            value={newpass.currpass}
          onChange={(e) => handleChange(e)}
          />
          <TextField
          required
            autoFocus
            margin="dense"
            id="newpass"
            label="New Password"
            type="text"
            fullWidth
            variant="standard"
            name='newpass'
            value={newpass.newpass}
            onChange={(e) => handleChange(e)}
          />
          <TextField
          autoFocus
          margin="dense"
          required
          id="confirmpass"
          variant="standard"
          
          label="Confirm password"
          fullWidth
          name='confirmpass'
            value={newpass.confirmpass}
            onChange={(e) => handleChange(e)}
        />
           
          
        

        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}