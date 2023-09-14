import DynamicTable from "../table/DynamicTable";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Topcard from "../components/topcard";
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {  InputAdornment, OutlinedInput, Paper, SvgIcon ,Button, Stack} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import FormDialog from '../table/add';
import "../components/loader/style.css"
import Spinner from "../components/loader/spinner";
import {
  Box,
  Container
} from "@mui/material";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewTotalProfit } from "../components/topcard";
import CustomersSearch from "../components/search";
import ResponsiveAppBar from "../components/navbar";
import { useAuthContext } from "../components/hooks/useAuthContext";
import { url, userurl, caturl, walurl } from "../components/url";

function Home() {
  const [datas, setdatas] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [catdata, setcatdata] = useState([]);
  const [waldata, setwaldata] = useState([]);
  const [ready, setready] = useState(false);
  const [rows, setRows] = useState([]);
  const [stat, setstat] = useState("initial");
  
  const [searched, setSearched] = useState("");
  const usercolumn = [
    "Transid",
    "createdat",
    "updatedat",
    "description",
    "category",
    "type",
    "amount",
    "wallet",
  ];

  const { user } = useAuthContext();
  console.log(user);
  const gettable =  async () => {
     await axios.get(url,{headers: {'Authorization': 'Bearer ' + user['token']},}).then(({ data }) => {
      setdatas(data);
      setRows(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  useEffect(() => {
    if(user){
    gettable();
    getCatData();
    getWalData();
    getUser();
    }
  }, [user]);

  const getUser = async () => {
   await axios
      .get(userurl, { headers: { Authorization: "Bearer " + user["token"] } })
      .then(({ data }) => {
        setuserdata(data[0]);
        setready(true);
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

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const getCatData = async () => {
    await axios
      .get(caturl)
      .then(({ data }) => {
        setcatdata(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getWalData = async () => {
    await axios
      .get(walurl)
      .then(({ data }) => {
        setwaldata(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { incomeVal, expenseVal, balanceVal } = useMemo(() => {
    let incomeVal = 0;
    let expenseVal = 0;

    datas.forEach((data) => {
      if (data.type === "income") {
        incomeVal += parseInt(data.amount, 10);
      } else if (data.type === "expense") {
        expenseVal += parseInt(data.amount, 10);
      }
    });

    const balanceVal = incomeVal - expenseVal;

    return { incomeVal, expenseVal, balanceVal };
  }, [datas]);

  const formattedIncomeVal = `$${incomeVal}`;
  const formattedExpenseVal = `$${expenseVal}`;
  const formattedBalanceVal = `$${balanceVal}`;

  if ( userdata.length !== 0 ) {
    return (
      <>
        <ResponsiveAppBar userdata={userdata} />
        <br />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewTotalProfit
                  sx={{ height: "100%" }}
                  name="Income"
                  value={formattedIncomeVal}
                />
              </Grid>

              <Grid xs={12} sm={6} lg={3}>
                <OverviewTotalProfit
                  sx={{ height: "100%" }}
                  name="Balance"
                  value={formattedBalanceVal}
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewTotalProfit
                  sx={{ height: "100%" }}
                  name="Expense"
                  value={formattedExpenseVal}
                />
              </Grid>
            </Grid>

            <br />
            <Paper>
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
    <Grid>
    <FormDialog userdata={userdata} catdata={catdata} waldata={waldata}/>
                </Grid>
                </Stack>
            
            <DynamicTable
              TableData={rows}
              url={url}
              catdata={catdata}
              waldata={waldata}
              column={usercolumn}
            />
            </Paper>
          </Container>
        </Box>
      </>
    );
  } else {
    return (
      <div className="pos-center">
      <Spinner />
    </div>
    );
  }
}

export default Home;
