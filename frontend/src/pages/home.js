
import DynamicTable from "../table/DynamicTable"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Topcard from "../components/topcard";
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import {  Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewTotalProfit } from "../components/topcard";
import CustomersSearch from "../components/search";
import ResponsiveAppBar from "../components/navbar";
import { useAuthContext } from "../components/hooks/useAuthContext";
import { url,userurl,caturl,walurl } from "../components/url";
;



function Home() {

  const [datas, setdatas] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [catdata, setcatdata] = useState([]);
  const [waldata, setwaldata] = useState([]);
  const [ready, setready] = useState(false);
  const usercolumn = [ 'Transid', 'createdat', 'updatedat', 'description', 'category', 'type', 'amount', 'wallet'];
  
  const {user} = useAuthContext();
  console.log(user) 
  const gettable = () => {
    axios.get(url,{headers: {'Authorization': 'Bearer ' + user['token']},}).then(({ data }) => {
      setdatas(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  useEffect(() => {
    gettable();
    getCatData();
    getWalData();
    getUser();
    console.log("repeated");
    console.log(datas)
  }, [datas]);

  
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



  if( catdata.length !==0 && userdata.length !== 0 && waldata.length !== 0){
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

          <CustomersSearch userdata={userdata} catdata={catdata} waldata={waldata}/>
          <DynamicTable TableData={datas} url={url} catdata={catdata} waldata={waldata} column={usercolumn}/>
        </Container></Box></>
    );
  }
  else{
    return(
      "no data found"
    );
  }
}

export default Home