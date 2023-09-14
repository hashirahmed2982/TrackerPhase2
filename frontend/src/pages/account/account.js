
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { AccountProfile } from './account-profile';
import { AccountProfileDetails } from './account-profile-details';

import { useAuthContext } from '../../components/hooks/useAuthContext';
import ResponsiveAppBar from '../../components/navbar';

const Account = ({userdata , user}) => (
    console.log("userdata",userdata),
  
  <>
     <ResponsiveAppBar userdata={userdata} />
        <br />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              My Profile
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile userdata={userdata}/>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails userdata={userdata} user={user}/>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);



export default Account;
