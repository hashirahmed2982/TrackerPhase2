
import DynamicTable from "../../table/DynamicTable"
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import {  Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewTotalProfit } from "../../components/topcard";
import "../../components/loader/style.css"
import Spinner from "../../components/loader/spinner";
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
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const [comdata, setcomdata] = useState([]);
  const [ready, setready] = useState(false);
  const [com, setcom] = useState({company: "ALL"});

  const usercolumn = [ 'Transid', 'createdat', 'updatedat', 'description', 'category', 'type', 'amount', 'wallet','user','company'];
  
  const {user} = useAuthContext();
  console.log(user) 
  const gettable = async () => {
    
    
    if(com['company'] === "ALL"){
      await axios.get(tranurl,{headers: {'Authorization': 'Bearer ' + user['token']},}).then(({ data }) => {
        setdatas(data);
        setRows(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else{
      console.log("front",com)
      await axios.post(adminurl,com).then(({ data }) => {
        setdatas(data);
        setRows(data);
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
    
  }, []);

 
  const handleFormChange = (event) => {
    com['company'] = event.target.value 
    setcom({...com});
    gettable()
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
const getCatData = async () => {
	await axios.get(caturl).then(({ data }) => {
        setcatdata(data);
        
      })
      .catch((error) => {
        console.log(error);
      });
	
};
const getCompanyData = async () => {
	 await axios.get(comurl).then(({ data }) => {
        setcomdata(data);
        
      })
      .catch((error) => {
        console.log(error);
      });
	
};
const getWalData = async () => {
	await axios.get(walurl).then(({ data }) => {
        setwaldata(data);
        
      })
      .catch((error) => {
        console.log(error);
      });
	
};
const requestSearch = (event) => {
  setSearched(event.target.value);
  console.log("search",event.target.value)
  if(event.target.value === ""){
    setSearched("");
    setRows(datas);
    

  }
  else{
    const filteredRows = datas.filter((row) => {
      return row.description.includes(event.target.value);
    });
    setRows(filteredRows);
  }
  
  console.log("filtered",rows)
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

          
    <Stack direction="row"
              justifyContent="space-between"
              spacing={1}>
    <OutlinedInput
      value={searched}
      onChange={(e) => requestSearch(e)}
          
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
    
    <FormDialog userdata={userdata} catdata={catdata} waldata={waldata} comdata={comdata}/>
                
                </Stack>
                
  
          <DynamicTable TableData={rows} tranurl={tranurl} comdata={comdata} url={url} catdata={catdata} waldata={waldata} column={usercolumn}/>
        </Container></Box></>
    );
  }
  else{
    return(
      <div className="pos-center">
      <Spinner />
    </div>
    );
  }
}

export default HomeAdmin