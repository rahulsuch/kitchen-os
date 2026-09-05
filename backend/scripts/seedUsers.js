/**
 * seedUsers.js — Seed 150 realistic dummy users for KitchenOS
 *
 * Creates: 5 Organizations, 12 Branches, 149 new Users
 * Preserves: existing superadmin (admin@kitchenos.com) + builtitfunny@gmail.com
 * All seeded users have password: Test@1234
 *
 * Run: cd backend && node scripts/seedUsers.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Organization from "../models/Organization.js";
import Branch from "../models/Branch.js";

dotenv.config();

// ─── HELPERS ────────────────────────────────────────────────────────────────

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const maybe = (value, missingRate = 0.2) =>
  Math.random() < missingRate ? undefined : value;
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
const pad = (n) => String(n).padStart(4, "0");

// ─── NAME POOLS ─────────────────────────────────────────────────────────────

const FIRST_NAMES_MALE = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Reyansh", "Sai", "Arnav",
  "Dhruv", "Kabir", "Ritvik", "Rohan", "Karan", "Ishaan", "Shaurya", "Atharva",
  "Advait", "Ayaan", "Kartik", "Lakshya", "Nikhil", "Pranav", "Yash", "Dev",
  "Rahul", "Rajesh", "Vikram", "Suresh", "Mahesh", "Deepak", "Amit", "Ravi",
  "Sanjay", "Mohan", "Gopal", "Harish", "Tarun", "Varun", "Gaurav", "Ankit",
  "Sachin", "Ajay", "Naveen", "Pradeep", "Manish", "Rakesh", "Mukesh", "Dinesh",
  "Venkatesh", "Ramesh", "Surya", "Bala", "Ganesh", "Arun", "Vijay", "Kunal",
];

const FIRST_NAMES_FEMALE = [
  "Ananya", "Diya", "Myra", "Sara", "Aanya", "Aadhya", "Kiara", "Saanvi",
  "Priya", "Neha", "Pooja", "Shreya", "Kavita", "Sunita", "Rekha", "Anjali",
  "Meera", "Lakshmi", "Sita", "Geeta", "Radha", "Nandini", "Swati", "Divya",
  "Ritu", "Shalini", "Deepa", "Jaya", "Rani", "Padma", "Fatima", "Ayesha",
  "Zara", "Isha", "Tara", "Roshni", "Bhavna", "Chitra", "Darshana", "Heena",
];

const LAST_NAMES = [
  "Sharma", "Patel", "Singh", "Kumar", "Das", "Gupta", "Reddy", "Joshi",
  "Malhotra", "Nair", "Pillai", "Iyer", "Menon", "Bhat", "Hegde", "Rao",
  "Mehta", "Shah", "Desai", "Jain", "Verma", "Chauhan", "Thakur", "Mishra",
  "Tiwari", "Dubey", "Pandey", "Srivastava", "Chopra", "Kapoor", "Banerjee",
  "Chatterjee", "Mukherjee", "Roy", "Sen", "Bose", "Ghosh", "Dutta", "Saxena",
  "Agarwal", "Goel", "Mittal", "Rastogi", "Kulkarni", "Patil", "Jadhav",
  "Shinde", "More", "Deshpande", "Kamath",
];

// ─── ADDRESS POOLS ──────────────────────────────────────────────────────────

const STREETS = [
  "MG Road", "Station Road", "Gandhi Nagar", "Nehru Colony", "Lal Bagh",
  "Rajaji Nagar", "Sector 5", "Sector 12", "Ring Road", "Civil Lines",
  "Cantonment Area", "Old City", "New Market", "Industrial Area Phase 2",
  "Jubilee Hills", "Banjara Hills", "Anna Nagar", "T Nagar", "Koramangala",
  "Indiranagar", "HSR Layout", "Whitefield", "Electronic City",
];

const STATES = {
  Delhi: "Delhi",
  Mumbai: "Maharashtra",
  Bangalore: "Karnataka",
  Pune: "Maharashtra",
  Jaipur: "Rajasthan",
  Goa: "Goa",
  Noida: "Uttar Pradesh",
  Gurugram: "Haryana",
  Hyderabad: "Telangana",
  Chennai: "Tamil Nadu",
};

const PINCODES = {
  Delhi: ["110001", "110016", "110019", "110025", "110044", "110085"],
  Mumbai: ["400001", "400050", "400053", "400070", "400093"],
  Bangalore: ["560001", "560034", "560047", "560068", "560095"],
  Pune: ["411001", "411004", "411014", "411038", "411057"],
  Jaipur: ["302001", "302012", "302015", "302020"],
  Goa: ["403001", "403401", "403501", "403601"],
  Noida: ["201301", "201303", "201304"],
  Gurugram: ["122001", "122002", "122003", "122018"],
  Hyderabad: ["500001", "500008", "500034", "500081"],
  Chennai: ["600001", "600017", "600024", "600040", "600095"],
};

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["male", "female", "other", "prefer_not_to_say"];
const SHIFTS = ["morning", "afternoon", "night", "rotational", "general"];
const RELATIONS = ["spouse", "parent", "sibling", "friend", "guardian"];

// ─── FUNCTIONAL TITLES BY DEPARTMENT ────────────────────────────────────────

const TITLES = {
  kitchen: [
    "Executive Chef", "Sous Chef", "Chef de Partie", "Commis Chef",
    "Line Cook", "Prep Cook", "Tandoor Specialist", "Pastry Chef",
    "Garde Manger", "Kitchen Porter", "Dishwasher", "Baker",
    "Kichen Supervisor", // intentional typo
  ],
  "front-of-house": [
    "Restaurant Manager", "Maître d'", "Captain", "Waiter", "Waitress",
    "Bartender", "Host", "Hostess", "Cashier", "Barista",
    "Asst. Manger", // intentional typo
  ],
  housekeeping: [
    "Housekeeping Supervisor", "Room Attendant", "Laundry Operator",
    "Housekeeping Staff", "Public Area Attendant",
  ],
  admin: [
    "Operations Director", "Area Manager", "General Manager",
    "Administrative Officer", "Front Office Manager", "Receptionist",
  ],
  compliance: [
    "FSSAI Auditor", "Quality Assurance Officer", "Hygiene Inspector",
    "Food Safety Trainer", "Compliance Officer", "Internal Auditor",
  ],
  finance: [
    "Accountant", "Accounts Executive", "Finance Manager",
    "Billing Executive",
  ],
  hr: [
    "HR Executive", "HR Manager", "Talent Acquisition Specialist",
    "Payroll Officer",
  ],
  procurement: [
    "Procurement Officer", "Purchase Manager", "Vendor Coordinator",
    "Store Keeper", "Inventory Manager",
  ],
  maintenance: [
    "Maintenance Engineer", "Electrician", "Plumber",
    "HVAC Technician", "Facility Coordinator",
  ],
};

// ─── ORGANIZATION & BRANCH DEFINITIONS ──────────────────────────────────────

const ORGS = [
  { name: "Spice Republic", regNo: "CIN-U55101DL2019PTC123456", plan: "enterprise" },
  { name: "Tandoori Trails", regNo: "CIN-U55102MH2020PTC234567", plan: "premium" },
  { name: "The Grand Pavilion", regNo: "CIN-U55103RJ2018PTC345678", plan: "enterprise" },
  { name: "QuickBite Express", regNo: "CIN-U55104UP2021PTC456789", plan: "basic" },
  { name: "Cloud Kitchen Co.", regNo: "CIN-U55105TG2022PTC567890", plan: "premium" },
];

const BRANCHES = [
  // Spice Republic — 3 branches
  { orgIdx: 0, name: "Connaught Place Flagship", city: "Delhi", state: "Delhi", street: "Block A, Connaught Place", pincode: "110001", fssai: "10024011000123" },
  { orgIdx: 0, name: "Bandra West Outlet", city: "Mumbai", state: "Maharashtra", street: "Hill Road, Bandra West", pincode: "400050", fssai: "10024027000234" },
  { orgIdx: 0, name: "Koramangala Hub", city: "Bangalore", state: "Karnataka", street: "80 Feet Road, Koramangala", pincode: "560034", fssai: "10024029000345" },
  // Tandoori Trails — 2 branches
  { orgIdx: 1, name: "Central Kitchen", city: "Pune", state: "Maharashtra", street: "Aundh Road", pincode: "411007", fssai: "10024027000456" },
  { orgIdx: 1, name: "Banquet Division", city: "Pune", state: "Maharashtra", street: "Koregaon Park", pincode: "411001", fssai: "PENDING" },
  // The Grand Pavilion — 3 branches
  { orgIdx: 2, name: "Main Hotel - Jaipur", city: "Jaipur", state: "Rajasthan", street: "MI Road", pincode: "302001", fssai: "10024008000567" },
  { orgIdx: 2, name: "Beach Resort - Goa", city: "Goa", state: "Goa", street: "Calangute Beach Road", pincode: "403516", fssai: "10024030000678" },
  { orgIdx: 2, name: "Airport Lounge - Delhi", city: "Delhi", state: "Delhi", street: "Terminal 3, IGI Airport", pincode: "110037", fssai: "10024011000789" },
  // QuickBite Express — 2 branches
  { orgIdx: 3, name: "Mall of India Counter", city: "Noida", state: "Uttar Pradesh", street: "Sector 18, Mall of India", pincode: "201301", fssai: "10024009000890" },
  { orgIdx: 3, name: "Cyber Hub Outlet", city: "Gurugram", state: "Haryana", street: "DLF Cyber Hub", pincode: "122002", fssai: "10024006000901" },
  // Cloud Kitchen Co. — 2 branches
  { orgIdx: 4, name: "Dark Kitchen Alpha", city: "Hyderabad", state: "Telangana", street: "Madhapur Industrial Area", pincode: "500081", fssai: "PENDING" },
  { orgIdx: 4, name: "Dark Kitchen Beta", city: "Chennai", state: "Tamil Nadu", street: "Guindy Industrial Estate", pincode: "600032", fssai: "10024033000012" },
];

// ─── USER DEFINITIONS ───────────────────────────────────────────────────────
// Each entry: [role, orgIdx, branchIdx, department, genderHint]
// branchIdx can be null for org-level roles (enterpriseadmin, auditor, accountant)

const USER_SPECS = [
  // ── ENTERPRISE ADMINS (4) ──
  ["enterpriseadmin", 0, null, "admin", "male"],
  ["enterpriseadmin", 1, null, "admin", "female"],
  ["enterpriseadmin", 2, null, "admin", "male"],
  ["enterpriseadmin", 3, null, "admin", "male"],
  // Cloud Kitchen Co. (org 4) has no enterpriseadmin — owned by superadmin

  // ── BRANCH ADMINS (8) ──
  ["branchadmin", 0, 0, "admin", "male"],
  ["branchadmin", 0, 1, "admin", "female"],
  ["branchadmin", 0, 2, "admin", "male"],
  ["branchadmin", 1, 3, "admin", "male"],
  ["branchadmin", 1, 4, "admin", "female"],
  ["branchadmin", 2, 5, "admin", "male"],
  ["branchadmin", 2, 6, "admin", "female"],
  ["branchadmin", 2, 7, "admin", "male"],

  // ── MANAGERS (15) ──
  ["manager", 0, 0, "kitchen", "male"],
  ["manager", 0, 0, "front-of-house", "female"],
  ["manager", 0, 1, "kitchen", "male"],
  ["manager", 0, 2, "kitchen", "female"],
  ["manager", 0, 2, "front-of-house", "male"],
  ["manager", 1, 3, "kitchen", "male"],
  ["manager", 1, 4, "front-of-house", "female"],
  ["manager", 2, 5, "kitchen", "male"],
  ["manager", 2, 5, "front-of-house", "female"],
  ["manager", 2, 6, "housekeeping", "female"],
  ["manager", 2, 7, "front-of-house", "male"],
  ["manager", 3, 8, "kitchen", "male"],
  ["manager", 3, 9, "kitchen", "female"],
  ["manager", 4, 10, "kitchen", "male"],
  ["manager", 4, 11, "kitchen", "male"],

  // ── SUPERVISORS (20) ──
  ["supervisor", 0, 0, "kitchen", "male"],
  ["supervisor", 0, 0, "kitchen", "female"],
  ["supervisor", 0, 1, "kitchen", "male"],
  ["supervisor", 0, 1, "front-of-house", "female"],
  ["supervisor", 0, 2, "kitchen", "male"],
  ["supervisor", 0, 2, "front-of-house", "male"],
  ["supervisor", 1, 3, "kitchen", "female"],
  ["supervisor", 1, 3, "kitchen", "male"],
  ["supervisor", 1, 4, "front-of-house", "male"],
  ["supervisor", 2, 5, "kitchen", "male"],
  ["supervisor", 2, 5, "housekeeping", "female"],
  ["supervisor", 2, 5, "front-of-house", "male"],
  ["supervisor", 2, 6, "kitchen", "female"],
  ["supervisor", 2, 7, "front-of-house", "female"],
  ["supervisor", 3, 8, "kitchen", "male"],
  ["supervisor", 3, 8, "front-of-house", "female"],
  ["supervisor", 3, 9, "kitchen", "male"],
  ["supervisor", 4, 10, "kitchen", "male"],
  ["supervisor", 4, 10, "kitchen", "female"],
  ["supervisor", 4, 11, "kitchen", "male"],

  // ── AUDITORS (5) ──
  ["auditor", 0, null, "compliance", "male"],
  ["auditor", 1, null, "compliance", "female"],
  ["auditor", 2, null, "compliance", "male"],
  ["auditor", 3, null, "compliance", "female"],
  ["auditor", 4, null, "compliance", "male"],

  // ── ACCOUNTANTS (3) ──
  ["accountant", 0, null, "finance", "female"],
  ["accountant", 2, null, "finance", "male"],
  ["accountant", 3, null, "finance", "female"],

  // ── TRAINEES (12) ──
  ["trainee", 0, 0, "kitchen", "male"],
  ["trainee", 0, 1, "kitchen", "female"],
  ["trainee", 0, 2, "front-of-house", "male"],
  ["trainee", 1, 3, "kitchen", "male"],
  ["trainee", 1, 4, "front-of-house", "female"],
  ["trainee", 2, 5, "kitchen", "male"],
  ["trainee", 2, 5, "housekeeping", "female"],
  ["trainee", 2, 6, "kitchen", "male"],
  ["trainee", 3, 8, "kitchen", "female"],
  ["trainee", 3, 9, "front-of-house", "male"],
  ["trainee", 4, 10, "kitchen", "male"],
  ["trainee", 4, 11, "kitchen", "female"],

  // ── STAFF (82) ──
  // Spice Republic — CP (org0, branch0): 10 staff
  ["staff", 0, 0, "kitchen", "male"],
  ["staff", 0, 0, "kitchen", "female"],
  ["staff", 0, 0, "kitchen", "male"],
  ["staff", 0, 0, "front-of-house", "female"],
  ["staff", 0, 0, "front-of-house", "male"],
  ["staff", 0, 0, "kitchen", "male"],
  ["staff", 0, 0, "maintenance", "male"],
  ["staff", 0, 0, "kitchen", "female"],
  ["staff", 0, 0, "front-of-house", "female"],
  ["staff", 0, 0, "procurement", "male"],

  // Spice Republic — Bandra (org0, branch1): 8 staff
  ["staff", 0, 1, "kitchen", "male"],
  ["staff", 0, 1, "kitchen", "male"],
  ["staff", 0, 1, "front-of-house", "female"],
  ["staff", 0, 1, "kitchen", "female"],
  ["staff", 0, 1, "front-of-house", "male"],
  ["staff", 0, 1, "kitchen", "male"],
  ["staff", 0, 1, "housekeeping", "female"],
  ["staff", 0, 1, "maintenance", "male"],

  // Spice Republic — Koramangala (org0, branch2): 7 staff
  ["staff", 0, 2, "kitchen", "male"],
  ["staff", 0, 2, "kitchen", "female"],
  ["staff", 0, 2, "front-of-house", "male"],
  ["staff", 0, 2, "front-of-house", "female"],
  ["staff", 0, 2, "kitchen", "male"],
  ["staff", 0, 2, "procurement", "female"],
  ["staff", 0, 2, "kitchen", "other"],

  // Tandoori Trails — Central Kitchen (org1, branch3): 8 staff
  ["staff", 1, 3, "kitchen", "male"],
  ["staff", 1, 3, "kitchen", "male"],
  ["staff", 1, 3, "kitchen", "female"],
  ["staff", 1, 3, "kitchen", "male"],
  ["staff", 1, 3, "front-of-house", "female"],
  ["staff", 1, 3, "procurement", "male"],
  ["staff", 1, 3, "maintenance", "male"],
  ["staff", 1, 3, "hr", "female"],

  // Tandoori Trails — Banquet (org1, branch4): 6 staff
  ["staff", 1, 4, "front-of-house", "male"],
  ["staff", 1, 4, "front-of-house", "female"],
  ["staff", 1, 4, "front-of-house", "male"],
  ["staff", 1, 4, "kitchen", "male"],
  ["staff", 1, 4, "housekeeping", "female"],
  ["staff", 1, 4, "front-of-house", "female"],

  // Grand Pavilion — Jaipur (org2, branch5): 10 staff
  ["staff", 2, 5, "kitchen", "male"],
  ["staff", 2, 5, "kitchen", "female"],
  ["staff", 2, 5, "front-of-house", "male"],
  ["staff", 2, 5, "front-of-house", "female"],
  ["staff", 2, 5, "housekeeping", "male"],
  ["staff", 2, 5, "housekeeping", "female"],
  ["staff", 2, 5, "kitchen", "male"],
  ["staff", 2, 5, "maintenance", "male"],
  ["staff", 2, 5, "hr", "female"],
  ["staff", 2, 5, "procurement", "male"],

  // Grand Pavilion — Goa (org2, branch6): 8 staff
  ["staff", 2, 6, "kitchen", "male"],
  ["staff", 2, 6, "kitchen", "female"],
  ["staff", 2, 6, "front-of-house", "male"],
  ["staff", 2, 6, "front-of-house", "female"],
  ["staff", 2, 6, "housekeeping", "female"],
  ["staff", 2, 6, "housekeeping", "male"],
  ["staff", 2, 6, "kitchen", "prefer_not_to_say"],
  ["staff", 2, 6, "front-of-house", "male"],

  // Grand Pavilion — Airport Lounge (org2, branch7): 5 staff
  ["staff", 2, 7, "front-of-house", "female"],
  ["staff", 2, 7, "front-of-house", "male"],
  ["staff", 2, 7, "kitchen", "male"],
  ["staff", 2, 7, "kitchen", "female"],
  ["staff", 2, 7, "front-of-house", "male"],

  // QuickBite — Mall (org3, branch8): 6 staff
  ["staff", 3, 8, "kitchen", "male"],
  ["staff", 3, 8, "kitchen", "male"],
  ["staff", 3, 8, "front-of-house", "female"],
  ["staff", 3, 8, "front-of-house", "male"],
  ["staff", 3, 8, "kitchen", "female"],
  ["staff", 3, 8, "maintenance", "male"],

  // QuickBite — Cyber Hub (org3, branch9): 4 staff
  ["staff", 3, 9, "kitchen", "male"],
  ["staff", 3, 9, "front-of-house", "female"],
  ["staff", 3, 9, "kitchen", "male"],
  ["staff", 3, 9, "front-of-house", "prefer_not_to_say"],

  // Cloud Kitchen — Alpha (org4, branch10): 6 staff
  ["staff", 4, 10, "kitchen", "male"],
  ["staff", 4, 10, "kitchen", "female"],
  ["staff", 4, 10, "kitchen", "male"],
  ["staff", 4, 10, "kitchen", "male"],
  ["staff", 4, 10, "procurement", "female"],
  ["staff", 4, 10, "kitchen", "other"],

  // Cloud Kitchen — Beta (org4, branch11): 4 staff
  ["staff", 4, 11, "kitchen", "male"],
  ["staff", 4, 11, "kitchen", "female"],
  ["staff", 4, 11, "kitchen", "male"],
  ["staff", 4, 11, "kitchen", "other"],
];

// ─── SALARY RANGES BY ROLE (annual INR) ─────────────────────────────────────

const SALARY_RANGES = {
  enterpriseadmin: [1800000, 3600000],
  branchadmin: [900000, 1800000],
  manager: [600000, 1200000],
  supervisor: [360000, 720000],
  staff: [180000, 420000],
  trainee: [120000, 240000],
  auditor: [480000, 960000],
  accountant: [420000, 840000],
};

// ─── EMPLOYMENT STATUS DISTRIBUTION ─────────────────────────────────────────

function pickEmploymentStatus(role) {
  if (role === "trainee") return "probation";
  const r = Math.random();
  if (r < 0.77) return "active";
  if (r < 0.82) return "on_leave";
  if (r < 0.87) return "probation";
  if (r < 0.92) return "notice_period";
  if (r < 0.96) return "terminated";
  return "resigned";
}

function pickApprovalStatus(empStatus) {
  if (empStatus === "terminated" || empStatus === "resigned") return "suspended";
  if (Math.random() < 0.08) return "pending";
  return "active";
}

// ─── GENERATE A SINGLE USER ─────────────────────────────────────────────────

let emailCounter = 0;
const usedEmails = new Set();
const usedEmployeeIds = new Set();

function generateUser(spec, orgIds, branchIds, branchDefs) {
  const [role, orgIdx, branchIdx, dept, genderHint] = spec;

  // Name generation
  const isFemale = genderHint === "female";
  const isOther = genderHint === "other" || genderHint === "prefer_not_to_say";
  const firstName = isFemale
    ? pick(FIRST_NAMES_FEMALE)
    : isOther
    ? pick([...FIRST_NAMES_MALE, ...FIRST_NAMES_FEMALE])
    : pick(FIRST_NAMES_MALE);
  const lastName = pick(LAST_NAMES);
  const fullname = `${firstName} ${lastName}`;

  // Username — ensure unique
  let username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomInt(1, 99)}`;

  // Email — ensure unique
  emailCounter++;
  let email = `${firstName.toLowerCase()}${emailCounter}@${
    ORGS[orgIdx].name.toLowerCase().replace(/[\s.]/g, "")
  }.com`;
  while (usedEmails.has(email)) {
    emailCounter++;
    email = `${firstName.toLowerCase()}${emailCounter}@${
      ORGS[orgIdx].name.toLowerCase().replace(/[\s.]/g, "")
    }.com`;
  }
  usedEmails.add(email);

  // Employee ID — prefix by org abbreviation
  const orgAbbr = ORGS[orgIdx].name.split(" ").map((w) => w[0]).join("").toUpperCase();
  const branchAbbr = branchIdx !== null
    ? BRANCHES[branchIdx].name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 3)
    : "HQ";
  let empId;
  do {
    empId = `${orgAbbr}-${branchAbbr}-${pad(randomInt(1, 9999))}`;
  } while (usedEmployeeIds.has(empId));
  usedEmployeeIds.add(empId);

  // City for address — from branch or org HQ
  const city = branchIdx !== null ? branchDefs[branchIdx].city : pick(Object.keys(STATES));
  const state = STATES[city] || "Delhi";

  // Employment
  const empStatus = pickEmploymentStatus(role);
  const approvalStatus = pickApprovalStatus(empStatus);

  // Joining date
  const dateOfJoining = randomDate(new Date("2020-01-01"), new Date("2026-08-01"));

  // FoSTaC — mainly kitchen/compliance staff
  const isFostacRelevant = ["kitchen", "compliance", "front-of-house"].includes(dept);
  const fostacCertified = isFostacRelevant ? (Math.random() < 0.6 ? true : Math.random() < 0.3 ? false : undefined) : undefined;
  const fostacCertificateNumber = fostacCertified
    ? `FOSTAC-${randomInt(100000, 999999)}`
    : undefined;
  const fostacExpiryDate = fostacCertified
    ? randomDate(new Date("2025-01-01"), new Date("2028-12-31"))
    : undefined;

  // Build user object with intentional missing data
  const user = {
    fullname,
    username,
    email,
    password: "Test@1234",
    role,
    organization: orgIds[orgIdx],
    branch: branchIdx !== null ? branchIds[branchIdx] : undefined,
    status: approvalStatus,

    // Personal — with missing rates
    contactNo: maybe(`+91-${randomInt(7000000000, 9999999999)}`, 0.15),
    gender: maybe(genderHint, 0.10),
    dateOfBirth: maybe(
      randomDate(new Date("1975-01-01"), new Date("2004-12-31")),
      0.25
    ),
    bloodGroup: maybe(pick(BLOOD_GROUPS), 0.20),
    address: maybe(
      Math.random() < 0.10
        ? { city } // partial address — only city
        : {
            street: pick(STREETS),
            city,
            state,
            pincode: pick(PINCODES[city] || ["000000"]),
            country: "India",
          },
      0.20
    ),
    emergencyContact: maybe(
      {
        name: `${pick([...FIRST_NAMES_MALE, ...FIRST_NAMES_FEMALE])} ${pick(LAST_NAMES)}`,
        phone: `+91-${randomInt(7000000000, 9999999999)}`,
        relation: pick(RELATIONS),
      },
      0.30
    ),

    // Employment
    employeeId: maybe(empId, 0.05), // 5% missing — very few
    functionalTitle: maybe(pick(TITLES[dept] || ["Staff"]), 0.08),
    department: dept,
    dateOfJoining,
    employmentStatus: empStatus,
    shift: maybe(pick(SHIFTS), 0.07),
    aadharLastFour: maybe(String(randomInt(1000, 9999)), 0.20),
    salary: maybe(
      randomInt(SALARY_RANGES[role][0], SALARY_RANGES[role][1]),
      0.35
    ),

    // Compliance
    fostacCertified,
    fostacCertificateNumber,
    fostacExpiryDate,
  };

  // Clean undefined keys so Mongoose doesn't set them as null
  Object.keys(user).forEach((key) => {
    if (user[key] === undefined) delete user[key];
  });

  return user;
}

// ─── MAIN SEED FUNCTION ─────────────────────────────────────────────────────

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // ── Step 1: Clean existing seeded data (preserve original users) ──
    const preserveEmails = ["admin@kitchenos.com", "builtitfunny@gmail.com"];
    const preservedUsers = await User.find({ email: { $in: preserveEmails } });
    const preservedIds = preservedUsers.map((u) => u._id);

    // Delete all users except preserved ones
    const delUsers = await User.deleteMany({ _id: { $nin: preservedIds } });
    console.log(`🗑️  Cleaned ${delUsers.deletedCount} old users`);

    // Delete all orgs and branches (we'll recreate them)
    const delOrgs = await Organization.deleteMany({});
    const delBranches = await Branch.deleteMany({});
    console.log(`🗑️  Cleaned ${delOrgs.deletedCount} orgs, ${delBranches.deletedCount} branches\n`);

    // ── Step 2: Create Organizations ──
    console.log("📦 Creating Organizations...");
    const orgDocs = [];
    for (const org of ORGS) {
      const doc = await Organization.create({
        name: org.name,
        companyRegistrationNumber: org.regNo,
        subscriptionPlan: org.plan,
        isActive: true,
      });
      orgDocs.push(doc);
      console.log(`   ✅ ${doc.name} (${doc._id})`);
    }
    const orgIds = orgDocs.map((o) => o._id);

    // ── Step 3: Create Branches ──
    console.log("\n🏪 Creating Branches...");
    const branchDocs = [];
    for (const br of BRANCHES) {
      const doc = await Branch.create({
        name: br.name,
        organization: orgIds[br.orgIdx],
        address: {
          street: br.street,
          city: br.city,
          state: br.state,
          pincode: br.pincode,
        },
        fssaiLicenseNumber: br.fssai,
      });
      branchDocs.push(doc);
      console.log(`   ✅ ${doc.name} → ${ORGS[br.orgIdx].name}`);
    }
    const branchIds = branchDocs.map((b) => b._id);

    // ── Step 4: Seed Users (using insertMany for speed, but we need pre-save hooks) ──
    console.log("\n👥 Creating Users (this takes ~60 seconds — hashing 149 passwords)...\n");

    const roleCounts = {};
    const orgCounts = {};
    const deptCounts = {};
    const genderCounts = {};
    const shiftCounts = {};
    const empStatusCounts = {};
    let created = 0;

    for (const spec of USER_SPECS) {
      const userData = generateUser(spec, orgIds, branchIds, BRANCHES);

      // We use User.create() instead of insertMany so the pre-save password hook runs
      await User.create(userData);
      created++;

      // Stats tracking
      const [role, orgIdx, , dept, gender] = spec;
      roleCounts[role] = (roleCounts[role] || 0) + 1;
      orgCounts[ORGS[orgIdx].name] = (orgCounts[ORGS[orgIdx].name] || 0) + 1;
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
      if (gender) genderCounts[gender] = (genderCounts[gender] || 0) + 1;
      if (userData.shift) shiftCounts[userData.shift] = (shiftCounts[userData.shift] || 0) + 1;
      if (userData.employmentStatus) empStatusCounts[userData.employmentStatus] = (empStatusCounts[userData.employmentStatus] || 0) + 1;

      // Progress indicator every 10 users
      if (created % 10 === 0) {
        process.stdout.write(`   ✅ ${created}/149 users created\r`);
      }
    }

    // ── Step 5: Link branch admins as branch managers ──
    console.log("\n\n🔗 Linking branch admins to branches...");
    const branchAdmins = await User.find({ role: "branchadmin" });
    for (const ba of branchAdmins) {
      if (ba.branch) {
        await Branch.findByIdAndUpdate(ba.branch, { manager: ba._id });
      }
    }

    // ── Step 6: Link enterprise admins to orgs ──
    console.log("🔗 Linking enterprise admins to organizations...");
    const eAdmins = await User.find({ role: "enterpriseadmin" });
    for (const ea of eAdmins) {
      if (ea.organization) {
        await Organization.findByIdAndUpdate(ea.organization, { admin: ea._id });
      }
    }

    // ── Step 7: Set reporting managers for some users ──
    console.log("🔗 Setting reporting hierarchy...\n");
    // For each branch, set staff/trainee reportingManager to a supervisor or manager in same branch
    for (let i = 0; i < branchIds.length; i++) {
      const managers = await User.find({
        branch: branchIds[i],
        role: { $in: ["manager", "supervisor"] },
      });
      if (managers.length > 0) {
        const staffInBranch = await User.find({
          branch: branchIds[i],
          role: { $in: ["staff", "trainee"] },
          _id: { $nin: preservedIds },
        });
        for (const s of staffInBranch) {
          // ~85% get a reporting manager assigned
          if (Math.random() < 0.85) {
            const rm = managers[Math.floor(Math.random() * managers.length)];
            await User.findByIdAndUpdate(s._id, { reportingManager: rm._id });
          }
        }
      }
    }

    // ── FINAL REPORT ──
    const totalUsers = await User.countDocuments();

    console.log("═══════════════════════════════════════════════════════════");
    console.log("               🎉 SEEDING COMPLETE — REPORT");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`\n📊 Total Users in DB: ${totalUsers} (${created} new + ${preservedUsers.length} preserved)\n`);

    console.log("── BY ROLE ──");
    console.log("   superadmin:       1 (existing)");
    Object.entries(roleCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([role, count]) => {
        console.log(`   ${role.padEnd(18)} ${count}`);
      });

    console.log("\n── BY ORGANIZATION ──");
    Object.entries(orgCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([org, count]) => {
        console.log(`   ${org.padEnd(22)} ${count}`);
      });

    console.log("\n── BY DEPARTMENT ──");
    Object.entries(deptCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([dept, count]) => {
        console.log(`   ${dept.padEnd(18)} ${count}`);
      });

    console.log("\n── BY GENDER (specified) ──");
    Object.entries(genderCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([g, count]) => {
        console.log(`   ${g.padEnd(20)} ${count}`);
      });

    console.log("\n── BY EMPLOYMENT STATUS ──");
    Object.entries(empStatusCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([s, count]) => {
        console.log(`   ${s.padEnd(18)} ${count}`);
      });

    console.log("\n── BY SHIFT ──");
    Object.entries(shiftCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([s, count]) => {
        console.log(`   ${s.padEnd(14)} ${count}`);
      });

    console.log("\n═══════════════════════════════════════════════════════════");
    console.log("   🔑 All seeded users have password: Test@1234");
    console.log("   🔑 Existing superadmin password unchanged (Admin@123)");
    console.log("═══════════════════════════════════════════════════════════\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
