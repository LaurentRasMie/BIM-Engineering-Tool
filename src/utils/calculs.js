// calculs.js - Gestion des calculs de puissance

export const calculateElectrical = (buildings, certifications) => {
  return buildings.map(building => ({
    name: building.name,
    total: building.area * (certifications ? 0.8 : 1.0), // Ajustement si certification activée
  }));
};

export const calculateHVAC = (buildings, certifications) => {
  return buildings.map(building => ({
    name: building.name,
    total: building.area * (certifications ? 0.5 : 0.7),
  }));
};

export const calculatePlumbing = (buildings, certifications) => {
  return buildings.map(building => ({
    name: building.name,
    total: building.area * (certifications ? 0.3 : 0.4),
  }));
};

export const calculateStormwater = (buildings, certifications) => {
  return buildings.map(building => ({
    name: building.name,
    total: building.area * (certifications ? 0.6 : 0.9),
  }));
};
