import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Box, Paper, SvgIcon, Stack } from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import axios from "axios";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import { toast } from 'react-hot-toast'

export default function AddUser({ url, compdata }) {
    const [open, setOpen] = React.useState(false);
    const [pass, setpass] = React.useState(false);
    const { user } = useAuthContext();
    const [userInfo, setUserInfo] = React.useState({

        id: '',
        name: '',
        email: '',
        password: '',
        username: '',
        company: '',
        username: '',
        role: ''
    });
    const initial = {


        id: '',
        name: '',
        email: '',
        password: '',
        username: '',
        company: '',
        role: ''
    };

    const handleFormChange = (event) => {

        userInfo[event.target.name] = event.target.value;
        setUserInfo({ ...userInfo });
    }

    const handleSubmit = () => {



        setUserInfo({ ...userInfo });
        console.log("create", userInfo);

        if (
            !userInfo.id ||
            !userInfo.name ||
            !userInfo.email ||
            !userInfo.password ||
            !userInfo.username ||
            !userInfo.company ||
            !userInfo.role
        ) {
            toast.error('Please fill in all required fields');
            return;
        }

        axios.post(
            url,
            userInfo, { headers: { 'Authorization': 'Bearer ' + user['token'] }, })
            .then(res => {
                if (res.status === 200) {
                    toast.success('User successfully created');
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
                <DialogTitle>Add User</DialogTitle>
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
                            id="id"
                            name='id'
                            label="ID"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={userInfo.id}
                            onChange={(e) => handleFormChange(e)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            name='name'
                            value={userInfo.name}
                            onChange={(e) => handleFormChange(e)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="text"
                            fullWidth
                            variant="standard"
                            name='email'
                            value={userInfo.email}
                            onChange={(e) => handleFormChange(e)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="text"
                            fullWidth
                            variant="standard"
                            name='password'
                            value={userInfo.password}
                            onChange={(e) => handleFormChange(e)}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            name='username'
                            value={userInfo.username}
                            onChange={(e) => handleFormChange(e)}
                        />
                        <TextField
                            required
                            id="outlined-select"
                            variant="standard"
                            select
                            label="Company"
                            fullWidth
                            helperText="Please select the Company of the user"
                            name='company'
                            value={userInfo.company}
                            onChange={(e) => handleFormChange(e)}
                        >
                            {compdata.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            id="outlined-select-currency"
                            variant="standard"
                            select
                            label="Role"
                            fullWidth
                            helperText="Please select user's role"
                            name='role'
                            value={userInfo.role}
                            onChange={(e) => handleFormChange(e)}
                        >
                            <MenuItem key="role" value="admin">
                                Admin
                            </MenuItem>
                            <MenuItem key="role" value="user">
                                User
                            </MenuItem>

                        </TextField>
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