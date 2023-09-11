import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Select, MenuItem, InputLabel,Box,Paper, SvgIcon , Stack} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import axios from "axios";
import { useAuthContext } from "../components/hooks/useAuthContext";
import {toast} from 'react-hot-toast'
import { url } from '../components/url';

export default function FormDialog({userdata,catdata,waldata,comdata}) {
  const [open, setOpen] = React.useState(false);
  const [pass, setpass] = React.useState(false);
  const {user} = useAuthContext(); 
  const [Transaction, setTransaction] = React.useState({
    Transid: '',
    createdat: '',
    updatedat: '',
    description: '',
    type: '',
    category: '',
    user: '',
    amount: '',
    wallet: '',
    user_id: '',
    company: ''
  });
  const initial = {
    Transid: '',
    createdat: '',
    updatedat: '',
    description: '',
    type: '',
    category: '',
    user: '',
    amount: '',
    wallet: '',
    user_id: '',
    company: ''
  };
  
  function formatDate(date) {
    const year = date.getUTCFullYear().toString().substr(-2);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
    
  const handleFormChange = (event) => {
   
    Transaction[event.target.name] = event.target.value;
    setTransaction({...Transaction});
 }
 
 const handleSubmit = () => {
  const currentDate = new Date();
  Transaction['user_id'] = userdata[0]['_id'];
  Transaction['user'] = userdata[0]['name'];
  if(userdata[0]['role'] !== 'admin'){
    Transaction['company'] = userdata[0]['company'];
  }
  
  
  Transaction['createdat'] = formatDate(currentDate);
  setTransaction({...Transaction});
  console.log("create",Transaction);
  console.log(userdata);
  if (
    !Transaction.Transid ||
    !Transaction.createdat ||
    !Transaction.type ||
    !Transaction.category ||
    !Transaction.description ||
    !Transaction.amount ||
    !Transaction.wallet ||!Transaction.company
  ) {
    toast.error('Please fill in all required fields');
    return;
  }
 
  axios.post(
    url,
        Transaction,{headers: {'Authorization': 'Bearer ' + user['token']},})
        .then(res => {
            if (res.status === 200){
              toast.success('data successfully created');
            setTransaction({...initial});
            setOpen(false);
            window.location.reload();
            }
            else
            Promise.reject()
        })
        .catch(err => toast.error(err))
  
};

  const handleClickOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
    setTransaction({...initial});
    setOpen(false);
  };
  return (
    <div>
      <Button sx={{ marginTop:'6px' } } onClick={handleClickOpen} 
                
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add
              </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>Add Transaction</DialogTitle>
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
            id="Transid"
            name='Transid'
            label="TransID"
            type="text"
            fullWidth
            variant="standard"
            value={Transaction.Transid}
          onChange={(e) => handleFormChange(e)}
          />
          <TextField
          required
            autoFocus
            margin="dense"
            id="createdat"
            label="  "
            type="date"
            fullWidth
            variant="standard"
            name='createdat'
            value={Transaction.createdat}
            onChange={(e) => handleFormChange(e)}
          />
          <TextField
          required
          id="outlined-select-currency"
          variant="standard"
          select
          label="Type"
          fullWidth
          helperText="Please select your type"
          name='type'
            value={Transaction.type}
            onChange={(e) => handleFormChange(e)}
        >
            <MenuItem key="type" value="income">
                  income
            </MenuItem>
            <MenuItem key="type" value="expense">
                  expense
            </MenuItem>
          
        </TextField>
        
          <TextField
          required
          id="outlined-select"
          variant="standard"
          select
          label="Category"
          fullWidth
          helperText="Please select your category"
          name='category'
            value={Transaction.category}
            onChange={(e) => handleFormChange(e)}
        >
          {catdata.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
          <TextField
          required
            autoFocus
            margin="dense"
            id="Description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            name='description'
            value={Transaction.description}
            onChange={(e) => handleFormChange(e)}
          />
          <TextField
          required
            autoFocus
            margin="dense"
            id="Amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            name='amount'
            value={Transaction.amount}
            onChange={(e) => handleFormChange(e)}
          />
          <TextField
          required
          id="outlined-select"
          variant="standard"
          select
          label="Wallet"
          fullWidth
          helperText="Please select your wallet"
          name='wallet'
            value={Transaction.wallet}
            onChange={(e) => handleFormChange(e)}
        >
          {waldata.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        {userdata[0]['role']==='admin'?
        <TextField
        required
        id="outlined-select"
        variant="standard"
        select
        label="Company"
        fullWidth
        helperText="Please select Company"
        name='company'
          value={Transaction.company}
          onChange={(e) => handleFormChange(e)}
      >
        {comdata.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>:<div></div>
        
      }
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}