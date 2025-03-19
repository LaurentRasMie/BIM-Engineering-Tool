// App.js - Composant principal de l'application React
import React, { useReducer, useState, createContext } from "react";
import { Container, Tabs, Tab, Snackbar, Button, Switch, FormControlLabel, CircularProgress, Typography, AppBar, Toolbar, IconButton, Checkbox } from "@mui/material";
import BuildingsTab from "./components/BuildingsTab";
import RoofsTab from "./components/RoofsTab";
import { calculateElectrical, calculateHVAC, calculatePlumbing, calculateStormwater } from "./utils/calculs";
import { saveProject, loadProject } from "./utils/storage";
import MenuIcon from "@mui/icons-material/Menu";

// Création du contexte global
const ProjectContext = createContext();

const projectReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_BUILDINGS":
      return { ...state, buildings: action.payload };
    case "UPDATE_ROOFS":
      return { ...state, roofs: action.payload };
    case "TOGGLE_CERTIFICATIONS":
      return { ...state, certifications: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(projectReducer, {
    buildings: [],
    roofs: [],
    certifications: true,
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [calculResults, setCalculResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const electrical = calculateElectrical(state.buildings, state.certifications);
      const hvac = calculateHVAC(state.buildings, state.certifications);
      const plumbing = calculatePlumbing(state.buildings, state.certifications);
      const stormwater = calculateStormwater(state.buildings, state.certifications);

      setCalculResults({ electrical, hvac, plumbing, stormwater });
      setLoading(false);
      setSnackbarOpen(true);
    }, 2000);
  };

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Egis - Gestion de Projet</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
          label="Mode Sombre"
        />
        <FormControlLabel
          control={<Checkbox checked={state.certifications} onChange={() => dispatch({ type: "TOGGLE_CERTIFICATIONS", payload: !state.certifications })} />}
          label="Appliquer les certifications environnementales"
        />

        <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
          <Tab label="Bâtiments" />
          <Tab label="Toitures" />
        </Tabs>

        {tabIndex === 0 && <BuildingsTab />}
        {tabIndex === 1 && <RoofsTab />}

        {loading && <CircularProgress />}

        <Button onClick={handleCalculate} variant="contained" color="primary" style={{ marginTop: "20px" }}>
          Calculer
        </Button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          message={loading ? "Mise à jour des calculs en cours..." : "Opération réalisée avec succès"}
          onClose={() => setSnackbarOpen(false)}
        />

        <Typography variant="body2" align="center" style={{ marginTop: "20px", color: "#666" }}>
          © {new Date().getFullYear()} Développé par Laurent RAMI
        </Typography>
      </Container>
    </ProjectContext.Provider>
  );
};

export { ProjectContext };
export default App;
