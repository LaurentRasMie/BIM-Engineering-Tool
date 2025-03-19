// RoofsTab.js - Composant pour gérer les toitures
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useContext } from "react";
import { ProjectContext } from "../App";

const RoofsTab = () => {
  const { state, dispatch } = useContext(ProjectContext);

  const addRoof = () => {
    const newRoof = { name: `Toiture ${state.roofs.length + 1}`, area: 0 };
    dispatch({ type: "UPDATE_ROOFS", payload: [...state.roofs, newRoof] });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Surface (m²)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.roofs.map((roof, index) => (
            <TableRow key={index}>
              <TableCell>{roof.name}</TableCell>
              <TableCell>{roof.area}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={addRoof} variant="contained" color="primary" style={{ marginTop: "10px" }}>
        Ajouter une Toiture
      </Button>
    </TableContainer>
  );
};

export default RoofsTab;
