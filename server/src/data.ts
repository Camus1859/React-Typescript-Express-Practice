export type UsersType = {
  name: string;
  email: string;
  id: string;
  role: string;
  department: string;
  projects: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  isActive: boolean;
};

export let users: UsersType[] = [
  {
    name: "Anderson Laventure",
    email: "anderson@stytch.com",
    id: "1",
    role: "Software Engineer",
    department: "Frontend",
    projects: ["Dashboard", "Auth SDK", "Onboarding"],
    address: { street: "123 Main St", city: "San Francisco", state: "CA", zip: "94102" },
    isActive: true,
  },
  {
    name: "Maria Chen",
    email: "maria@stytch.com",
    id: "2",
    role: "Senior Engineer",
    department: "Backend",
    projects: ["API Gateway", "Auth SDK"],
    address: { street: "456 Oak Ave", city: "New York", state: "NY", zip: "10001" },
    isActive: true,
  },
  {
    name: "James Park",
    email: "james@stytch.com",
    id: "3",
    role: "Engineering Manager",
    department: "Platform",
    projects: ["Infrastructure", "CI/CD", "Monitoring"],
    address: { street: "789 Pine Rd", city: "Seattle", state: "WA", zip: "98101" },
    isActive: true,
  },
  {
    name: "Priya Sharma",
    email: "priya@stytch.com",
    id: "4",
    role: "Software Engineer",
    department: "Frontend",
    projects: ["Dashboard"],
    address: { street: "321 Elm St", city: "Austin", state: "TX", zip: "73301" },
    isActive: false,
  },
  {
    name: "Carlos Rivera",
    email: "carlos@stytch.com",
    id: "5",
    role: "Staff Engineer",
    department: "Backend",
    projects: ["API Gateway", "Auth SDK", "Billing", "Onboarding"],
    address: { street: "654 Maple Dr", city: "Denver", state: "CO", zip: "80201" },
    isActive: true,
  },
  {
    name: "Sarah Kim",
    email: "sarah@stytch.com",
    id: "6",
    role: "Software Engineer",
    department: "Frontend",
    projects: ["Onboarding", "Docs"],
    address: { street: "987 Cedar Ln", city: "Portland", state: "OR", zip: "97201" },
    isActive: true,
  },
  {
    name: "David Thompson",
    email: "david@stytch.com",
    id: "7",
    role: "Senior Engineer",
    department: "Platform",
    projects: ["Infrastructure", "Monitoring"],
    address: { street: "147 Birch Way", city: "Chicago", state: "IL", zip: "60601" },
    isActive: false,
  },
  {
    name: "Aisha Okafor",
    email: "aisha@stytch.com",
    id: "8",
    role: "Software Engineer",
    department: "Backend",
    projects: ["Billing", "API Gateway"],
    address: { street: "258 Walnut St", city: "Miami", state: "FL", zip: "33101" },
    isActive: true,
  },
];
