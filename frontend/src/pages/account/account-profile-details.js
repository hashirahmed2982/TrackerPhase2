import { useCallback, useState } from 'react';
import axios from "axios";
import { usersurl } from '../../components/url';
import {toast} from 'react-hot-toast'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import ChangePass from './changepassword';



export const AccountProfileDetails = ({user,userdata}) => {
  const [values, setValues] = useState(userdata);

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit =  () => {
    console.log("set",values);
    
    axios
	.put(
		usersurl +
		values._id,
		values,{headers: {'Authorization': 'Bearer ' + user['token']},}
	)
	.then((res) => {
		if (res.status === 200) {
      toast.success("Profile successfully updated");
      //window.location.reload();
		
		} else Promise.reject();
	})
	.catch((err) => toast.error("Something went wrong"));
    
    
  }

  return (
    <form
      autoComplete="off"
      noValidate
      
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  disabled
                  onChange={handleChange}
                  
                  value={values.company}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  
                  value={values.username}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              
              
              
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end ' }}>
        <ChangePass userdata={userdata}></ChangePass> &nbsp;
          <Button variant="contained" onClick={handleSubmit}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
