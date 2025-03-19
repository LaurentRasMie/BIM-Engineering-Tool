import React, { useReducer, useState, createContext } from "react";
import { Container, Tabs, Tab, Snackbar, Button, Switch, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress, Typography, AppBar, Toolbar, IconButton, Checkbox } from "@mui/material";
import BuildingsTab from "./components/BuildingsTab";
import RoofsTab from "./components/RoofsTab";
import { calculateElectrical, calculateHVAC, calculatePlumbing, calculateStormwater } from "./utils/calculs";
import { saveProject, loadProject } from "./utils/storage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Chart from "./components/Chart";
import { Autocomplete } from "@react-google-maps/api";
import MenuIcon from "@mui/icons-material/Menu";

// Création du contexte global
const ProjectContext = createContext();

// Réducteur d'état pour gérer les bâtiments et les toitures
const projectReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_BUILDINGS":
      return { ...state, buildings: action.payload };
    case "UPDATE_ROOFS":
      return { ...state, roofs: action.payload };
    case "SET_PROJECT_ADDRESS":
      return { ...state, address: action.payload };
    case "TOGGLE_CERTIFICATIONS":
      return { ...state, certifications: action.payload };
    case "LOAD_PROJECT":
      return action.payload;
    default:
      return state;
  }
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#005A9C", // Bleu Egis
    },
    secondary: {
      main: "#A5ACAF", // Gris clair Egis
    },
    background: {
      default: "#F4F4F4", // Fond gris clair
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
  },
});

const Index = () => {
  const [state, dispatch] = useReducer(projectReducer, {
    buildings: [],
    roofs: [],
    address: "",
    certifications: true,
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [calculResults, setCalculResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const electrical = calculateElectrical(state.buildings, state.certifications);
      const hvac = calculateHVAC(state.buildings, state.certifications);
      const plumbing = calculatePlumbing(state.buildings, state.certifications);
      const stormwater = calculateStormwater(state.buildings, state.certifications);
      
      const totalElectrical = electrical.reduce((sum, val) => sum + val.total, 0);
      const totalHVAC = hvac.reduce((sum, val) => sum + val.total, 0);
      const totalPlumbing = plumbing.reduce((sum, val) => sum + val.total, 0);
      const totalStormwater = stormwater.reduce((sum, val) => sum + val.total, 0);

      setCalculResults({ electrical, hvac, plumbing, stormwater, totalElectrical, totalHVAC, totalPlumbing, totalStormwater });
      setLoading(false);
      setSnackbarOpen(true);
    }, 2000);
  };

  const handleToggleCertifications = () => {
    dispatch({ type: "TOGGLE_CERTIFICATIONS", payload: !state.certifications });
    setSnackbarOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
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
            control={<Checkbox checked={state.certifications} onChange={handleToggleCertifications} />}
            label="Appliquer les certifications environnementales"
          />
          
          <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
            <TextField
              label="Adresse du projet"
              variant="outlined"
              fullWidth
              value={state.address}
              onChange={(e) => dispatch({ type: "SET_PROJECT_ADDRESS", payload: e.target.value })}
            />
          </Autocomplete>

          <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
            <Tab label="Bâtiments" />
            <Tab label="Toitures" />
            <Tab label="Gestion des Eaux Pluviales" />
          </Tabs>

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
    </ThemeProvider>
  );
};

export { ProjectContext };
export default Index;
