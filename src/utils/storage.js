// storage.js - Gestion du stockage des données du projet

export const saveProject = (projectData) => {
  localStorage.setItem("projectData", JSON.stringify(projectData));
};

export const loadProject = () => {
  const data = localStorage.getItem("projectData");
  return data ? JSON.parse(data) : { buildings: [], roofs: [], certifications: true };
};
