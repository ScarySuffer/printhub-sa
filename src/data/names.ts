export const SA_FIRST_NAMES = [
  "Thabo", "Lindiwe", "Sipho", "Naledi", "Johan", "Anika", "Bongani", "Zanele",
  "Pieter", "Refilwe", "Kagiso", "Lerato", "Andile", "Carmen", "Mpho", "Riaan",
  "Nomvula", "Werner", "Thandeka", "Francois", "Palesa", "Dumisani", "Liesl",
  "Sibusiso", "Annelie", "Tumi", "Gerhard", "Nthabiseng", "Lwazi", "Karabo",
  "Ayesha", "Faizal", "Imraan", "Nasreen", "Tshepo", "Boitumelo", "Hendrik",
  "Marike", "Vusi", "Precious", "Mandla", "Charlene", "Sizwe", "Anneline",
  "Katlego", "Reabetswe", "Stefan", "Yolanda", "Bhekani", "Cebisa",
];

export const SA_LAST_NAMES = [
  "Nkosi", "Van der Merwe", "Dlamini", "Botha", "Mokoena", "Pretorius",
  "Khumalo", "Naidoo", "Sithole", "Du Toit", "Mahlangu", "Govender",
  "Ndlovu", "Steyn", "Mthembu", "Joubert", "Zulu", "Pillay", "Maseko",
  "Erasmus", "Tshabalala", "Abrahams", "Mabaso", "Coetzee", "Radebe",
  "Fourie", "Cele", "Bezuidenhout", "Mahlatsi", "Daniels",
];

export function seededIndexFrom(seed: number, length: number) {
  return Math.abs(Math.floor(Math.sin(seed) * 10000)) % length;
}

export function generateSAName(seed: number) {
  const first = SA_FIRST_NAMES[seededIndexFrom(seed * 1.7, SA_FIRST_NAMES.length)];
  const last = SA_LAST_NAMES[seededIndexFrom(seed * 3.1, SA_LAST_NAMES.length)];
  return `${first} ${last}`;
}
