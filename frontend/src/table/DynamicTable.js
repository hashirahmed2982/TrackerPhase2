import axios from "axios";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import TableContainer from '@mui/material/TableContainer';
import { useAuthContext } from "../components/hooks/useAuthContext";
import {toast} from 'react-hot-toast'
import {
  
  Box,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableRow,
  
  Paper
} from '@mui/material';


function DynamicTable({ TableData ,url ,catdata,waldata ,comdata, column, height}) {
  const {user} = useAuthContext(); 
  //dynamic object to store edit variable values
  var [obj, setobj] = useState(TableData);
  useEffect(() => {
  }, [TableData]);
  if (!height) {
    height = 400;
  } 
 

  const initial = TableData;


  const handleCancel = () => {
    setobj(initial);
    setedit(null);
    console.log("cancel", initial);
 }
 
  //sets edit instance
  const [edit, setedit] = useState(null);

  // get table column names

  //temp.shift();
  //temp.splice(temp.indexOf('INDEX'), 1);
  //temp.splice(temp.indexOf('user'), 1);
  //temp.pop();

  

  // get table heading data
  const ThData = () => {

    return column.map((data,index) => {
      if(index == 0){return <><TableCell key="INDEX">INDEX</TableCell><TableCell key={data}>{data.toUpperCase()}</TableCell></>}else{
      return <TableCell key={data}>{data.toUpperCase()}</TableCell>}
    }
    )
  }

  //handle delete function
  const deleteUser = (_id) => {
    console.log(_id)
    axios
    .delete(
  url + _id,{headers: {'Authorization': 'Bearer ' + user['token']},})
    .then((res) => {
      if (res.status === 200) {
        toast.success("Transaction successfully deleted");
        window.location.reload();

      } else Promise.reject();
    })
    .catch((err) => toast.error("Something went wrong"));
  };

  //handle on change field values
  const handleFormChange = (event,index) => {
    obj[index][event.target.name] = event.target.value;
    setobj({...obj})
    console.log("changed",obj)
    

 }
 function formatDate(date) {
  const year = date.getUTCFullYear().toString().substr(-2);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

  //sends post api to url in order to update
  const updateUser = (_id,data) => {
    const currentDate = new Date();
    data['updatedat'] = formatDate(currentDate);
    setedit(false);
    axios
	.put(
		url +
		_id,
		data,{headers: {'Authorization': 'Bearer ' + user['token']},}
	)
	.then((res) => {
		if (res.status === 200) {
      toast.success("Transaction successfully updated");
      window.location.reload();
		
		} else Promise.reject();
	})
	.catch((err) => toast.error("Something went wrong"));
  };

  // get table row datas
  const tdData = () => {
    return TableData.map((data,index) => {
      return (
        <TableRow hover>
          <TableCell key="INDEX"> {index}</TableCell>
          {
            column.map((v) => {
              return <TableCell>
                 {edit === index ? (
                v === 'type' ? ( // Check if the field is 'type'
                  <Select
                    name={v}
                    placeholder={data[v]}
                    value={obj[index][v]} // Use the state variable for edited type
                    onChange={(event) => handleFormChange(event, index)}
                  >
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                  </Select>
                ) : (
                  v === 'category' ? (
                    <Select
                    name={v}
                    placeholder={data[v]}
                    value={obj[index][v]} // Use the state variable for edited type
                    onChange={(event) => handleFormChange(event, index)}
                  >
                    {catdata.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
                  </Select>
                  ) :v === 'updatedat' ?(<TextField
                    name={v}
                    placeholder={data[v]}
                    value={obj[index][v]}
                    onChange={(event) => handleFormChange(event, index)}
                    multiline
                    variant="standard"
                    disabled
                  />) :v === 'wallet' ?(<Select
                    name={v}
                    placeholder={data[v]}
                    value={obj[index][v]} // Use the state variable for edited type
                    onChange={(event) => handleFormChange(event, index)}
                  >
                    {waldata.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
                  </Select>):v === 'company' ?(<Select
                    name={v}
                    placeholder={data[v]}
                    value={obj[index][v]} // Use the state variable for edited type
                    onChange={(event) => handleFormChange(event, index)}
                  >
                    {comdata.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
                  </Select>):v === 'role' ?(<Select
                    name={v}
                    placeholder={data[v]}
                    value={obj[index][v]} // Use the state variable for edited type
                    onChange={(event) => handleFormChange(event, index)}
                  >
                    
            <MenuItem key={"admin"} value={"admin"}>
            Admin
            </MenuItem>
            <MenuItem key={"user"} value={"user"}>
            User
            </MenuItem>
          
                  </Select>):(
                    <TextField
                    name={v}
                    placeholder={data[v]}
                    value={obj[index][v]}
                    onChange={(event) => handleFormChange(event, index)}
                    multiline
                    variant="standard"
                  />
                  )
                )
              ) : (
                data[v]
            )}
                </TableCell>
          })
          }
          {
            edit !== index?<TableCell>
               <IconButton  size="small" onClick={() => setedit(index)} >
                    <EditIcon  sx={{ "&:hover": { color: "green" } }} fontSize="small"/>
                  </IconButton>
                  &nbsp;
                  
                  <IconButton aria-label="delete" size="small" onClick={() => deleteUser(data._id)}>
                    <DeleteIcon sx={{ "&:hover": { color: "red" } }} fontSize="small"/>
                  </IconButton>
            
          </TableCell>:<><TableCell>
          <IconButton  size="small"  onClick={() => handleCancel()}>
                    <CancelIcon sx={{ "&:hover": { color: "red" } }} fontSize="small"/>
                  </IconButton>
                  &nbsp;
                  <IconButton  size="small"  onClick={() => updateUser(data._id, obj[index])}>
                    <CheckIcon sx={{ "&:hover": { color: "green" } }} fontSize="small"/>
                  </IconButton>
                
              </TableCell>
              <TableCell>
                 
                </TableCell></>
          }
          
          
        </TableRow>
      )
    })
  }

  

  return (
    <><Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: height }}>

        <Box sx={{ minWidth: 200 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow    >
                {ThData()}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {tdData()}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Paper></>
      

  )
}
export default DynamicTable;