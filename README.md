# BIM Engineering Tool

Application web pour les calculs techniques du bâtiment, destinée aux bureaux d'études.

## Fonctionnalités

- **Gestion de projet multi-programmes** : gestion de différents types de bâtiments dans un même projet
- **Calculs réglementaires** : conformité avec NF C 15-100, DTU et RE2020
- **Dimensionnement** : locaux techniques, gaines, bilans de puissance, PAC
- **Calculs d'eaux pluviales** : dimensionnement des systèmes EP selon règlementation
- **Génération de rapports** : export en JSON, CSV, PDF

## Domaines d'expertise couverts

- Électricité
- CVC (Chauffage, Ventilation, Climatisation)
- Plomberie
- Eaux pluviales

## Comment utiliser

1. Complétez les informations générales du projet
2. Ajoutez les bâtiments concernés 
3. Ajoutez les toitures pour les calculs d'eaux pluviales
4. Effectuez les calculs techniques
5. Générez un rapport complet
6. Exportez les résultats dans le format souhaité

## Développement

### Prérequis

- Node.js 14.x ou supérieur
- npm ou yarn

### Installation

```bash
# Cloner ce dépôt
git clone https://github.com/votre-nom/bim-engineering-tool.git

# Accéder au répertoire
cd bim-engineering-tool

# Installer les dépendances
npm install
# ou
yarn install

# Lancer le serveur de développement
npm run dev
# ou
yarn dev
```

L'application sera disponible à l'adresse : [http://localhost:3000](http://localhost:3000)

### Déploiement

Cette application est conçue pour être déployée sur Vercel. Pour déployer votre propre instance :

1. Créez un compte sur [Vercel](https://vercel.com)
2. Connectez votre dépôt GitHub
3. Importez le projet
4. Vercel déploiera automatiquement l'application

## Licence

[MIT](LICENSE)