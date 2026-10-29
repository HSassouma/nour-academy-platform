# Nour Academy — Back-office du secrétariat

**Plateforme de gestion des inscriptions aux cours · Partie 2**

![Statut](https://img.shields.io/badge/statut-frontend%20uniquement-475569)
![Données](https://img.shields.io/badge/donn%C3%A9es-localStorage-0f766e)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-v8-646cff?logo=vite&logoColor=white)

Nour Academy est une application frontend de gestion des inscriptions aux cours. Cette deuxième partie apporte au secrétariat un espace dédié pour consulter les dossiers, suivre leur statut et piloter l'activité à partir d'indicateurs clés.

## Sommaire

- [Présentation du projet](#présentation-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Installation et lancement](#installation-et-lancement)
- [Fonctionnement des données](#fonctionnement-des-données)
- [Tableau de bord KPI](#tableau-de-bord-kpi)
- [Limites actuelles](#limites-actuelles)
- [Ressources du projet](#ressources-du-projet)

## Présentation du projet

Nour Academy accompagne les familles dans la recherche et l'inscription à des cours pour les niveaux **Collège**, **1BAC** et **2BAC**. Ce dépôt correspond à la **partie 2** du projet : le **back-office destiné au secrétariat**.

🎯 **Objectif** — Centraliser la gestion des inscriptions dans une interface unique : consulter les dossiers, rechercher et filtrer les élèves, ajouter ou mettre à jour une inscription, et suivre les principaux indicateurs d'activité.

👥 **Public cible** — L'équipe administrative de Nour Academy, en charge du suivi des dossiers, des statuts et des encaissements.

> Le dépôt contient également l'interface publique développée dans la partie 1. Ce README se concentre sur le back-office et les fichiers qui lui sont associés.

## Fonctionnalités

| Domaine | Fonctionnalité | Détail |
| --- | --- | --- |
| Tableau de bord | Indicateurs KPI | Quatre cartes : nombre total d'inscriptions, recettes encaissées, inscriptions en attente et inscriptions payées. |
| Inscriptions | Liste des dossiers | Tableau avec ID, élève, téléphone, parent, niveau, total mensuel, statut, date et actions. |
| Inscriptions | Ajout | Formulaire modal avec numéro de dossier automatique, sélection du niveau puis du cours correspondant, validation des champs, contrôle des doublons et limite de 15 élèves par groupe. |
| Inscriptions | Modification | Formulaire prérempli pour mettre à jour l'élève, le cours, le parent, le téléphone ou le statut. |
| Inscriptions | Suppression | Suppression d'une inscription depuis sa ligne dans le tableau. |
| Recherche | Recherche instantanée | Recherche par ID, nom de l'élève, nom du parent ou numéro de téléphone. |
| Filtres | Statut | Filtrage par **En attente**, **Validée** ou **Payée**. |
| Tri | Cinq options | ID croissant, date décroissante, date croissante, nom A → Z ou nom Z → A. |
| Pagination | 10 lignes par page | Boutons **Précédent** / **Suivant** et indication de la page courante. |
| Navigation | Deux vues | Vue **Inscriptions** (`#/inscriptions`) et vue **Tableau de bord** (`#/tableau-de-bord`). |
| Retour utilisateur | Messages | Confirmation après ajout ou modification et messages d'erreur associés aux champs. |

## Technologies utilisées

| Technologie | Utilisation dans le projet |
| --- | --- |
| **HTML5** | Structure des vues, des formulaires et du tableau du back-office. |
| **JavaScript (modules ES)** | Logique des inscriptions, validation, filtres, tri, pagination, navigation et calcul des KPI. |
| **Tailwind CSS v4** | Mise en forme de l'interface via le plugin `@tailwindcss/vite`. |
| **Vite 8** | Serveur de développement et build multi-pages du site public et du back-office. |
| **Font Awesome 7.3.1** | Icônes de l'interface, chargées depuis un CDN. |
| **localStorage** | Persistance des inscriptions dans le navigateur. |

Le projet n'utilise ni framework frontend, ni backend, ni API.

## Structure du projet

```text
nour-academy-platform/
├── dashboard/
│   ├── index.html          # Vues Inscriptions et Tableau de bord, formulaires et tableau
│   ├── script.js           # CRUD, filtres, tri, pagination, KPI et navigation
│   ├── components.js       # Template d'une ligne du tableau
│   ├── seeds.js            # 20 inscriptions de démonstration
│   └── style.css           # Import de Tailwind CSS
├── src/
│   ├── assets/
│   │   ├── data.json       # Catalogue de cours au format JSON
│   │   └── logo.png        # Logo du site public
│   ├── components.js       # Templates du site public
│   ├── data.js             # Catalogue FixedData et migration des niveaux
│   ├── main.js             # Logique du site public (partie 1)
│   ├── style.css           # Thème et styles du site public
│   └── validation.js       # Règles de validation partagées
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── dist/                   # Build de production généré par Vite (ignoré par Git)
├── index.html              # Site public (partie 1)
├── package.json
├── package-lock.json
├── vite.config.js          # Configuration Vite multi-pages et Tailwind
├── .gitignore
└── README.md
```

Les dossiers `node_modules/` et `dist/` sont générés localement et exclus du suivi Git par `.gitignore`.

## Installation et lancement

### Prérequis

- **Node.js** `^20.19.0` ou `>=22.12.0` (prérequis de Vite 8)
- **npm**

### Développement local

```bash
npm install
npm run dev
```

Vite affiche l'adresse du serveur dans le terminal, généralement `http://localhost:5173`.

- **Back-office :** `http://localhost:5173/dashboard/`
- **Site public (partie 1) :** `http://localhost:5173/`

Si le port `5173` est déjà utilisé, Vite choisit un autre port : utilisez l'adresse affichée dans le terminal.

### Build de production

```bash
npm run build
npm run preview
```

Le build est généré dans `dist/`. Le back-office reste accessible à l'adresse `/dashboard/` du serveur de prévisualisation.

### Scripts disponibles

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Lance le serveur de développement Vite. |
| `npm run build` | Génère le build de production dans `dist/`. |
| `npm run preview` | Prévisualise le build de production. |

Aucune variable d'environnement, base de données ou API externe n'est nécessaire.

## Fonctionnement des données

### Stockage local

Le back-office fonctionne sans backend : les inscriptions sont conservées dans le **localStorage** du navigateur. La clé utilisée est définie dans `dashboard/script.js` :

```js
const STORAGE_KEY = "nourAcademyRegistrations";
```

### Données de démonstration

`dashboard/seeds.js` fournit **20 inscriptions de démonstration**. Elles sont enregistrées dans le localStorage lorsque la clé `nourAcademyRegistrations` est absente ou vide. Si des données existent déjà, elles sont conservées et chargées au démarrage.

La même clé est utilisée par le parcours d'inscription du site public (`src/main.js`), ce qui permet de retrouver dans le back-office les inscriptions enregistrées depuis l'interface publique.

### Cycle de vie des données

| Action | Effet |
| --- | --- |
| Premier chargement | Écriture des données de démonstration si la clé est absente ou vide. |
| Ajout | Ajout de l'inscription à `Data`, puis sauvegarde dans le localStorage. |
| Modification | Mise à jour de l'inscription concernée, puis sauvegarde. |
| Suppression | Retrait de l'inscription de `Data`, puis sauvegarde. |
| Rechargement de la page | Lecture des inscriptions depuis le localStorage. |

Au démarrage, deux normalisations sont également appliquées aux anciennes données : le niveau `Bac` est converti en `2BAC`, et une date d'inscription est ajoutée si elle manque.

Pour réinitialiser le jeu de démonstration, supprimez la clé `nourAcademyRegistrations` dans les DevTools du navigateur (**Application → Local Storage**), puis rechargez la page.

## Tableau de bord KPI

Le tableau de bord est accessible via `#/tableau-de-bord`. Il présente quatre indicateurs calculés à partir de l'ensemble des inscriptions, et non de la page filtrée.

| Indicateur | Calcul | Précision |
| --- | --- | --- |
| **Nombre total d'inscrits** | `Data.length` | Nombre de dossiers d'inscription enregistrés, et non nombre de personnes uniques. |
| **Recettes encaissées** | Somme des `totalMADPerMonth` des inscriptions au statut **Payée** | Affichées en DH dans l'interface. |
| **Inscriptions en attente** | Nombre d'inscriptions au statut **En attente** | Le statut **Validée** n'est pas compté ici. |
| **Inscriptions payées** | Nombre d'inscriptions au statut **Payée** | Correspond aux dossiers dont le paiement est marqué comme reçu. |

Le statut **Validée** est un état intermédiaire : il n'entre ni dans les recettes encaissées, ni dans le compteur des inscriptions payées.

Les KPI sont recalculés par la fonction `actualiserKPI()` au chargement de la page et après chaque **ajout**, **modification** ou **suppression**. La recherche, les filtres, le tri et la pagination ne modifient pas ces totaux.

Avec les données de démonstration initiales : **20 inscriptions**, **6 800 DH de recettes**, **7 inscriptions en attente** et **7 inscriptions payées**.

## Limites actuelles

- **Application frontend uniquement** : aucun backend, API, base de données, authentification ou gestion de rôles.
- **Persistance locale** : les données restent dans le navigateur et le profil courant. Elles ne sont pas synchronisées entre appareils ou navigateurs et peuvent être effacées avec les données du site.
- **Export CSV non implémenté** : le bouton « Exporter CSV » est présent dans l'interface, mais aucun export n'est encore branché.
- **Paiement manuel** : les statuts sont mis à jour à la main ; aucun système de paiement ou de facturation n'est intégré.
- **Un seul cours par formulaire** : l'ajout et la modification enregistrent un cours par inscription, alors que certaines données de démonstration en contiennent plusieurs.
- **Suppression immédiate** : une inscription est supprimée sans demande de confirmation ni possibilité d'annulation.

## Ressources du projet

| Ressource | Lien |
| --- | --- |
| **Maquette Figma** | [Ouvrir la maquette Figma](https://www.figma.com/design/uPqYDGJM7zzQwEZPfxRsx4/Nour-Academy2?node-id=37-2&t=Q6T8X1pAqAJ8T0JZ-1) |
| **Projet Jira** | [Ouvrir le projet Jira](https://hs121.atlassian.net/jira/software/projects/NOUR1/boards/7?filter=&groupBy=none&atlOrigin=eyJpIjoiODBlYmVjNTRjNmI4NDRiNWFjNmFjMTIyOThiODQ5YWQiLCJwIjoiaiJ9) |

> Ces liens renvoient vers des outils externes. Leur contenu n'est pas reproduit dans ce README et peut nécessiter un accès autorisé.
