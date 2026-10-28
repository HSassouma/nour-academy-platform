// Règles de validation partagées entre le site public (partie 1) et le dashboard (partie 2).

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const REGEX_TELEPHONE = /^(?:\+212[67]\d{8}|0[67]\d{8})$/;
export const REGEX_MOT_DE_PASSE = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/;

export function nomValide(valeur) {
    const nom = valeur.trim();
    return nom.length >= 2 && nom.length <= 60 && !/\d/.test(nom);
}

export function emailValide(valeur) {
    const email = valeur.trim();
    return email.length >= 5 && email.length <= 254 && REGEX_EMAIL.test(email);
}

export function telephoneValide(valeur) {
    const telephone = valeur.replace(/\s/g, "");
    return telephone.length >= 10 && telephone.length <= 13 && REGEX_TELEPHONE.test(telephone);
}

export function motDePasseValide(valeur) {
    return REGEX_MOT_DE_PASSE.test(valeur);
}
