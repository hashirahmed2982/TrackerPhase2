
import DynamicTable from "../../table/DynamicTable"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Topcard from "../../components/topcard";
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import {  Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewTotalProfit } from "../../components/topcard";
import AdminRow from "../../components/admin-row";
import ResponsiveAppBar from "../../components/navbar";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import { tranurl,userurl,caturl,walurl,comurl,adminurl,url } from "../../components/url";
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {  InputAdornment, OutlinedInput, Paper} from '@mui/material';
import FormDialog from '../../table/add';
import { TextField, MenuItem} from '@mui/material';
;



function HomeAdmin() {

  const [datas, setdatas] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [catdata, setcatdata] = useState([]);
  const [waldata, setwaldata] = useState([]);
  const [comdata, setcomdata] = useState([]);
  const [ready, setready] = useState(false);
  const [com, setcom] = useState({company: "ALL"});

  const usercolumn = [ 'Transid', 'createdat', 'updatedat', 'description', 'category', 'type', 'amount', 'wallet','user','company'];
  
  const {user} = useAuthContext();
  console.log(user) 
  const gettable = () => {
    
    
    if(com['company'] === "ALL"){
      axios.get(tranurl,{headers: {'Authorization': 'Bearer ' + user['token']},}).then(({ data }) => {
        setdatas(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else{
      console.log("front",com)
      axios.post(adminurl,com).then(({ data }) => {
        setdatas(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  };
  useEffect(() => {
    gettable();
    getCatData();
    getWalData();
    getCompanyData();
    getUser();
    
  }, [com,datas]);

 
  const handleFormChange = (event) => {
    com['company'] = event.target.value 
    setcom({...com});
 }

 
  const getUser = () => {
	axios.get(userurl,{headers: {'Authorization': 'Bearer ' + user['token']},}).then(({ data }) => {
        setuserdata(data);
        setready(true);
      })
      .catch((error) => {
        console.log(error);
      });
	
};
const getCatData = () => {
	axios.get(caturl).then(({ data }) => {
        setcatdata(data);
        
      })
      .catch((error) => {
        console.log(error);
      });
	
};
const getCompanyData = () => {
	axios.get(comurl).then(({ data }) => {
        setcomdata(data);
        
      })
      .catch((error) => {
        console.log(error);
      });
	
};
const getWalData = () => {
	axios.get(walurl).then(({ data }) => {
        setwaldata(data);
        
      })
      .catch((error) => {
        console.log(error);
      });
	
};

  let incomeVal = 0;
  let expenseVal = 0;

  // Calculate incomeVal and expenseVal
  datas.forEach((data) => {
    if (data.type === 'income') {
      incomeVal += parseInt(data.amount, 10);
    } else if (data.type === 'expense') {
      expenseVal += parseInt(data.amount, 10);
    }

  });
  let balanceVal = incomeVal - expenseVal;


  const formattedIncomeVal = `$${incomeVal}`;
  const formattedExpenseVal = `$${expenseVal}`;
  const formattedBalanceVal = `$${balanceVal}`;



  if(  userdata.length !== 0 ){
    return (
      <><ResponsiveAppBar userdata={userdata} /><br /><Box
        component="main"
        sx={{
          flexGrow: 1, 
        }}
      >

        <Container maxWidth="xl">
          <Grid

            container
            spacing={2}
            justifyContent={"center"}
          >
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                name="Income"
                value={formattedIncomeVal} />
            </Grid>

            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                name="Balance"
                value={formattedBalanceVal} 
                />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                name="Expense"
                value={formattedExpenseVal} />
            </Grid>
          </Grid>

          <br/>

          <Paper >
    <Stack direction="row"
              justifyContent="space-between"
              spacing={1}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search "
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
    
    <TextField
          sx={{ maxWidth: 150 }}
          required
          id="outlined-select"
          variant="standard"
          select
          label="Company"
          
          fullWidth
          name='company'
            value={com['company']}
            onChange={(e) => handleFormChange(e)}
        >
          <MenuItem key="ALL" value='ALL'>
              ALL
            </MenuItem>
          {comdata.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
    <Grid>
    <FormDialog userdata={userdata} catdata={catdata} waldata={waldata} comdata={comdata}/>
                </Grid>
                </Stack>
                
  </Paper>
          <DynamicTable TableData={datas} tranurl={tranurl} comdata={comdata} url={url} catdata={catdata} waldata={waldata} column={usercolumn}/>
        </Container></Box></>
    );
  }
  else{
    return(
      "no data found"
    );
  }
}

export default HomeAdmin