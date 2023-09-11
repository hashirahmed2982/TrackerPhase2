import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Paper, SvgIcon } from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import axios from "axios";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import { toast } from 'react-hot-toast'

export default function AddCat({ userdata, url }) {
    const [open, setOpen] = React.useState(false);
    const { user } = useAuthContext();
    const [userInfo, setUserInfo] = React.useState({
        wallid: '',
        name: ''
    });
    const initial = {
        wallid: '',
        name: ''
    };

    const handleFormChange = (event) => {

        userInfo[event.target.name] = event.target.value;
        setUserInfo({ ...userInfo });
    }

    const handleSubmit = () => {
        setUserInfo({ ...userInfo });
        console.log("create", userInfo);
        if (
            !userInfo.name ||
            !userInfo.wallid
        ) {
            toast.error('Please fill in all required fields');
            return;
        }

        axios.post(
            url,
            userInfo, { headers: { 'Authorization': 'Bearer ' + user['token'] }, })
            .then(res => {
                if (res.status === 200) {
                    toast.success('data successfully created');
                    setUserInfo({ ...initial });
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
        setUserInfo({ ...initial });
        setOpen(false);
    };
    return (
        <div>
            <Button sx={{ marginBottom: '6px' }} onClick={handleClickOpen}

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
                <DialogTitle>Add Category</DialogTitle>
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
                            id="wallid"
                            name='wallid'
                            label="Wallet ID"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={userInfo.wallid}
                            onChange={(e) => handleFormChange(e)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            name='name'
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={userInfo.name}
                            onChange={(e) => handleFormChange(e)}
                        />
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