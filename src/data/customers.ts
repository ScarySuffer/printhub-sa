import { Customer } from "./orders";

const SURNAMES = [
  "Botha", "Van der Merwe", "Smith", "Jacobs", "Williams", "Nkosi", 
  "Naidoo", "Petersen", "Mthembu", "Dlamini", "Mokoena", "Venter",
  "Ferreira", "Radebe", "Pretorius", "Khumalo", "Ngcobo", "Smit",
  "Du Plessis", "Mkhize", "Zulu", "Moodley", "Govender", "Meyer",
  "Bosch", "Mahlangu", "Ndlovu", "Mabaso", "Kruger", "Pillay"
];

const FIRST_NAMES = [
  "Thabo", "Lindiwe", "Johan", "Sipho", "Maria", "David", "Nomsa",
  "Pieter", "Zanele", "Michael", "Sarah", "Andile", "Elaine", "Nkosinathi",
  "Catherine", "Robert", "Nobuhle", "James", "Thandeka", "Hendrik",
  "Busisiwe", "Mpumelelo", "Ntando", "Lerato", "Kabelo", "Tshepiso",
  "Reabetsoe", "Kamohelo", "Rethabile", "Neo"
];

const COMPANIES = [
  "Print Solutions", "Design Studio", "Marketing Hub", "Creative Agency",
  "Business Services", "Digital Works", "Media House", "Brand Co.",
  "Innovation Labs", "Strategic Partners", "Visual Communications",
  "Marketing Minds", "Creative Collective", "Brand Builders"
];

const SA_CITIES = [
  "Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth",
  "Bloemfontein", "Pietermaritzburg", "Nelspruit", "Polokwane", "Kimberley"
];

const PROVINCES = [
  "Gauteng", "Western Cape", "KwaZulu-Natal", "Free State",
  "Eastern Cape", "Northern Cape", "Limpopo", "Mpumalanga"
];

function generateCustomers(count: number = 100): Customer[] {
  const customers: Customer[] = [];
  const usedEmails = new Set<string>();

  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const surname = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
    const name = `${firstName} ${surname}`;
    const email = `${firstName.toLowerCase()}.${surname.toLowerCase()}@${['gmail.com', 'outlook.com', 'business.co.za', 'company.co.za'][Math.floor(Math.random() * 4)]}`;
    
    // Avoid duplicate emails
    let uniqueEmail = email;
    let counter = 1;
    while (usedEmails.has(uniqueEmail)) {
      uniqueEmail = `${firstName.toLowerCase()}.${surname.toLowerCase()}${counter}@${['gmail.com', 'outlook.com', 'business.co.za', 'company.co.za'][Math.floor(Math.random() * 4)]}`;
      counter++;
    }
    usedEmails.add(uniqueEmail);

    const city = SA_CITIES[Math.floor(Math.random() * SA_CITIES.length)];
    const province = PROVINCES[Math.floor(Math.random() * PROVINCES.length)];
    const company = `${COMPANIES[Math.floor(Math.random() * COMPANIES.length)]} ${['(Pty) Ltd', 'Inc.', 'SA', 'Co.'][Math.floor(Math.random() * 4)]}`;

    customers.push({
      id: `cust-${String(i + 1).padStart(3, '0')}`,
      name,
      email: uniqueEmail,
      phone: `+27 ${Math.floor(Math.random() * 9 + 1)}${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
      company,
      city,
      province,
      credits: Math.floor(Math.random() * 5000) + 100,
      joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return customers;
}

export const CUSTOMERS = generateCustomers(100);