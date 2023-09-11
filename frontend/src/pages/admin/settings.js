import DynamicTable from "../../table/DynamicTable";
import ResponsiveAppBar from "../../components/navbar";
import { Box } from '@mui/material';
import React, { useState, useEffect } from "react";
import AddCol from '../../table/add-col'
import axios from "axios";
import './settings.css';
import AddUser from "../../table/settingsAdd/addUser";
import AddComp from "../../table/settingsAdd/addComp";
import AddCat from "../../table/settingsAdd/addCat";
import AddWall from "../../table/settingsAdd/addWall";
import { usersurl,comurl,caturl,walurl } from "../../components/url";



function Settings({ user }) {

    const [userDatas, setUserData] = useState([]);
    const [compDatas, setCompData] = useState([]);
    const [catDatas, setCatData] = useState([]);
    const [walDatas, setWalData] = useState([]);


    const usercol = ['id', 'name', 'email', 'password', 'username', 'company', 'role'];
    const catcol = ['catid', 'name'];
    const compcol = ['id', 'name', 'compid'];
    const walcol = ['wallid', 'name'];


    // console.log(user)

  



    useEffect(() => {
        axios.get(usersurl, { headers: { 'Authorization': 'Bearer ' + user['token'] }, }).then(({ data }) => {
            setUserData(data);
        })
            .catch((error) => {
                console.log(error);
            });
        // getCatData();
        getCompData();
        getCatData();
        getWalData();
    }, [userDatas,walDatas,catDatas,compDatas]);

    const getCompData = () => {
        axios.get(comurl, { headers: { 'Authorization': 'Bearer ' + user['token'] }, }).then(({ data }) => {
            setCompData(data);
            // setready(true);
        })
            .catch((error) => {
                console.log(error);
            });

    };
    const getCatData = () => {
        axios.get(caturl, { headers: { 'Authorization': 'Bearer ' + user['token'] }, }).then(({ data }) => {
            setCatData(data);

        })
            .catch((error) => {
                console.log(error);
            });

    };
    const getWalData = () => {
        axios.get(walurl, { headers: { 'Authorization': 'Bearer ' + user['token'] }, }).then(({ data }) => {
            setWalData(data);

        })
            .catch((error) => {
                console.log(error);
            });

    };

    if (userDatas.length !== 0) {
        return (
            <div>
                <ResponsiveAppBar userdata={userDatas} /><Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                    }}
                ></Box>

                <div class='column'>
                    <h3>&nbsp;&nbsp;User Table</h3>
                    <div class='row'>
                        <div className='table-container'>
                            <AddUser url={usersurl} compdata={compDatas}/>
                            <DynamicTable TableData={userDatas} url={usersurl} comdata={compDatas} column={usercol} height={350} />
                        </div>
                    </div>
                    <h3>&nbsp;&nbsp;Category Table</h3>
                    <div class='row'>
                        <div className='table-container'>
                            <AddCat url={caturl}/>
                            <DynamicTable TableData={catDatas} url={caturl} comdata={compDatas} column={catcol} height={350}/>
                        </div>
                    </div>
                </div>

                <div class='column'>
                    <h3>&nbsp;&nbsp;Company Table</h3>
                    <div class='row'>
                        <div className='table-container'>
                            <AddComp url={comurl}/>
                            <DynamicTable TableData={compDatas} url={comurl} comdata={compDatas} column={compcol} height={350}/>
                        </div>
                    </div>

                </div>

                <div class='column'>
                    <h3>Wallet Table</h3>
                    <div class='row'>
                        <div className='table-container'>
                            <AddWall url={walurl}/>
                            <DynamicTable TableData={walDatas} url={walurl}  column={walcol} height={350}/>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
    else {
        return (
            "Loading..."
        );
    }
}

export default Settings