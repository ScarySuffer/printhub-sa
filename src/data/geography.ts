export type Province =
  | "Gauteng"
  | "Western Cape"
  | "KwaZulu-Natal"
  | "Eastern Cape"
  | "Limpopo"
  | "Mpumalanga"
  | "North West"
  | "Free State"
  | "Northern Cape";

export const PROVINCE_CITIES: Record<Province, string[]> = {
  Gauteng: ["Johannesburg", "Pretoria", "Midrand", "Soweto", "Sandton", "Centurion", "Benoni"],
  "Western Cape": ["Cape Town", "Stellenbosch", "Paarl", "George", "Mossel Bay"],
  "KwaZulu-Natal": ["Durban", "Pietermaritzburg", "uMhlanga", "Richards Bay", "Newcastle"],
  "Eastern Cape": ["Gqeberha", "East London", "Mthatha", "Komani"],
  Limpopo: ["Polokwane", "Thohoyandou", "Tzaneen", "Mokopane"],
  Mpumalanga: ["Mbombela", "Witbank", "Secunda"],
  "North West": ["Rustenburg", "Mahikeng", "Potchefstroom"],
  "Free State": ["Bloemfontein", "Welkom", "Bethlehem"],
  "Northern Cape": ["Kimberley", "Upington", "Springbok"],
};

export const ALL_PROVINCES = Object.keys(PROVINCE_CITIES) as Province[];

export function cityToProvince(city: string): Province | undefined {
  for (const province of ALL_PROVINCES) {
    if (PROVINCE_CITIES[province].includes(city)) return province;
  }
  return undefined;
}
