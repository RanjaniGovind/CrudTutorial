import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react'
import axios from 'axios'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
 const classes = useStyles();

    function GetTutorial(){
    const[data,setData]=useState([]);

     useEffect(()=>{
      const GetData =async ()=>{
        const result=await axios('https://localhost:44374/Api/Tutorial/GetTut');
        setData(result.data);
      };
      GetData();
    },[]);
  }  

  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Tutorial List</StyledTableCell>
          <StyledTableCell align="right">Title</StyledTableCell>
          <StyledTableCell align="right">Description</StyledTableCell>
          </TableRow>
      </TableHead>
      <TableBody>
        {data.map((R) => (
          <StyledTableRow key={R.id}>
            <StyledTableCell component="th" scope="row">
              {R.id}
            </StyledTableCell>
            <StyledTableCell align="right">{R.Title}</StyledTableCell>
            <StyledTableCell align="right">{R.Description}</StyledTableCell>
            </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}





/* (TableRow);

function createData(id: number, Title: string, Description: string) {
  return { id, Title,Description};
}

const rows = [
  createData(1,'Tutorial#1','Tutorial#1 Description'),
  createData(2,'Tutorial#2','Tutorial#2 Description'),
  createData(3,'Tutorial#3','Tutorial#3 Description'),
  ];
 */

 /*  <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tutorial List</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Title}</StyledTableCell>
              <StyledTableCell align="right">{row.Description}</StyledTableCell>
              </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */