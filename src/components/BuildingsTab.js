// BuildingsTab.js - Composant pour gérer les bâtiments
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useContext } from "react";
import { ProjectContext } from "../App";

const BuildingsTab = () => {
  const { state, dispatch } = useContext(ProjectContext);

  const addBuilding = () => {
    const newBuilding = { name: `Bâtiment ${state.buildings.length + 1}`, area: 0 };
    dispatch({ type: "UPDATE_BUILDINGS", payload: [...state.buildings, newBuilding] });
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
          {state.buildings.map((building, index) => (
            <TableRow key={index}>
              <TableCell>{building.name}</TableCell>
              <TableCell>{building.area}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={addBuilding} variant="contained" color="primary" style={{ marginTop: "10px" }}>
        Ajouter un Bâtiment
      </Button>
    </TableContainer>
  );
};

export default BuildingsTab;
