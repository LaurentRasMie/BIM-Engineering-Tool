import { useState } from 'react';
import Head from 'next/head';
import {
  Container, Tabs, Tab, Box, Typography, AppBar, Toolbar,
  TextField, Button, FormControl, InputLabel, Select, MenuItem,
  Checkbox, FormControlLabel, Paper, Grid, Card, CardContent
} from '@mui/material';

// Définition des composants pour les différents onglets
function ProjectTab({ projectData, setProjectData }) {
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [climateZone, setClimateZone] = useState('');

  const validateAddress = () => {
    // Simulation de validation d'adresse
    setPostalCode('75001');
    setDepartmentCode('75');
    setClimateZone('H1c');
    alert(`Adresse validée! Zone climatique: H1c`);
  };

  const saveProjectData = () => {
    const newData = {
      ...projectData,
      name: projectData.name,
      address: {
        full_address: address,
        postal_code: postalCode,
        department_code: departmentCode
      },
      climate_zone: climateZone,
      altitude: projectData.altitude,
      rainfall_intensity: projectData.rainfall_intensity,
      rainfall_return_period: projectData.rainfall_return_period,
      certifications: projectData.certifications
    };
    setProjectData(newData);
    alert('Données du projet enregistrées avec succès!');
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>Informations du projet</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nom du projet"
            value={projectData.name}
            onChange={(e) => setProjectData({...projectData, name: e.target.value})}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button 
            variant="contained" 
            onClick={validateAddress}
            style={{ height: '100%' }}
          >
            Valider
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Code postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Département"
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Zone climatique"
            value={climateZone}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Altitude (m)"
            type="number"
            value={projectData.altitude}
            onChange={(e) => setProjectData({...projectData, altitude: parseInt(e.target.value) || 0})}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Intensité pluviométrique (mm/min)"
            type="number"
            value={projectData.rainfall_intensity / 10}
            onChange={(e) => setProjectData({...projectData, rainfall_intensity: (parseFloat(e.target.value) || 0) * 10})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Période de retour (ans)"
            type="number"
            value={projectData.rainfall_return_period}
            onChange={(e) => setProjectData({...projectData, rainfall_return_period: parseInt(e.target.value) || 5})}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>Certifications visées</Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={projectData.certifications.includes('RE2020')}
                onChange={(e) => {
                  const newCerts = e.target.checked 
                    ? [...projectData.certifications, 'RE2020']
                    : projectData.certifications.filter(c => c !== 'RE2020');
                  setProjectData({...projectData, certifications: newCerts});
                }}
              />
            }
            label="RE2020"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={projectData.certifications.includes('NF Habitat')}
                onChange={(e) => {
                  const newCerts = e.target.checked 
                    ? [...projectData.certifications, 'NF Habitat']
                    : projectData.certifications.filter(c => c !== 'NF Habitat');
                  setProjectData({...projectData, certifications: newCerts});
                }}
              />
            }
            label="NF Habitat"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={projectData.certifications.includes('NF Habitat HQE')}
                onChange={(e) => {
                  const newCerts = e.target.checked 
                    ? [...projectData.certifications, 'NF Habitat HQE']
                    : projectData.certifications.filter(c => c !== 'NF Habitat HQE');
                  setProjectData({...projectData, certifications: newCerts});
                }}
              />
            }
            label="NF Habitat HQE"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={projectData.certifications.includes('Effinergie+')}
                onChange={(e) => {
                  const newCerts = e.target.checked 
                    ? [...projectData.certifications, 'Effinergie+']
                    : projectData.certifications.filter(c => c !== 'Effinergie+');
                  setProjectData({...projectData, certifications: newCerts});
                }}
              />
            }
            label="Effinergie+"
          />
        </Grid>
      </Grid>
      
      <Button 
        variant="contained" 
        color="primary"
        onClick={saveProjectData}
        style={{ marginTop: 20 }}
      >
        Enregistrer les informations du projet
      </Button>
    </Box>
  );
}

