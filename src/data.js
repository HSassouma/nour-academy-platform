// Catalogue des cours : source unique des niveaux et des cours du site.
// 3 niveaux x 4 cours = 12 cours, avec des identifiants uniques.
export const FixedData = [
  {
    "id": 1,
    "subject": "Initiation à l'analyse et aux bases de données",
    "category": "Informatique",
    "level": "Collège",
    "days": ["Lun.", "Mer."],
    "startTime": "17:00",
    "endTime": "18:30",
    "teacher": "M. Youssef",
    "room": "Salle 5",
    "minAge": 11,
    "maxAge": 15,
    "availablePlaces": 6,
    "price": 350,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 2,
    "subject": "Mathématiques",
    "category": "Maths",
    "level": "Collège",
    "days": ["Lun.", "Mer."],
    "startTime": "17:00",
    "endTime": "18:30",
    "teacher": "M. Alaoui",
    "room": "Salle 2",
    "minAge": 11,
    "maxAge": 15,
    "availablePlaces": 5,
    "price": 400,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 3,
    "subject": "Français",
    "category": "Français",
    "level": "Collège",
    "days": ["Lun.", "Jeu."],
    "startTime": "18:00",
    "endTime": "19:30",
    "teacher": "Mme. Nadia",
    "room": "Salle 1",
    "minAge": 11,
    "maxAge": 15,
    "availablePlaces": 4,
    "price": 350,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 4,
    "subject": "Anglais",
    "category": "Anglais",
    "level": "Collège",
    "days": ["Mer.", "Ven."],
    "startTime": "16:00",
    "endTime": "17:30",
    "teacher": "M. Karim",
    "room": "Salle 4",
    "minAge": 11,
    "maxAge": 15,
    "availablePlaces": 7,
    "price": 350,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 5,
    "subject": "Analyse et conception des bases de données",
    "category": "Informatique",
    "level": "1BAC",
    "days": ["Lun.", "Mer."],
    "startTime": "18:00",
    "endTime": "19:30",
    "teacher": "M. Youssef",
    "room": "Salle 5",
    "minAge": 15,
    "maxAge": 17,
    "availablePlaces": 6,
    "price": 450,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 6,
    "subject": "Mathématiques",
    "category": "Maths",
    "level": "1BAC",
    "days": ["Mar.", "Ven."],
    "startTime": "17:00",
    "endTime": "19:00",
    "teacher": "M. Alaoui",
    "room": "Salle 2",
    "minAge": 15,
    "maxAge": 17,
    "availablePlaces": 5,
    "price": 500,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 7,
    "subject": "Physique-Chimie",
    "category": "Physique",
    "level": "1BAC",
    "days": ["Lun.", "Mer."],
    "startTime": "18:00",
    "endTime": "20:00",
    "teacher": "Mme. Benali",
    "room": "Salle 3",
    "minAge": 15,
    "maxAge": 17,
    "availablePlaces": 5,
    "price": 500,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 8,
    "subject": "Français",
    "category": "Français",
    "level": "1BAC",
    "days": ["Mar.", "Jeu."],
    "startTime": "17:30",
    "endTime": "19:00",
    "teacher": "Mme. Nadia",
    "room": "Salle 1",
    "minAge": 15,
    "maxAge": 17,
    "availablePlaces": 6,
    "price": 400,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 9,
    "subject": "Analyse avancée et bases de données",
    "category": "Informatique",
    "level": "2BAC",
    "days": ["Mar.", "Jeu."],
    "startTime": "18:00",
    "endTime": "19:30",
    "teacher": "M. Youssef",
    "room": "Salle 5",
    "minAge": 17,
    "maxAge": 19,
    "availablePlaces": 6,
    "price": 500,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 10,
    "subject": "Mathématiques",
    "category": "Maths",
    "level": "2BAC",
    "days": ["Mar.", "Ven."],
    "startTime": "17:00",
    "endTime": "19:00",
    "teacher": "M. Alaoui",
    "room": "Salle 2",
    "minAge": 17,
    "maxAge": 19,
    "availablePlaces": 4,
    "price": 500,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 11,
    "subject": "Physique-Chimie",
    "category": "Physique",
    "level": "2BAC",
    "days": ["Lun.", "Mer."],
    "startTime": "18:00",
    "endTime": "20:00",
    "teacher": "Mme. Benali",
    "room": "Salle 3",
    "minAge": 17,
    "maxAge": 19,
    "availablePlaces": 5,
    "price": 500,
    "currency": "MAD",
    "billingPeriod": "mois"
  },
  {
    "id": 12,
    "subject": "SVT",
    "category": "SVT",
    "level": "2BAC",
    "days": ["Mar.", "Jeu."],
    "startTime": "16:30",
    "endTime": "18:00",
    "teacher": "Mme. Salma",
    "room": "Salle 4",
    "minAge": 17,
    "maxAge": 19,
    "availablePlaces": 9,
    "price": 450,
    "currency": "MAD",
    "billingPeriod": "mois"
  }
];

// ---------------------------------------------------------------
// Migration des anciens niveaux encore enregistrés dans localStorage.
// Seul "Bac" a une correspondance certaine : l'année du Bac = 2BAC.
// "Lycée" (1BAC ou 2BAC selon l'élève), "Tous niveaux" et les valeurs
// inconnues sont conservés : sans information fiable, on ne devine pas.
// Seul le niveau change, le reste de l'inscription reste intact.
// ---------------------------------------------------------------
export function migrerNiveaux(inscriptions) {
  if (!Array.isArray(inscriptions)) return 0;

  let modifies = 0;
  for (const inscription of inscriptions) {
    if (inscription?.student?.level === "Bac") {
      inscription.student.level = "2BAC";
      modifies += 1;
    }
  }
  return modifies;
}