function BuildingsTab({ buildings, setBuildings }) {
  const [newBuilding, setNewBuilding] = useState({
    name: `Bâtiment ${buildings.length + 1}`,
    type: 'Résidentiel',
    area: 1000,
    units: 1,
    occupants: 0
  });

  const addBuilding = () => {
    setBuildings([...buildings, {...newBuilding}]);
    setNewBuilding({
      name: `Bâtiment ${buildings.length + 2}`,
      type: 'Résidentiel',
      area: 1000,
      units: 1,
      occupants: 0
    });
    alert(`Bâtiment ${newBuilding.name} ajouté avec succès!`);
  };

  const deleteBuilding = (index) => {
    if (confirm(`Voulez-vous vraiment supprimer ${buildings[index].name}?`)) {
      const newBuildings = [...buildings];
      newBuildings.splice(index, 1);
      setBuildings(newBuildings);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>Bâtiments du projet</Typography>
      
      {buildings.map((building, index) => (
        <Paper key={index} style={{ padding: 16, marginBottom: 16 }}>
          <Typography variant="subtitle1">
            {building.name} ({building.type}) - {building.area} m²
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="body2">Type: {building.type}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">Surface: {building.area} m²</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">Unités: {building.units}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">Occupants: {building.occupants}</Typography>
            </Grid>
          </Grid>
          <Button 
            variant="outlined" 
            color="secondary" 
            size="small"
            onClick={() => deleteBuilding(index)}
            style={{ marginTop: 8 }}
          >
            Supprimer
          </Button>
        </Paper>
      ))}

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>Ajouter un bâtiment</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nom"
            value={newBuilding.name}
            onChange={(e) => setNewBuilding({...newBuilding, name: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={newBuilding.type}
              onChange={(e) => setNewBuilding({...newBuilding, type: e.target.value})}
              label="Type"
            >
              <MenuItem value="Résidentiel">Résidentiel</MenuItem>
              <MenuItem value="Bureau">Bureau</MenuItem>
              <MenuItem value="Commerce">Commerce</MenuItem>
              <MenuItem value="Restauration">Restauration</MenuItem>
              <MenuItem value="Hôtellerie">Hôtellerie</MenuItem>
              <MenuItem value="Enseignement">Enseignement</MenuItem>
              <MenuItem value="Santé">Santé</MenuItem>
              <MenuItem value="Data Center">Data Center</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Surface (m²)"
            type="number"
            value={newBuilding.area}
            onChange={(e) => setNewBuilding({...newBuilding, area: parseInt(e.target.value) || 0})}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Nombre d'unités/logements"
            type="number"
            value={newBuilding.units}
            onChange={(e) => setNewBuilding({...newBuilding, units: parseInt(e.target.value) || 1})}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Nombre d'occupants (0 = auto)"
            type="number"
            value={newBuilding.occupants}
            onChange={(e) => setNewBuilding({...newBuilding, occupants: parseInt(e.target.value) || 0})}
          />
        </Grid>
      </Grid>

      <Button 
        variant="contained" 
        color="primary"
        onClick={addBuilding}
        style={{ marginTop: 20 }}
      >
        Ajouter ce bâtiment
      </Button>
    </Box>
  );
}

function RoofsTab({ roofs, setRoofs }) {
  const [newRoof, setNewRoof] = useState({
    type: 'Terrasse',
    area: 500,
    runoff_coefficient: 1.0
  });

  const addRoof = () => {
    setRoofs([...roofs, {...newRoof}]);
    alert(`Toiture ${newRoof.type} ajoutée avec succès!`);
  };

  const deleteRoof = (index) => {
    if (confirm(`Voulez-vous vraiment supprimer cette toiture ${roofs[index].type}?`)) {
      const newRoofs = [...roofs];
      newRoofs.splice(index, 1);
      setRoofs(newRoofs);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>Toitures du projet</Typography>
      
      {roofs.map((roof, index) => (
        <Paper key={index} style={{ padding: 16, marginBottom: 16 }}>
          <Typography variant="subtitle1">
            Toiture {index + 1} - {roof.type} - {roof.area} m²
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body2">Type: {roof.type}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">Surface: {roof.area} m²</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">Coefficient: {roof.runoff_coefficient}</Typography>
            </Grid>
          </Grid>
          <Button 
            variant="outlined" 
            color="secondary" 
            size="small"
            onClick={() => deleteRoof(index)}
            style={{ marginTop: 8 }}
          >
            Supprimer
          </Button>
        </Paper>
      ))}

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>Ajouter une toiture</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={newRoof.type}
              onChange={(e) => setNewRoof({...newRoof, type: e.target.value})}
              label="Type"
            >
              <MenuItem value="Terrasse">Terrasse</MenuItem>
              <MenuItem value="Inclinée">Inclinée</MenuItem>
              <MenuItem value="Végétalisée">Végétalisée</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Surface (m²)"
            type="number"
            value={newRoof.area}
            onChange={(e) => setNewRoof({...newRoof, area: parseInt(e.target.value) || 0})}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Coefficient de ruissellement"
            type="number"
            inputProps={{ step: 0.1, min: 0.1, max: 1.0 }}
            value={newRoof.runoff_coefficient}
            onChange={(e) => setNewRoof({...newRoof, runoff_coefficient: parseFloat(e.target.value) || 1.0})}
          />
        </Grid>
      </Grid>

      <Button 
        variant="contained" 
        color="primary"
        onClick={addRoof}
        style={{ marginTop: 20 }}
      >
        Ajouter cette toiture
      </Button>
    </Box>
  );
}

function CalculationsTab({ projectData, buildings, roofs, results, setResults }) {
  const [activeCalcTab, setActiveCalcTab] = useState(0);
  
  const calculateElectrical = () => {
    if (buildings.length === 0) {
      alert("Veuillez ajouter au moins un bâtiment.");
      return;
    }
    
    // Simulation des calculs électriques
    let totalPower = 0;
    const buildingPowers = buildings.map(building => {
      const specificPower = building.type === "Résidentiel" ? 97 : 
                           building.type === "Bureau" ? 167 : 
                           building.type === "Commerce" ? 185 : 140;
      
      const rawPower = specificPower * building.area / 1000;
      const simultaneity = building.type === "Résidentiel" ? 0.8 : 0.7;
      const power = rawPower * simultaneity;
      
      totalPower += power;
      
      return {
        name: building.name,
        type: building.type,
        area: building.area,
        raw_power: rawPower,
        simultaneity: simultaneity,
        power: power
      };
    });
    
    const totalPowerWithMargin = totalPower * 1.2;
    const tgbtSize = Math.max(8, 5 + totalPowerWithMargin/100);
    const electricalShaftSize = 0.6 + totalPowerWithMargin/200;
    
    const electricalResults = {
      buildings: buildingPowers,
      total_power: totalPower,
      total_power_with_margin: totalPowerWithMargin,
      TGBT_size: tgbtSize,
      TGBT_height: 2.5,
      electrical_shaft_size: electricalShaftSize
    };
    
    setResults({...results, electrical: electricalResults});
    alert("Calcul électrique terminé!");
  };
  
  const calculateHVAC = () => {
    if (buildings.length === 0) {
      alert("Veuillez ajouter au moins un bâtiment.");
      return;
    }
    
    // Simulation des calculs CVC
    const climateZone = projectData.climate_zone || "H1c";
    const altitude = projectData.altitude || 0;
    
    // Facteurs correctifs
    const zoneFactors = {
      "H1a": 1.2, "H1b": 1.15, "H1c": 1.1,
      "H2a": 1.05, "H2b": 1.0, "H2c": 0.95, "H2d": 0.9,
      "H3": 0.85
    };
    const zoneFactor = zoneFactors[climateZone] || 1.0;
    const altitudeFactor = 1 + (altitude / 1000) * 0.1;
    
    let totalHeatingPower = 0;
    let totalCoolingPower = 0;
    let totalVentilationFlow = 0;
    
    const buildingHVAC = buildings.map(building => {
      const heatingNeeds = building.type === "Résidentiel" ? 40 :
                          building.type === "Bureau" ? 35 :
                          building.type === "Commerce" ? 30 : 45;
      
      const coolingNeeds = building.type === "Résidentiel" ? 30 :
                          building.type === "Bureau" ? 80 :
                          building.type === "Commerce" ? 100 : 70;
      
      const heatingPower = heatingNeeds * building.area * zoneFactor * altitudeFactor / 1000;
      const coolingPower = coolingNeeds * building.area / 1000;
      
      const nbOccupants = building.occupants > 0 ? building.occupants : building.area/20;
      const ventilationFlow = 25 * nbOccupants;
      
      totalHeatingPower += heatingPower;
      totalCoolingPower += coolingPower;
      totalVentilationFlow += ventilationFlow;
      
      return {
        name: building.name,
        type: building.type,
        area: building.area,
        heating_power: heatingPower,
        cooling_power: coolingPower,
        ventilation_flow: ventilationFlow
      };
    });
    
    const heatPumpPower = totalHeatingPower * 0.8;
    const boilerRoomSize = Math.max(12, 10 + totalHeatingPower/50);
    const ctaRoomSize = Math.max(10, 8 + totalVentilationFlow/2000);
    const hvacShaftSize = 0.8 + totalVentilationFlow/5000;
    
    const hvacResults = {
      buildings: buildingHVAC,
      total_heating_power: totalHeatingPower,
      total_cooling_power: totalCoolingPower,
      total_ventilation_flow: totalVentilationFlow,
      heat_pump_power: heatPumpPower,
      boiler_room_size: boilerRoomSize,
      cta_room_size: ctaRoomSize,
      hvac_shaft_size: hvacShaftSize
    };
    
    setResults({...results, hvac: hvacResults});
    alert("Calcul CVC terminé!");
  };
  
  const calculatePlumbing = () => {
    if (buildings.length === 0) {
      alert("Veuillez ajouter au moins un bâtiment.");
      return;
    }
    
    // Simulation des calculs plomberie
    let totalColdWaterFlow = 0;
    let totalHotWaterFlow = 0;
    let totalHotWaterProduction = 0;
    let totalUnits = 0;
    
    const buildingPlumbing = buildings.map(building => {
      const nbOccupants = building.occupants > 0 ? building.occupants : building.area/20;
      
      const coldWaterFlow = 0.1 * Math.sqrt(nbOccupants);
      const hotWaterFlow = coldWaterFlow * 0.6;
      
      const hotWaterProductionPerPerson = building.type === "Résidentiel" ? 50 :
                                         building.type === "Bureau" ? 5 :
                                         building.type === "Commerce" ? 5 : 30;
      
      const hotWaterProduction = hotWaterProductionPerPerson * nbOccupants;
      
      totalColdWaterFlow += coldWaterFlow;
      totalHotWaterFlow += hotWaterFlow;
      totalHotWaterProduction += hotWaterProduction;
      totalUnits += building.units;
      
      return {
        name: building.name,
        type: building.type,
        units: building.units,
        occupants: nbOccupants,
        cold_water_flow: coldWaterFlow,
        hot_water_flow: hotWaterFlow,
        hot_water_production: hotWaterProduction
      };
    });
    
    const mainPipeDiameter = 10 * Math.sqrt(totalColdWaterFlow * 1000);
    const hotWaterTankVolume = totalHotWaterProduction / 3 * 1.5;
    const hotWaterPower = totalHotWaterFlow * 35 * 4.18;
    const plumbingShaftSize = 0.4 + totalUnits * 0.04;
    
    const plumbingResults = {
      buildings: buildingPlumbing,
      total_cold_water_flow: totalColdWaterFlow,
      total_hot_water_flow: totalHotWaterFlow,
      total_hot_water_production: totalHotWaterProduction,
      main_pipe_diameter: mainPipeDiameter,
      hot_water_tank_volume: hotWaterTankVolume,
      hot_water_power: hotWaterPower,
      plumbing_shaft_size: plumbingShaftSize
    };
    
    setResults({...results, plumbing: plumbingResults});
    alert("Calcul plomberie terminé!");
  };
  
  const calculateRainwater = () => {
    if (roofs.length === 0) {
      alert("Veuillez ajouter au moins une toiture.");
      return;
    }
    
    // Simulation des calculs eaux pluviales
    const region = "Ile-de-France";
    const a = 6.7; // Coefficient Montana a
    const b = -0.6; // Coefficient Montana b
    const returnPeriod = projectData.rainfall_return_period || 10;
    
    let totalRoofArea = 0;
    let totalFlow = 0;
    let rainDownpipes = 0;
    
    const roofDetails = roofs.map(roof => {
      const durationMin = 6;
      const intensity = a * Math.pow(durationMin, b) * (1 + 0.1 * (returnPeriod / 10)) / 60;
      
      const flow = roof.area * intensity * roof.runoff_coefficient;
      const nbDownpipes = Math.ceil(roof.area / 100);
      
      totalRoofArea += roof.area;
      totalFlow += flow;
      rainDownpipes += nbDownpipes;
      
      return {
        type: roof.type,
        area: roof.area,
        runoff_coefficient: roof.runoff_coefficient,
        flow: flow,
        nb_downpipes: nbDownpipes
      };
    });
    
    const retentionVolume = 60 * a * totalRoofArea * Math.pow(returnPeriod, (1-b)) * b/(1-b) * 0.001;
    const mainCollectorDiameter = 35 * Math.sqrt(totalFlow);
    
    const rainwaterResults = {
      roofs: roofDetails,
      total_roof_area: totalRoofArea,
      total_flow: totalFlow,
      retention_volume: retentionVolume,
      main_collector_diameter: mainCollectorDiameter,
      rain_downpipes: rainDownpipes
    };
    
    setResults({...results, rainwater: rainwaterResults});
    alert("Calcul eaux pluviales terminé!");
  };
  
  const calculateAll = () => {
    calculateElectrical();
    calculateHVAC();
    calculatePlumbing();
    if (roofs.length > 0) {
      calculateRainwater();
    }
  };

  return (
    <Box p={3}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeCalcTab} onChange={(e, newValue) => setActiveCalcTab(newValue)}>
          <Tab label="Électricité" />
          <Tab label="CVC" />
          <Tab label="Plomberie" />
          <Tab label="Eaux pluviales" />
        </Tabs>
      </Box>

      {/* Électricité */}
      <Box hidden={activeCalcTab !== 0}>
        <Button variant="contained" color="primary" onClick={calculateElectrical}>
          Calculer bilan électrique
        </Button>
        
        {results.electrical && (
          <Box mt={3}>
            <Typography variant="h6">Résultats électriques</Typography>
            <Typography variant="body1" gutterBottom>
              Puissance totale: {results.electrical.total_power.toFixed(2)} kVA
            </Typography>
            <Typography variant="body1" gutterBottom>
              Puissance avec marge: {results.electrical.total_power_with_margin.toFixed(2)} kVA
            </Typography>
            <Typography variant="body1" gutterBottom>
              Taille TGBT: {results.electrical.TGBT_size.toFixed(1)} m²
            </Typography>
            <Typography variant="body1" gutterBottom>
              Gaine technique: {results.electrical.electrical_shaft_size.toFixed(2)} m²
            </Typography>
          </Box>
        )}
      </Box>

      {/* CVC */}
      <Box hidden={activeCalcTab !== 1}>
        <Button variant="contained" color="primary" onClick={calculateHVAC}>
          Calculer besoins CVC
        </Button>
        
        {results.hvac && (
          <Box mt={3}>
            <Typography variant="h6">Résultats CVC</Typography>
            <Typography variant="body1" gutterBottom>
              Puissance chauffage: {results.hvac.total_heating_power.toFixed(2)} kW
            </Typography>
            <Typography variant="body1" gutterBottom>
              Puissance refroidissement: {results.hvac.total_cooling_power.toFixed(2)} kW
            </Typography>
            <Typography variant="body1" gutterBottom>
              Débit ventilation: {results.hvac.total_ventilation_flow.toFixed(0)} m³/h
            </Typography>
            <Typography variant="body1" gutterBottom>
              Puissance PAC: {results.hvac.heat_pump_power.toFixed(2)} kW
            </Typography>
            <Typography variant="body1" gutterBottom>
              Taille chaufferie: {results.hvac.boiler_room_size.toFixed(1)} m²
            </Typography>
            <Typography variant="body1" gutterBottom>
              Taille CTA: {results.hvac.cta_room_size.toFixed(1)} m²
            </Typography>
            <Typography variant="body1" gutterBottom>
              Gaine technique: {results.hvac.hvac_shaft_size.toFixed(2)} m²
            </Typography>
          </Box>
        )}
      </Box>

      {/* Plomberie */}
      <Box hidden={activeCalcTab !== 2}>
        <Button variant="contained" color="primary" onClick={calculatePlumbing}>
          Calculer besoins plomberie
        </Button>
        
        {results.plumbing && (
          <Box mt={3}>
            <Typography variant="h6">Résultats plomberie</Typography>
            <Typography variant="body1" gutterBottom>
              Débit EF: {results.plumbing.total_cold_water_flow.toFixed(2)} L/s
            </Typography>
            <Typography variant="body1" gutterBottom>
              Débit ECS: {results.plumbing.total_hot_water_flow.toFixed(2)} L/s
            </Typography>
            <Typography variant="body1" gutterBottom>
              Production ECS: {results.plumbing.total_hot_water_production.toFixed(0)} L/jour
            </Typography>
            <Typography variant="body1" gutterBottom>
              Diamètre collecteur: {results.plumbing.main_pipe_diameter.toFixed(0)} mm
            </Typography>
            <Typography variant="body1" gutterBottom>
              Volume ballon ECS: {results.plumbing.hot_water_tank_volume.toFixed(0)} L
            </Typography>
            <Typography variant="body1" gutterBottom>
              Gaine technique: {results.plumbing.plumbing_shaft_size.toFixed(2)} m²
            </Typography>
          </Box>
        )}
      </Box>

      {/* Eaux pluviales */}
      <Box hidden={activeCalcTab !== 3}>
        <Button variant="contained" color="primary" onClick={calculateRainwater}>
          Calculer système EP
        </Button>
        
        {results.rainwater && (
          <Box mt={3}>
            <Typography variant="h6">Résultats eaux pluviales</Typography>
            <Typography variant="body1" gutterBottom>
              Surface toiture: {results.rainwater.total_roof_area.toFixed(0)} m²
            </Typography>
            <Typography variant="body1" gutterBottom>
              Débit EP: {results.rainwater.total_flow.toFixed(2)} L/s
            </Typography>
            <Typography variant="body1" gutterBottom>
              Volume rétention: {results.rainwater.retention_volume.toFixed(1)} m³
            </Typography>
            <Typography variant="body1" gutterBottom>
              Diamètre collecteur: {results.rainwater.main_collector_diameter.toFixed(0)} mm
            </Typography>
            <Typography variant="body1" gutterBottom>
              Nombre descentes: {results.rainwater.rain_downpipes}
            </Typography>
          </Box>
        )}
      </Box>

      <Button 
        variant="contained" 
        color="primary"
        onClick={calculateAll}
        style={{ marginTop: 20 }}
      >
        Calculer tout
      </Button>
    </Box>
  );
}

function ReportTab({ projectData, buildings, roofs, results, setReport }) {
  const [reportContent, setReportContent] = useState('');
  const [report, setReportState] = useState(null);

  const generateReport = () => {
    if (buildings.length === 0) {
      alert("Veuillez ajouter au moins un bâtiment.");
      return;
    }
    
    // Vérifier si les calculs ont été effectués
    if (!results.electrical || !results.hvac || !results.plumbing) {
      alert("Veuillez effectuer tous les calculs avant de générer le rapport.");
      return;
    }
    
    const newReport = {
      project_info: {
        name: projectData.name,
        address: projectData.address,
        climate_zone: projectData.climate_zone,
        date: new Date().toLocaleDateString('fr-FR')
      },
      summary: {
        electrical_power: results.electrical.total_power_with_margin,
        heating_power: results.hvac.total_heating_power,
        cooling_power: results.hvac.total_cooling_power,
        ventilation_flow: results.hvac.total_ventilation_flow,
        water_flow: results.plumbing.total_cold_water_flow,
        rainwater_volume: results.rainwater ? results.rainwater.retention_volume : 0,
      },
      technical_rooms: {
        TGBT: results.electrical.TGBT_size,
        CTA: results.hvac.cta_room_size,
        boiler_room: results.hvac.boiler_room_size,
      },
      technical_shafts: {
        electrical: results.electrical.electrical_shaft_size,
        hvac: results.hvac.hvac_shaft_size,
        plumbing: results.plumbing.plumbing_shaft_size,
      }
    };
    
    setReportState(newReport);
    setReport(newReport);
    
    const reportText = `
RAPPORT TECHNIQUE
================

Projet: ${newReport.project_info.name}
Date: ${newReport.project_info.date}
${newReport.project_info.address.full_address ? `Adresse: ${newReport.project_info.address.full_address}` : ''}
Zone climatique: ${newReport.project_info.climate_zone}

SYNTHÈSE DES RÉSULTATS
=====================

Électricité:
- Puissance totale: ${newReport.summary.electrical_power.toFixed(1)} kVA

CVC:
- Puissance chauffage: ${newReport.summary.heating_power.toFixed(1)} kW
- Puissance refroidissement: ${newReport.summary.cooling_power.toFixed(1)} kW
- Débit ventilation: ${newReport.summary.ventilation_flow.toFixed(0)} m³/h

Plomberie:
- Débit EF: ${newReport.summary.water_flow.toFixed(2)} L/s

${newReport.summary.rainwater_volume > 0 ? `
Eaux pluviales:
- Volume de rétention: ${newReport.summary.rainwater_volume.toFixed(1)} m³
` : ''}

DIMENSIONNEMENT DES LOCAUX TECHNIQUES
===================================

- Local TGBT: ${newReport.technical_rooms.TGBT.toFixed(1)} m²
- Local CTA: ${newReport.technical_rooms.CTA.toFixed(1)} m²
- Chaufferie: ${newReport.technical_rooms.boiler_room.toFixed(1)} m²

DIMENSIONNEMENT DES GAINES TECHNIQUES
===================================

- Gaine électrique: ${newReport.technical_shafts.electrical.toFixed(2)} m²
- Gaine CVC: ${newReport.technical_shafts.hvac.toFixed(2)} m²
- Gaine plomberie: ${newReport.technical_shafts.plumbing.toFixed(2)} m²
    `;
    
    setReportContent(reportText);
    alert("Rapport généré avec succès!");
  };

  const exportJSON = () => {
    if (!reportContent) {
      alert("Veuillez d'abord générer un rapport.");
      return;
    }
    
    // Créer un objet blob
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Créer un lien de téléchargement
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectData.name.replace(/ /g, '_')}_rapport.json`;
    document.body.appendChild(a);
    a.click();
    
    // Nettoyer
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  const exportCSV = () => {
    if (!reportContent) {
      alert("Veuillez d'abord générer un rapport.");
      return;
    }
    
    // Créer les données CSV
    const header = "Projet,Date,Zone_climatique,Puissance_électrique_kVA,Puissance_chauffage_kW,Puissance_refroidissement_kW,Débit_ventilation_m3h,Débit_eau_Ls,Volume_rétention_m3,TGBT_m2,CTA_m2,Chaufferie_m2\n";
    
    const row = [
      report.project_info.name,
      report.project_info.date,
      report.project_info.climate_zone,
      report.summary.electrical_power.toFixed(2),
      report.summary.heating_power.toFixed(2),
      report.summary.cooling_power.toFixed(2),
      report.summary.ventilation_flow.toFixed(0),
      report.summary.water_flow.toFixed(2),
      report.summary.rainwater_volume.toFixed(1),
      report.technical_rooms.TGBT.toFixed(1),
      report.technical_rooms.CTA.toFixed(1),
      report.technical_rooms.boiler_room.toFixed(1)
    ].join(';');
    
    const csvContent = header + row;
    
    // Créer un objet blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Créer un lien de téléchargement
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectData.name.replace(/ /g, '_')}_rapport.csv`;
    document.body.appendChild(a);
    a.click();
    
    // Nettoyer
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  const exportPDF = () => {
    alert("Cette fonctionnalité exporterait le rapport en PDF dans la version complète.");
  };

  return (
    <Box p={3}>
      <Button 
        variant="contained" 
        color="primary"
        onClick={generateReport}
      >
        Générer le rapport complet
      </Button>
      
      {reportContent && (
        <>
          <Paper style={{ padding: 16, marginTop: 16, marginBottom: 16 }}>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {reportContent}
            </pre>
          </Paper>
          
          <Typography variant="h6" gutterBottom>Exporter le rapport</Typography>
          <Box display="flex" gap={2}>
            <Button variant="outlined" onClick={exportJSON}>
              Exporter en JSON
            </Button>
            <Button variant="outlined" onClick={exportCSV}>
              Exporter en CSV
            </Button>
            <Button variant="outlined" onClick={exportPDF}>
              Exporter en PDF
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  
  // État de l'application
  const [projectData, setProjectData] = useState({
    name: "Nouveau projet",
    address: {},
    altitude: 0,
    rainfall_intensity: 3.0,
    rainfall_return_period: 10,
    certifications: ["RE2020"]
  });
  
  const [buildings, setBuildings] = useState([]);
  const [roofs, setRoofs] = useState([]);
  const [results, setResults] = useState({});
  const [report, setReport] = useState(null);

  return (
    <div>
      <Head>
        <title>BIM Engineering Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Outil Bureau d'Études Bâtiment
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Projet" />
              <Tab label="Bâtiments" />
              <Tab label="Toitures" />
              <Tab label="Calculs" />
              <Tab label="Rapport" />
            </Tabs>
          </Box>
          
          <Box sx={{ mt: 2 }}>
            {activeTab === 0 && (
              <ProjectTab projectData={projectData} setProjectData={setProjectData} />
            )}
            {activeTab === 1 && (
              <BuildingsTab buildings={buildings} setBuildings={setBuildings} />
            )}
            {activeTab === 2 && (
              <RoofsTab roofs={roofs} setRoofs={setRoofs} />
            )}
            {activeTab === 3 && (
              <CalculationsTab 
                projectData={projectData} 
                buildings={buildings} 
                roofs={roofs}
                results={results}
                setResults={setResults}
              />
            )}
            {activeTab === 4 && (
              <ReportTab 
                projectData={projectData} 
                buildings={buildings}
                roofs={roofs}
                results={results}
                setReport={setReport}
              />
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}